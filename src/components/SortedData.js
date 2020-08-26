import React, { useState, useEffect } from "react";
import teamData from "../data/teamData.json";
import { FaCaretUp, FaCaretDown, FaEquals } from "react-icons/fa";

const SortedData = ({ sortVal }) => {
	const data = teamData.teamStandingInfoList;
	const lessGood = ["rank", "seed", "defTotalYds", "defPassYds", "defRushYds"];
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
						<tr class="">
							<td className="border px-4 py-2 bg-gray-100">{team.teamName}</td>
							<td className="border px-4 py-2 flex justify-between items-center">
								{team.rank} <span className={color}>{standing}</span>
							</td>
							<td className="border px-4 py-2">{team.seed}</td>
							<td className="border px-4 py-2">{team.teamOvr}</td>
							<td className="border px-4 py-2">{team.totalWins}</td>
							<td className="border px-4 py-2">{team.totalLosses}</td>
							<td className="border px-4 py-2">{team.totalTies}</td>
							<td className="border px-4 py-2">{team.offTotalYds}</td>
							<td className="border px-4 py-2">{team.offPassYds}</td>
							<td className="border px-4 py-2">{team.offRushYds}</td>
							<td className="border px-4 py-2">{team.defTotalYds}</td>
							<td className="border px-4 py-2">{team.defPassYds}</td>
							<td className="border px-4 py-2">{team.defRushYds}</td>
						</tr>
					</>
				);
			})}
		</>
	);
};

export default SortedData;
