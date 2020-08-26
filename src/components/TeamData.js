import React from "react";
import teamData from "../data/teamData.json";

const TeamData = () => {
	const data = teamData.teamStandingInfoList;
	console.log(data);
	return (
		<div className="teamData">
			<ul>
				{data.map((team) => {
					return (
						<>
							<li>{team.teamName}</li>
						</>
					);
				})}
			</ul>
		</div>
	);
};

export default TeamData;
