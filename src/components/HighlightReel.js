import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const HighlightReel = ({ videoLinks }) => {
	const length = videoLinks.length - 1;

	const [translated, setTranslated] = useState("0");
	function scrollRight() {
		let translatePos = translated;
		if (translatePos++ < length) {
			setTranslated(translatePos++);
		} else {
			setTranslated("0");
		}
	}
	function scrollLeft() {
		let translatePos = translated;
		if (translatePos-- < 0) {
			setTranslated(length);
		} else {
			setTranslated(translatePos--);
		}
	}

	return (
		<div className="bg-gray-600 p-5 flex ">
			<div
				className="h-full flex justify-center content-center m-auto"
				onClick={() => scrollLeft()}
			>
				<FaCaretLeft size={32} />
			</div>
			<div className="wrapper overflow-hidden m-auto" style={{ width: "90vw" }}>
				<div
					className="w-auto flex transition-all duration-300"
					style={{ transform: `translateX(-${translated * 90}vw)` }}
				>
					{videoLinks.map((video) => {
						if (video == "madden/") {
							return;
						} else {
							return (
								<video
									type="video/mp4"
									controls
									height={"350px"}
									className="p-2"
									style={{ width: "90vw" }}
								>
									<source
										src={
											"https://sfuploads.nyc3.digitaloceanspaces.com/" + video
										}
									/>
								</video>
							);
						}
					})}
				</div>
			</div>
			<div
				className="h-full flex justify-center content-center m-auto"
				onClick={() => scrollRight()}
			>
				<FaCaretRight size={32} />
			</div>
		</div>
	);
};
export default HighlightReel;
