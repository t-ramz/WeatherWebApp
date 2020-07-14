'use strict';

const express = require("express");
const weather = express();

weather.use(express.static(__dirname+'/public')); //use public resources

var router = express.Router();
var path = __dirname + '/views/';


//Root
router.get("/", (req,res) =>
	{
		res.sendFile(path + "index.html");
	}
);

//About
router.get("/about", (req,res) =>
	{
		res.sendFile(path + "about.html");
	}
);

//Contact
router.get("/contact", (req,res) =>
	{
		res.sendFile(path + "contact.html");
	}
);

//404 for any not explicity defined
weather.use("/",router);
weather.use("*", (req,res) =>
	{
		res.sendFile(path + "404.html");
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
