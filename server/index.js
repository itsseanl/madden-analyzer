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

//
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//weekly info
app.post(
	"/:platform/:leagueId/week/:weekType/:weekNumber/:dataType",
	(req, res) => {
		console.log("weekly info path: " + req.params.dataType);
		let weekNum = req.params.weekNumber;

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
			switch (dataType) {
				case "schedules": {
					const { gameScheduleInfoList: schedules } = JSON.parse(body);
					writeOut += schedules;
					break;
				}
				case "teamstats": {
					const { teamStatInfoList: teamStats } = JSON.parse(body);

					teamStats.forEach((stat) => {
						writeOut += stat;
					});
					break;
				}
				case "defense": {
					const { playerDefensiveStatInfoList: defensiveStats } = JSON.parse(
						body
					);
					defensiveStats.forEach((stat) => {
						writeOut += stat;
					});
					break;
				}
				case "punting": {
					try {
						const { playerDefensiveStatInfoList: puntingStats } = JSON.parse(
							body
						);
						puntingStats.forEach((stat) => {
							writeOut += stat;
						});
					} catch (err) {
						console.log(err);
					}
					break;
				}
				default: {
					const property = `player${capitalizeFirstLetter(
						dataType
					)}StatInfoList`;

					try {
						const stats = JSON.parse(body)[property];
						stats.forEach((stat) => {
							writeOut += stat;
						});
					} catch (err) {
						console.log(err + " property:" + property);
					}
					break;
				}
			}
			writeOut = JSON.stringify(writeOut);
			//console.log(body)
			fs.writeFile(`../src/data/week${weekNum}Info.json`, writeOut, function (
				err
			) {
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
