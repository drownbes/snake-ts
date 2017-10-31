import * as React from 'react';
import './App.css';
import { Grid } from './components/grid/Grid';
import { Game, GameStateEnum } from './game/Game';

class App extends React.Component<{}, {game: Game}> {

  private game: Game;

  constructor() {
    super();
    this.game = new Game(() => this.setState({game: this.game}));
    this.state = {game: this.game};
  }

  update() {
    this.setState({game: this.game});
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.game.start();
          }}
        >
          Restart
        </button>

        <button
          onClick={() => {
            this.game.start();
          }}
        >
          Start
        </button>

        {(this.state.game.gameState === GameStateEnum.Run && <Grid game={this.state.game}/>)}
        {(this.state.game.gameState === GameStateEnum.Fail && <div>Fail</div>)}

      </div>
    );
  }
}

export default App;
