import React, { useState } from "react";
import AWS from "aws-sdk";

const HighlightReel = ({ videoLinks }) => {
	videoLinks.shift();
	console.log(videoLinks);

	return (
		<div className="bg-gray-600 p-5">
			<div className="lg:px-5 w-11/12 lg:w-9/12 flex justify-between m-auto">
				{videoLinks.map((video) => {
					return (
						<video type="video/mp4" controls width={"250px"} height={"250px"}>
							<source
								src={"https://sfuploads.nyc3.digitaloceanspaces.com/" + video}
							/>
						</video>
					);
				})}
			</div>
		</div>
	);
};
export default HighlightReel;
