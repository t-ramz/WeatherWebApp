'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require ('dotenv');
dotenv.config();

// mysql db connection
const conn = require('./db_connection');

const weather = express();

weather.use('/public', express.static(path.join(__dirname, 'public'))); //use public resources

//handlebars initialization
weather.engine('handlebars', exphbs());
weather.set('view engine', 'handlebars');

//bodyParser stuff
weather.use(bodyParser.urlencoded({ extended: false }));
weather.use(bodyParser.json());

var router = express.Router();
var myPath = path.join(__dirname, 'views/');

// Check for presence of database
conn.query("SELECT * FROM INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA =\"weather\" AND TABLE_NAME = \"Locations\"")


//Root
weather.get("/", (req,res) =>
	{
		res.render('index', {layout: false});
	}
);

//About
weather.get("/about", (req,res) =>
	{
		res.render('about', {layout: false});
	}
);

//Contact
weather.get("/contact", (req,res) =>
	{
		res.render('contact', {layout: false});
	}
);

//Mail section
weather.post('/sendEmail', (req, res) =>
	{
		const EMAIL_HTML_BODY = `
		<p>Name: ${req.body.name}</p>
		<p>Email: ${req.body.email}</p>
		<p>Concerns: ${req.body.message}`;

		const AUTH_ENV = {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}

		let transporter = nodemailer.createTransport(
			{
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: AUTH_ENV,
				tls:
				{
					rejectUnauthorized: false
				}
			}
		);

		let mailOptions =
		{
			from: `${process.env.OP}\'s Weather App <user@example.com>`,
			to: process.env.PMAIL,
			cc: null,
			bcc: null,
			subject: `${process.env.OP}\'s App Contact`,
			html: EMAIL_HTML_BODY
		};

		transporter.sendMail(mailOptions, (err, info) =>
			{
				if(err)
				{
					console.log(err);
					res.render('contact',
						{
							msg: "Contact email FAILED to send.",
							layout: false
						}
					);
				}
				else
				{
					console.log('Message sent: %s', info.messageId);
					res.render('contact',
						{
							msg: "Contact email SUCCESSFULLY sent.",
							layout: false
						}
					);
				}
			}
		);
	}
);

//DB backed weather
weather.post('/fetchWeatherFor', (req,res) =>
	{
		let search = req.body.search;
		conn.query("SELECT * FROM Weather",
			(err, results, fields) =>
			{
				if(err)
				{
					console.log(err);
					res.render('index', {msg: "Search error.", layout: false});
				}
				else
				{
					for (var i in results)
					{
						if (search == results[i].Postal)
						{
							let result = [results[i]];
							console.log(result);
							res.render('index', {msg: "Found entry.", layout: false, data: result});
							return;
						}
					}
					console.log("Creating new entry");
					let loc = "Cookeville";
					let temp = 27.12;
					let rain = 50;
					let sup = '6:20';
					let sdn = '20:50';
					let newLocationQuery = "INSERT INTO Weather (Postal, Location, Temp, Precip, Sup, Sdn) VALUES (?, ?, ?, ?, ?, ?)";
					conn.query(newLocationQuery, [Number(search), loc, temp, rain, sup, sdn],
						(err, results, fields) =>
						{
							if(err)
							{
								console.log(err);
								res.render('index', {msg: "Insert error.", layout: false});
							}
							else
							{
								console.log(fields);
								res.render('index', {msg: "New entry.", layout: false, data: results});
							}
						}
					);
				}
			}
		);
	}
);

//404 for any not explicity defined
weather.use("/",router);
weather.use("*", (req,res) =>
	{
		res.render('404', {layout: false});
	}
);

//Start server with UNIX environment variable
const PORT = process.env.PORT || 8080;
weather.listen(PORT, () =>
	{
		console.log(`App listening on port ${PORT}`);
		console.log('Press Ctrl+C to quit.');
		console.log('');
	}
);

module.exports = weather;
