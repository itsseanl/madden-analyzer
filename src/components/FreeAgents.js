import React, { useState, useEffect } from "react";
import { FaCaretUp, FaCaretDown, FaEquals } from "react-icons/fa";
import data from "./data/freeAgents.json";

const FreeAgents = () => {
	const data = teamData.teamStandingInfoList;
	const lessGood = ["rank", "seed", "defTotalYds", "defPassYds", "defRushYds"];
	if (lessGood.includes(sortVal)) {
		data.sort((a, b) => a[sortVal] - b[sortVal]);
	} else {
		data.sort((a, b) => b[sortVal] - a[sortVal]);
	}
	return <></>;
};

export default FreeAgents;
