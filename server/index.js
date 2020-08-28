var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
const fs = require("fs");
var AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new AWS.S3({
	endpoint: spacesEndpoint,
	accessKeyId: process.env.REACT_APP_DO_ACCESS_KEY,
	secretAccessKey: process.env.REACT_APP_DO_SECRET_KEY,
});

//league info
app.post("/:platform/2177319/:leagueteams", (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		let theFile = {
			Bucket: "sfuploads/maddenstats",
			Key: "teamData.json",
			Body: body,
			ACL: "public-read",
		};

		s3.putObject(theFile, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				console.log("success");
				res.sendStatus(200);
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
	"/:platform/:leagueID/week/:weekType/:weekNumber/:dataType",
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

					let theFile = {
						Bucket: "sfuploads/maddenstats",
						Key: "schedulesInfo.json",
						Body: body,
						ACL: "public-read",
					};

					s3.putObject(theFile, function (err, data) {
						if (err) {
							console.log(err, err.stack);
						} else {
							console.log("success");
						}
					});
					theFile = {
						Bucket: "sfuploads/maddenstats",
						Key: `week${weekNum}schedulesInfo.json`,
						Body: body,
						ACL: "public-read",
					};

					s3.putObject(theFile, function (err, data) {
						if (err) {
							console.log(err, err.stack);
						} else {
							console.log("success");
							res.sendStatus(200);
						}
					});

					// fs.writeFile(
					// 	`../public/data/week${weekNum}schedulesInfo.json`,
					// 	writeOut,
					// 	function (err) {
					// 		if (err) {
					// 			return console.log(err);
					// 		} else {
					// 			return console.log("wrote weekly data successfully");
					// 		}
					// 	}
					// );
					// fs.writeFile(`../public/data/schedulesInfo.json`, writeOut, function (
					// 	err
					// ) {
					// 	if (err) {
					// 		return console.log(err);
					// 	} else {
					// 		res.sendStatus(200);
					// 		return console.log("wrote weekly data successfully");
					// 	}
					// });
					break;
				}
				case "teamstats": {
					const { teamStatInfoList: teamStats } = JSON.parse(body);

					//teamStats.forEach((stat) => {
					writeOut += JSON.stringify(teamStats);
					//});
					let theFile = {
						Bucket: "sfuploads/maddenstats",
						Key: "teamStatsInfo.json",
						Body: body,
						ACL: "public-read",
					};
					s3.putObject(theFile, function (err, data) {
						if (err) {
							console.log(err, err.stack);
						} else {
							console.log("success");
						}
					});
					theFile = {
						Bucket: "sfuploads/maddenstats",
						Key: `week${weekNum}teamStatsInfo.json`,
						Body: body,
						ACL: "public-read",
					};

					s3.putObject(theFile, function (err, data) {
						if (err) {
							console.log(err, err.stack);
						} else {
							console.log("success");
							res.sendStatus(200);
						}
					});
					// fs.writeFile(
					// 	`../public/data/week${weekNum}teamStatsInfo.json`,
					// 	writeOut,
					// 	function (err) {
					// 		if (err) {
					// 			return console.log(err);
					// 		} else {
					// 			return console.log("wrote weekly data successfully");
					// 		}
					// 	}
					// );
					// fs.writeFile(`../public/data/teamStatsInfo.json`, writeOut, function (
					// 	err
					// ) {
					// 	if (err) {
					// 		return console.log(err);
					// 	} else {
					// 		res.sendStatus(200);

					// 		return console.log("wrote weekly data successfully");
					// 	}
					// });
					break;
				}
				case "defense": {
					const { playerDefensiveStatInfoList: defensiveStats } = JSON.parse(
						body
					);
					// defensiveStats.forEach((stat) => {
					writeOut += JSON.stringify(defensiveStats);
					let theFile = {
						Bucket: "sfuploads/maddenstats",
						Key: "defensiveStatsInfo.json",
						Body: body,
						ACL: "public-read",
					};
					s3.putObject(theFile, function (err, data) {
						if (err) {
							console.log(err, err.stack);
						} else {
							console.log("success");
						}
					});
					theFile = {
						Bucket: "sfuploads/maddenstats",
						Key: `week${weekNum}defensiveStatsInfo.json`,
						Body: body,
						ACL: "public-read",
					};

					s3.putObject(theFile, function (err, data) {
						if (err) {
							console.log(err, err.stack);
						} else {
							console.log("success");
							res.sendStatus(200);
						}
					});
					// });
					// fs.writeFile(
					// 	`../public/data/week${weekNum}defensiveStatsInfo.json`,
					// 	writeOut,
					// 	function (err) {
					// 		if (err) {
					// 			return console.log(err);
					// 		} else {
					// 			return console.log("wrote weekly data successfully");
					// 		}
					// 	}
					// );
					// fs.writeFile(
					// 	`../public/data/defensiveStatsInfo.json`,
					// 	writeOut,
					// 	function (err) {
					// 		if (err) {
					// 			return console.log(err);
					// 		} else {
					// 			res.sendStatus(200);

					// 			return console.log("wrote weekly data successfully");
					// 		}
					// 	}
					// );
					break;
				}
				default: {
					const property = `player${capitalizeFirstLetter(
						dataType
					)}StatInfoList`;

					try {
						const stats = JSON.parse(body)[property];
						//	stats.forEach((stat) => {
						writeOut += JSON.stringify(stats);
						//	});
						let theFile = {
							Bucket: "sfuploads/maddenstats",
							Key: `week${weekNum + property}Info.json`,
							Body: body,
							ACL: "public-read",
						};
						s3.putObject(theFile, function (err, data) {
							if (err) {
								console.log(err, err.stack);
							} else {
								console.log("success");
							}
						});
						theFile = {
							Bucket: "sfuploads/maddenstats",
							Key: `info.json`,
							Body: body,
							ACL: "public-read",
						};

						s3.putObject(theFile, function (err, data) {
							if (err) {
								console.log(err, err.stack);
							} else {
								console.log("success");
								res.sendStatus(200);
							}
						});
						// fs.writeFile(
						// 	`../public/data/week${weekNum + property}Info.json`,
						// 	writeOut,
						// 	function (err) {
						// 		if (err) {
						// 			return console.log(err);
						// 		} else {
						// 			return console.log("wrote weekly data successfully");
						// 		}
						// 	}
						// );
						// fs.writeFile(`../public/data/Info.json`, writeOut, function (err) {
						// 	if (err) {
						// 		return console.log(err);
						// 	} else {
						// 		res.sendStatus(200);

						// 		return console.log("wrote weekly data successfully");
						// 	}
						// });
					} catch (err) {
						console.log(err + " property:" + property);
					}
					break;
				}
			}
			//console.log(body)
		});
	}
);

