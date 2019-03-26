import Team from "./models/team";
import { Constant } from "./_helpers/constants";
import Player from "./models/player";

let teamList = [];
let playerList = [];
let createTeams = () => {
    Teams = [];
    for (let i = 0; i < Constant.teams.length; i++) {
        let teamData = Constant.teams[i];

        let teamPlayers = [];

        for (let j = 0; j < teamData.players.length; j++) {
            let name = teamData.players[j];
            let player = new Player(name, Constant.probabilityTable.find(x => x.name == name).value);

            teamPlayers.push(player);
            playerList.push(player);
        }

        teamList.push(new Team(teamData.name, teamPlayers));
    }
}

createTeams();