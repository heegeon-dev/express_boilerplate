const glob = require('glob');
const path = require('path');
const moment = require("./middleware/moment");
let swaggerJsdoc = require("swagger-jsdoc");
let swaggerUi = require("swagger-ui-express");
const yaml = require('js-yaml');
const fs   = require('fs');
const express = require("express");


module.exports = (app) => {
	let swaggerDefinition;
	try {
		swaggerDefinition = yaml.load(fs.readFileSync(path.join(__dirname, "../config/swagger.yml"), 'utf8'));
		} catch (e) {
		console.log(e);
	}
	const specs = swaggerJsdoc({swaggerDefinition : swaggerDefinition, apis: ['../src/routes/*.js']});
	app.use('/*', moment.setTime, function (req, res, next) {
		next();
	});
	app.use("/api/upload", express.static(path.join(__dirname, "../assets")));
	if(process.env.NODE_ENV != "production"){
		app.use("/api-docs",
			swaggerUi.serve,
			swaggerUi.setup(specs)
		);
	}

	glob(`${__dirname}/routes/*Routes.js`, {}, (er, files) => {
		if (er) throw er;
		else{
			console.log("add routes");
			
			files.forEach((file) => {
				console.log(`${file}`);
				require(file)(app);		
			});
		}
	});
};
