import React from "react";
import { FaCaretUp, FaCaretDown, FaEquals } from "react-icons/fa";

const SortedData = ({ sortVal, displayData, dataOptions, teamNameID }) => {
	const data = displayData;
	const lessGood = [
		"rank",
		"seed",
		"defTotalYds",
		"defPassYds",
		"defRushYds",
		"age",
	];
	if (lessGood.includes(sortVal)) {
		data.sort((a, b) => a[sortVal] - b[sortVal]);
	} else {
		data.sort((a, b) => b[sortVal] - a[sortVal]);
	}
	return (
		<>
			{data.map((team) => {
				let standing = "";
				let color = "";
				if (team.prevRank < team.rank) {
					standing = <FaCaretDown />;
					color = "standing text-red-600";
				} else if (team.prevRank > team.rank) {
					standing = <FaCaretUp />;
					color = "standing text-green-400";
				} else {
					standing = <FaEquals />;
					color = "standing text-gray-400";
				}
				return (
					<>
						<tr>
							{Object.keys(dataOptions).map((key) => {
								let theClasses = "px-4 py-2";
								let theContent = team[key];
								const rankingList = ["rank"];
								if (
									key == "teamName" ||
									key == "lastName" ||
									key == "fullName"
								) {
									theClasses = "px-4 py-2  bg-gray-400 sticky left-0 z-1";
								}
								if (key == "rank") {
									theClasses = "px-4 py-2 flex justify-between items-center";
								}
								if (key == "teamId") {
									Object.keys(teamNameID).map((teamKey) => {
										if (team[key] == teamKey) {
											return (theContent = teamNameID[teamKey]);
										}
									});
								}
								return (
									<>
										<td className={theClasses}>
											{theContent}{" "}
											{rankingList.includes(key) ? (
												<span className={color}>{standing}</span>
											) : null}
										</td>
									</>
								);
							})}
						</tr>
					</>
				);
			})}
		</>
	);
};

export default SortedData;
