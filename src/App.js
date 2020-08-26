import React from "react";
import logo from "./logo.svg";
import TeamData from "./components/TeamData";
import Parrot from "./football_parrot.gif";
function App() {
	return (
		<div className="App">
			<header className="App-header flex flex-col justify-center content-center bg-gray-800">
				<img src={Parrot} className="p-5 w-1/4 m-auto" />
				<h1 className="text-4xl text-white text-center p-5">
					Madden Stats Baybeee
				</h1>
			</header>
			<TeamData />
		</div>
	);
}

export default App;
