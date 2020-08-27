import React, { useState, useEffect } from "react";
import SortedData from "./SortedData";
const DataTable = ({ tableTitle, dataOptions, displayData, teamNameID }) => {
	const [sortVal, setSortVal] = useState("sort");
	let week = "";
	if (displayData[0].weekIndex) {
		week = " Week " + displayData[0].weekIndex;
	}
	return (
		<>
			<div className="bg-gray-400 p-5 top-0 sticky z-40">
				<div className="lg:px-5 w-11/12 lg:w-9/12 flex justify-between m-auto">
					<h2 className=" text-2xl font-bold">{tableTitle + week}</h2>
					<select
						onChange={(e) => setSortVal(e.target.value)}
						className="lock appearance-none w-2/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
						style={{ maxWidth: "150px" }}
					>
						<option value="" disabled selected>
							Sort
						</option>
						{Object.keys(dataOptions).map((key) => {
							return <option value={key}>{dataOptions[key]}</option>;
						})}
					</select>
				</div>
			</div>
			<div
				className="teamData w-10/12 overflow-y-scroll my-5 overflow-x-scroll m-auto border-gray-200  border-opacity-100 "
				style={{ height: "500px" }}
			>
				<table className="table-fixed w-auto  m-auto border-collapse top-0 ">
					<thead>
						<tr>
							{Object.keys(dataOptions).map((key) => {
								return (
									<th className="px-4 py-2 sticky top-0 bg-gray-400 z-10 ">
										{dataOptions[key]}
									</th>
								);
							})}
						</tr>
					</thead>
					{sortVal && (
						<SortedData
							sortVal={sortVal}
							dataOptions={dataOptions}
							displayData={displayData}
							teamNameID={teamNameID}
						/>
					)}
				</table>
			</div>
		</>
	);
};

export default DataTable;
