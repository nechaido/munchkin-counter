import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import clone from 'lodash.clonedeep';
import uuid from 'uuid/v4';

import Controls from './Controls';
import PlayerGrid from './PlayerGrid';

class App extends Component {
  constructor(props) {
    super(props);

    this.newPlayerName = '';
    this.state = {
      players: new Map(),
      gameStarted: false,
      addingPlayer: false,
    };
  }

  onGameStatusChange() {
    const state = clone(this.state);
    state.gameStarted = !state.gameStarted;
    this.setState(state);
  }

  onPlayerAdd() {
    const state = clone(this.state);
    state.addingPlayer = true;
    this.setState(state);
  }

  onNewPlayerNameChange(name) {
    this.newPlayerName = name;
    console.log(name);
  }

  resetTemp() {
    const state = clone(this.state);
    Array
      .from(state.players.values())
      .forEach(player => (player.temp = 0));
    this.setState(state);
  }

  updatePlayer(id, property, value) {
    if (typeof value !== 'number' || (property === 'level' && value < 1)) {
      return;
    }
    const state = clone(this.state);
    const player = state.players.get(id);
    player[property] = value;
    state.players.set(id, player);
    this.setState(state);
  }

  addPlayer() {
    const state = clone(this.state);
    state.addingPlayer = false;
    const player = {
      id: uuid(),
      name: this.newPlayerName,
      level: 1,
      power: 0,
      temp: 0,
    };
    state.players.set(player.id, player);
    this.setState(state);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={'counter'}>
          <Controls
            gameStarted={this.state.gameStarted}
            addingPlayer={this.state.addingPlayer}
            onGameStatusChange={() => this.onGameStatusChange()}
            onPlayerAdd={() => this.onPlayerAdd()}
            onPlayerAdded={() => this.addPlayer()}
            onNewPlayerNameChange={name => this.onNewPlayerNameChange(name)}
            onResetTemp={() => this.resetTemp()}
          />
          <PlayerGrid
            players={Array.from(this.state.players.values())}
            onUpdate={(...args) => this.updatePlayer(...args)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
