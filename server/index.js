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
				return console.log("wrote file successfully");
			}
		});
	});
});
//start server
app.listen(port);
console.log("Server Started ");
