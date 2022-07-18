const intersection = (set1, set2) => {
  return set1.filter((element) => set2.includes(element));
};

const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((element) => arr2.includes(element));
};

class Game {
  #gameId;
  #players;
  #currentPlayer;
  #maxPlayers;
  #symbols;
  #winner;
  #maxMoves;
  constructor(gameId) {
    this.#gameId = gameId;
    this.#players = [];
    this.#currentPlayer = null;
    this.#maxPlayers = 2;
    this.#symbols = ['X', 'O'];
    this.#winner = null;
    this.#maxMoves = 9;
  }

  addPlayer(name) {
    const symbol = this.#symbols[this.#players.length % this.#maxPlayers];
    const player = { name, symbol, moves: [] };
    this.#players.push(player);
    this.#currentPlayer = this.#players[0];
  }

  #updateCurrentPlayer() {
    const index = this.#players.findIndex(
      (player) => player === this.#currentPlayer
    );

    const nextIndex = (index + 1) % this.#players.length;
    this.#currentPlayer = this.#players[nextIndex];
  }

  isSlotAvailable() {
    return this.#players.length < this.#maxPlayers;
  }

  registerMove(cellId) {
    this.#currentPlayer.moves.push(cellId);
    this.#updateCurrentPlayer();
  }

  isCurrentPlayer(name) {
    return this.#currentPlayer.name === name;
  }

  #setWinner() {
    const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

    const winner = this.#players.find((player) => {
      return winningCombos.some((combo) => {
        return isEqual(combo, intersection(player.moves, combo));
      });
    });

    this.#winner = winner || null;
  }

  #isDraw() {
    const totalMoves = this.#players.reduce(
      (sum, { moves }) => sum += moves.length, 0
    );
    return !this.#winner && totalMoves === this.#maxMoves;
  }

  #isOver() {
    return this.#winner !== null || this.#isDraw();
  }

  getStats() {
    this.#setWinner();

    const stats = {};
    stats.gameId = this.#gameId;
    stats.players = this.#players;
    stats.currentPlayer = this.#currentPlayer;

    if (this.#isOver()) {
      stats.result = { winner: this.#winner, isDraw: this.#isDraw() };
    }

    return stats;
  }
}

module.exports = { Game };
