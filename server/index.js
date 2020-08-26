var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
const fs = require("fs");

//routes
app.post("/:platform/:leagueID/:leagueteams", (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		//console.log(body)
		fs.writeFile("../src/data/teamData.json", body, function (err) {
			if (err) {
				return console.log(err);
			} else {
				res.sendStatus(200);

				return console.log("wrote teamData successfully");
			}
		});
	});
});
//team rosters
app.post("/:platform/:leagueId/team/:teamID/roster", (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		fs.writeFile(`../src/data/teamRosters.json`, body, function (err) {
			if (err) {
				return console.log(err);
			} else {
				res.sendStatus(200);

				return console.log("wrote team rosters successfully");
			}
		});
	});
});

//free agents
app.post("/:username/:platform/:leagueId/freeagents/roster", (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		fs.writeFile(`../src/data/freeAgents.json`, body, function (err) {
			if (err) {
				return console.log(err);
			} else {
				res.sendStatus(200);

				return console.log("wrote free agents successfully");
			}
		});
	});
});

//start server
app.listen(port);
console.log("Server Started ");
