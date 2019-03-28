class Team {
    constructor(name, players = []) {
        this.name = name;
        this.players = players;
    }

    addPlayers(players) {
        this.players = players;
    }
}

module.exports = Team;