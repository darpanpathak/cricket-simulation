const Team = require("./models/team");
const Constant = require("./_helpers/constants");
const Player = require("./models/player");

var teamList = [];
var playerList = [];
var player1, player2, batsman;
var totalScore = 0, wicketsFall = 0, oversBowled = 0, currentBall = 0;
var battingTeam;

function createTeams() {
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

function startMatch() {

    battingTeam = teamList.find(x => x.name == Constant.battingTeam);
    player1 = battingTeam.players[0];
    player2 = battingTeam.players[1];

    player1.updatePlayingStatus(true);
    player2.updatePlayingStatus(true);

    batsman = player1;

    runOversLoop();
}

function runOversLoop() {

    if (oversBowled <= Constant.totalOvers) {
        currentBall++;
        let ballResult = batsman.getBallResult();

        if (currentBall > 6) {
            oversBowled += 1;
            currentBall = 1;

            finishOver();
        }

        updateScore(ballResult.score, ballResult.isWicket, oversBowled + '.' + currentBall);
    }
}

function swapPlayers() {
    player1 = player2;
    player2 = batsman;

    batsman = player1;
}

function finishOver() {
    let leftOver = Constant.totalOvers - oversBowled;
    console.log(`${leftOver} ${leftOver > 1 ? 'overs' : 'over'} left. ${Constant.totalRunsToWin - totalScore} runs to win.`);
    swapPlayers(0, true);
}

function updateScore(run, isWicket, ball) {

    if (isWicket) {
        console.log(`${ball} ${batsman.name} got out`);
        wicketsFall++;
        handleWicketFall();
    }
    else {
        console.log(`${ball} ${batsman.name} scores ${run} ${run > 1 ? 'runs' : 'run'}`);
        checkForSwap(run);
        totalScore += run;
        checkForMaxScore();
    }

}

function checkForSwap(run, isOverFinished = false) {
    if (run % 2 == 1 || isOverFinished)
        swapPlayers();
}

function handleWicketFall() {
    if (battingTeam.players.length > wicketsFall + 1) {
        batsman.updatePlayingStatus(false);
        player1 = battingTeam.players[wicketsFall + 1];
        batsman = player1;

        runOversLoop();
    }
    else {
        finishMatch();
    }
}

function checkForMaxScore() {
    if (totalScore >= Constant.totalRunsToWin)
        finishMatch();
    else
        runOversLoop();
}

function finishMatch() {

    let status = totalScore >= Constant.totalRunsToWin ? Constant.winStatusText : Constant.lostStatusText;
    let remainingBall = (Constant.totalOvers - 1 - oversBowled) * Constant.ballsInSingleOver + Constant.ballsInSingleOver - currentBall;

    if (status === Constant.winStatusText)
        console.log(`${battingTeam.name} ${Constant.winStatusText} by ${battingTeam.players.length - wicketsFall} wicket and ${remainingBall} balls remaining`);
    else
        console.log(`${battingTeam.name} ${Constant.lostStatusText} by ${Constant.totalRunsToWin - totalScore} runs and ${remainingBall} balls remaining`);
}

createTeams();
startMatch();
