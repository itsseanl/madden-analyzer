import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import DataTable from "./components/DataTable";
import Parrot from "./football_parrot.gif";
import teamData from "./data/teamData.json";
import freeAgents from "./data/freeAgents.json";
import defensiveData from "./data/defensiveStatsInfo.json";

function App() {
	let teamNameID = {};
	//team data displayed attributes
	const teamOptions = {
		teamName: "Team",
		rank: "Rank",
		seed: "Seed",
		teamOvr: "OVR",
		totalWins: "Wins",
		totalLosses: "Losses",
		totalTies: "totalTies",
		offTotalYds: "Off. Yds",
		offPassYds: "Off. Pass Yds",
		offRushYds: "Off. Rush Yds",
		defTotalYds: "Def. Yds",
		defPassYds: "Def. Pass Yds",
		defRushYds: "Def Rush Yds",
	};

	//roster displayed attributes
	const freeAgentOptions = {
		firstName: "First Name",
		lastName: "Last name",
		age: "Age",
		accelRating: "Acceleration",
		isActive: "Active?",
		agilityRating: "Agility",
		awareRating: "Awareness",
		bCVRating: "Ball Carrier Vision",
		birthDay: "BirthDay",
		bigHitTrait: "Big Hit",
		blockShedRating: "Block Shedding",
		birthMonth: "Birth Month",
		breakSackRating: "Break Sack",
		breakTackleRating: "Break Tackle",
		birthYear: "Birth Year",
		college: "College",
		clutchTrait: "Clutch",
		confRating: "Conference",
		capHit: "Cap Hit",
		capReleaseNetSavings: "Cap Release Net Savings",
		capReleasePenalty: "Cap Release Penalty",
		contractBonus: "Contract Bonus",
		carryRating: "Carry",
		contractSalary: "Contract Salary",
		contractYearsLeft: "Contract Years Late",
		contractLength: "Contract Length",
		catchRating: "Catch",
		cITRating: "Catch In Traffic",
		coverBallTrait: "Cover Ball",
		dLBullRushTrait: "dL Bull Rush",
		dLSpinTrait: "dL Spin",
		dLSwimTrait: "dL Swim",
		durabilityGrade: "Durability",
		dropOpenPassTrait: "Drop Open Pass",
		draftPick: "Draft Pick",
		draftRound: "Draft Round",
		desiredBonus: "Desired Bonus",
		desiredSalary: "Desired Salary ",
		desiredLength: "Desired Length",
		devTrait: "Dev Trait",
		elusiveRating: "Elusive",
		fightForYardsTrait: "Fight For Yards",
		finesseMovesRating: "Finesse Moves",
		isFreeAgent: "Free Agent?",
		forcePassTrait: "Force Pass",
		feetInBoundsTrait: "Feet In Bounds",
		height: "Height",
		highMotorTrait: "High Motor",
		hPCatchTrait: "hP Catch",
		homeState: "Home State",
		homeTown: "HomeTown",
		hitPowerRating: "Hit Power",
		impactBlockRating: "Impact Block",
		intangibleGrade: "Intangible",
		injuryType: "Injury",
		jukeMoveRating: "Juke Move",
		jumpRating: "Jump",
		kickAccRating: "Kick Accuracy",
		kickPowerRating: "Kick Power",
		kickRetRating: "kick Return",
		leadBlockRating: "Lead Block",
		lBStyleTrait: "LB Style",
		legacyScore: "Legacy Score",
		manCoverRating: "Man Coverage",
		passBlockFinesseRating: "Pass Block Finesse",
		passBlockPowerRating: "Pass Block Power",
		playerBestOvr: "Best OVR",
		physicalGrade: "Physical Grade",
		playActionRating: "Play Action",
		playBallTrait: "Play Ball",
		playRecRating: "Play Receiver",
		penaltyTrait: "Penalty",
		productionGrade: "Production",
		predictTrait: "Predictability",
		presentationId: "Presentation ID",
		isOnPracticeSquad: "On Practice Squad?",
		pressRating: "Press",
		pursuitRating: "Pursuit Rating",
		passBlockRating: "Pass Block",
		posCatchTrait: "Posession Catch",
		playerSchemeOvr: "Player Scheme OVR",
		skillPoints: "Skill Points",
		position: "Position",
		powerMovesRating: "Power Moves",
		qBStyleTrait: "QB Style",
		runBlockFinesseRating: "Run Block Finesse",
		runBlockPowerRating: "Run Block Power",
		rookieYear: "Rookie Year",
		releaseRating: "Release Rating",
		runBlockRating: "Run Block",
		runStyle: "Run Style",
		rosterGoalList: "Roster Goal",
		rosterId: "Roster ID",
		reSignStatus: "Resign Status",
		routeRunDeepRating: "Route Run Deep",
		routeRunMedRating: "Route Run Med",
		routeRunShortRating: "Route Run Short",
		scheme: "scheme",
		signatureSlotList: "Signature Slot",
		sizeGrade: "Size",
		sensePressureTrait: "Sense Pressure",
		specCatchRating: "Spectacular Catch",
		speedRating: "Speed",
		spinMoveRating: "Spin Move",
		stripBallTrait: "Strip Ball",
		stiffArmRating: "Stiff Arm",
		staminaRating: "Stamina",
		strengthRating: "Strength",
		tackleRating: "Tackle",
		toughRating: "Toughness",
		tightSpiralTrait: "Tight Spiral",
		throwAccRating: "Throw Accuracy",
		throwAccDeepRating: "Throw Accuraccy Deep",
		throwAccMidRating: "Throw Accuracy Mid",
		throwAccShortRating: "Throw Accuracy Short",
		throwAwayTrait: "ThrowAway",
		throwPowerRating: "Throw Power",
		throwOnRunRating: "Throw on Run",
		throwUnderPressureRating: "Throw Under Pressure",
		teamId: "Team",
		truckRating: "Truck",
		teamSchemeOvr: "Team Scheme",
		weight: "Weight",
		experiencePoints: "EXP Points",
		yACCatchTrait: "Yards After Catch",
		yearsPro: "Years Pro",
		zoneCoverRating: "Zone Coverage",
	};

	const defensiveStats = {
		fullName: "Name",
		teamId: "Team",
		defCatchAllowed: "Catch Allowed",
		defDeflections: "Deflections",
		defForcedFum: "Forced Fumbles",
		defFumRec: "Fumble Recoveries",
		defInts: "Interceptions",
		defIntReturnYds: "Interception Return Yards",
		defPts: "Points",
		defSacks: "Sacks",
		defSafeties: "Safeties",
		defTDs: "TDs",
		defTotalTackles: "Tackels",
		stageIndex: "Stage Index (??)",
		weekIndex: "Week Index",
	};

	teamData.teamStandingInfoList.map((team) => {
		return (teamNameID[team.teamId] = team.teamName);
	});
	return (
		<div className="App">
			<header className="App-header flex flex-col justify-center content-center bg-gray-800">
				<img src={Parrot} className="p-5 w-1/4 m-auto" />
				<h1 className="text-4xl text-white text-center p-5">
					Madden Stats Baybeee
				</h1>
			</header>
			<DataTable
				tableTitle={"Team Data"}
				dataOptions={teamOptions}
				displayData={teamData.teamStandingInfoList}
				teamNameID={teamNameID}
			/>
			<DataTable
				tableTitle={"Free Agents"}
				dataOptions={freeAgentOptions}
				displayData={freeAgents.rosterInfoList}
				teamNameID={teamNameID}
			/>
			<DataTable
				tableTitle={"Defensive Stats"}
				dataOptions={defensiveStats}
				displayData={defensiveData}
				teamNameID={teamNameID}
			/>
		</div>
	);
}

export default App;
