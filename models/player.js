const Constant = require("../_helpers/constants");

module.exports = class Player {

    constructor(name, probability, isPlaying = false, runsScored = 0, ballsPlayed = 0) {
        this.name = name;
        this.probability = probability;
        this.isPlaying = isPlaying;
        this.runsScored = runsScored;
        this.ballsPlayed = ballsPlayed;
    }

    getBallResult() {
        let score = Math.random();
        let cumulativeProbability = [];

        for (let i = 0; i < this.probability.length; i++) {
            let Cumulative = 0;
            for (let j = 0; j <= i; j++) {
                Cumulative = Cumulative + this.probability[j];
            }
            cumulativeProbability.push(Cumulative);
        }

        if (score < cumulativeProbability[0]) {
            this.updateScore(0);
            return { score: 0, isWicket: false };
        }
        else if (score >= cumulativeProbability[0] && score < cumulativeProbability[1]) {
            this.updateScore(1);
            return { score: 1, isWicket: false };
        }
        else if (score >= cumulativeProbability[1] && score < cumulativeProbability[2]) {
            this.updateScore(2);
            return { score: 2, isWicket: false };
        }
        else if (score >= cumulativeProbability[2] && score < cumulativeProbability[3]) {
            this.updateScore(3);
            return { score: 3, isWicket: false };
        }
        else if (score >= cumulativeProbability[3] && score < cumulativeProbability[4]) {
            this.updateScore(4);
            return { score: 4, isWicket: false };
        }
        else if (score >= cumulativeProbability[4] && score < cumulativeProbability[5]) {
            this.updateScore(5);
            return { score: 5, isWicket: false };
        }
        else if (score >= cumulativeProbability[5] && score < cumulativeProbability[6]) {
            this.updateScore(6);
            return { score: 6, isWicket: false };
        }
        else {
            this.updateScore(0);
            return { score: 0, isWicket: true };
        }
    }

    updateScore(run) {
        this.runsScored += run;
        this.ballsPlayed++;
    }

    updatePlayingStatus(status){
        this.isPlaying = status;
    }

}