//team rosters
app.post("/:platform/2177319/team/:teamID/roster", (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		let theFile = {
			Bucket: "sfuploads/maddenstats",
			Key: `teamRosters.json`,
			Body: body,
			ACL: "public-read",
		};

		s3.putObject(theFile, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				console.log("success");
				res.sendStatus(200);
			}
		});

		// fs.writeFile(`../public/data/teamRosters.json`, body, function (err) {
		// 	if (err) {
		// 		return console.log(err);
		// 	} else {
		// 		res.sendStatus(200);

		// 		return console.log("wrote team rosters successfully");
		// 	}
		// });
	});
});

//free agents
app.post("/:platform/2177319/freeagents/roster", (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		let theFile = {
			Bucket: "sfuploads/maddenstats",
			Key: `freeAgents.json`,
			Body: body,
			ACL: "public-read",
		};

		s3.putObject(theFile, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				console.log("success");
				res.sendStatus(200);
			}
		});
		// fs.writeFile(`../public/data/freeAgents.json`, body, function (err) {
		// 	if (err) {
		// 		return console.log(err);
		// 	} else {
		// 		res.sendStatus(200);

		// 		return console.log("wrote free agents successfully");
		// 	}
		// });
	});
});

//start server
app.listen(port);
console.log("Server Started ");
