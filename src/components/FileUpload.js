import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import HighlightReel from "./HighlightReel";
const FileUpload = () => {
	const [theFile, setTheFile] = useState({});
	const [uploading, setUploading] = useState(true);
	const [uploadingToDO, setUploadingToDO] = useState(false);
	const [uploadMsg, setUploadMsg] = useState("");

	const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
	const s3 = new AWS.S3({
		endpoint: spacesEndpoint,
		accessKeyId: process.env.REACT_APP_DO_ACCESS_KEY,
		secretAccessKey: process.env.REACT_APP_DO_SECRET_KEY,
	});
	const [videoLinks, setVideoLinks] = useState([]);

	function getHighlights() {
		var params = {
			Bucket: "sfuploads",
			Prefix: "madden/",
		};

		s3.listObjects(params, function (err, data) {
			if (err) console.log(err, err.stack);
			else {
				let videoLinks = [];
				data["Contents"].forEach(function (obj) {
					console.log(obj["Key"]);
					videoLinks.push(obj["Key"]);
				});
				setVideoLinks(videoLinks);
			}
		});
	}

	useEffect(() => {
		getHighlights();
	}, []);

	const onFileChange = (file) => {
		if (file) {
			setUploading(true);
			console.log("file:", file);
			console.log(file.name);
			// console.log(file.body);
			var reader = new FileReader();
			let fileBody = "";
			reader.readAsArrayBuffer(file);
			reader.onload = function (evt) {
				fileBody = evt.target.result;
				console.log(fileBody);
				setTheFile({
					Bucket: "sfuploads/madden",
					Key:
						Math.floor(Math.random() * 10) +
						Math.floor(Math.random() * 10) +
						file.name,
					Body: fileBody,
					ACL: "public-read",
				});
				setUploading(false);
			};
			reader.onerror = function (evt) {
				console.log("error reading file");
			};
		}
	};

	const onFileUpload = () => {
		console.log(theFile);
		setUploadingToDO(true);
		setUploading(true);
		setUploadMsg("uploading, please wait...");
		doUpload();
	};

	const doUpload = () => {
		s3.putObject(theFile, function (err, data) {
			if (err) {
				console.log(err, err.stack);
				setUploadMsg(err);
				setUploadingToDO(false);
				setUploading(false);
			} else {
				console.log("success");
				setUploadMsg("Upload complete");
				setUploadingToDO(false);
				setUploading(false);
				getHighlights();
			}
		});
	};
	const [showUploader, setShowUploader] = useState(false);
	return (
		<>
			<div className="bg-gray-600 p-5">
				<div className="lg:px-5 w-11/12 lg:w-9/12 flex justify-between m-auto">
					<h2 className="text-2xl font-bold">Highlight Reel</h2>
					<div>
						{uploadingToDO ? <div>{uploadMsg}</div> : null}
						{showUploader ? (
							<>
								<input
									type="file"
									accept="video/mp4"
									onChange={(e) => onFileChange(e.target.files[0])}
								/>
								{uploading ? (
									<button
										className="bg-gray-200 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded transition-all duration-300"
										onClick={() => onFileUpload()}
										disabled="true"
									>
										Upload!
									</button>
								) : (
									<button
										className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded transition-all duration-300"
										onClick={() => onFileUpload()}
									>
										Upload!
									</button>
								)}
							</>
						) : (
							<button
								className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded transition-all duration-300"
								onClick={() => setShowUploader(!showUploader)}
							>
								Upload File (mp4)
							</button>
						)}
					</div>
				</div>
			</div>

			<HighlightReel videoLinks={videoLinks} />
		</>
	);
};
export default FileUpload;
