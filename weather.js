'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require ('dotenv');
dotenv.config();

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
