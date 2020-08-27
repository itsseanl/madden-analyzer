import AWS from "aws-sdk";
import fs from "fs";

export function UploadSpaces(params) {
	const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
	const s3 = new AWS.S3({
		endpoint: spacesEndpoint,
		accessKeyId: process.env.REACT_APP_DO_ACCESS_KEY,
		secretAccessKey: process.env.REACT_APP_DO_SECRET_KEY,
	});
	console.log(process.env.REACT_APP_DO_ACCESS_KEY);
	console.log(process.env.REACT_APP_DO_SECRET_KEY);

	s3.putObject(params, function (err, data) {
		if (err) {
			console.log(err, err.stack);
			return err;
		} else {
			console.log(data);
			return "success";
		}
	});
}

export function GetFiles() {
	const spacesEndpoint = new AWS.Endpoint(
		"sfuploads.nyc3.digitaloceanspaces.com"
	);
	const s3 = new AWS.S3({
		endpoint: spacesEndpoint,
		accessKeyId: process.env.REACT_APP_DO_ACCESS_KEY,
		secretAccessKey: process.env.REACT_APP_DO_SECRET_KEY,
	});
}
