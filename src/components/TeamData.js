import React, { useState, useEffect } from "react";
import SortedData from "./SortedData";
const TeamData = () => {
	const [sortVal, setSortVal] = useState("sort");
	useEffect(() => {
		console.log("sort value changed: " + sortVal);
	}, [sortVal]);
	return (
		<>
			<div className="bg-gray-400 p-5 top-0 ">
				<div className="lg:px-5 w-11/12 lg:w-9/12 flex justify-between m-auto">
					<h2 className=" text-2xl font-bold">Team Data</h2>
					<select
						onChange={(e) => setSortVal(e.target.value)}
						className="lock appearance-none w-2/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
						style={{ maxWidth: "150px" }}
					>
						<option value="" disabled selected>
							Sort
						</option>
						<option value="rank">Rank</option>
						<option value="seed">Seed</option>
						<option value="teamOvr">OVR</option>
						<option value="totalWins">Wins</option>
						<option value="totalLosses">Losses</option>
						<option value="totalTies">Ties</option>
						<option value="offTotalYds">Off. Yds</option>
						<option value="offPassYds">Off. Pass Yds</option>
						<option value="offRushYds">Off. Rush Yds</option>
						<option value="defTotalYds">Def. Yds</option>
						<option value="defPassYds">Def. Pass Yds</option>
						<option value="defRushYds">Def. Rush Yds</option>
					</select>
				</div>
			</div>
			<div className="teamData w-10/12 h-64  overflow-y-scroll my-5 overflow-x-scroll m-auto border-gray-200 border-2 border-opacity-100 ">
				<table className="table-fixed w-auto  m-auto relative border-collapse top-0 z-40 ">
					<thead>
						<tr>
							<th className="px-4 py-2 sticky top-0 bg-gray-400 ">Team</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Rank</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Seed</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">OVR</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Wins</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Losses</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Ties</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Off. Yds</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Pass</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Run</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Def. Yds</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Pass</th>
							<th className="px-4 py-2 sticky top-0 bg-gray-400">Run</th>
						</tr>
					</thead>
					{sortVal && <SortedData sortVal={sortVal} />}
				</table>
			</div>
		</>
	);
};

export default TeamData;
