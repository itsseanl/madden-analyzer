var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
const fs = require("fs");

//league info
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

//weekly info
app.post(
	"/:platform/:leagueId/week/:weekType/:weekNumber/:dataType",
	(req, res) => {
		console.log("weekly info path: " + req.params.dataType);
		let body = "";
		const {
			params: { username, leagueId, weekType, weekNumber, dataType },
		} = req;
		const basePath = `data/${leagueId}/`;
		// "defense", "kicking", "passing", "punting", "receiving", "rushing"
		const statsPath = `${basePath}stats`;
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			let writeOut = "";
			const property = `player${dataType}StatInfoList`;
			const stats = JSON.parse(body)[property];
			stats.forEach((stat) => {
				writeOut += stat;
			});
			break;

			//console.log(body)
			fs.writeFile("../src/data/weeklyInfo.json", writeOut, function (err) {
				if (err) {
					return console.log(err);
				} else {
					res.sendStatus(200);

					return console.log("wrote weekly data successfully");
				}
			});
		});
	}
);

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
app.post("/:platform/:leagueId/freeagents/roster", (req, res) => {
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
