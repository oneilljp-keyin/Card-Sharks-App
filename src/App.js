import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header     from "./components/Header";
import HighScores from "./components/Scores";
import MainMenu   from "./components/MainMenu";
import Game       from "./components/Game";
import Money      from "./components/Money";
import InfoScreen from "./components/Infoscreen";
import AxiosTest  from "./components/AxiosTest/AxiosTest";
import SaveTest  from "./components/SaveHighScore";

import './App.css';

function App() {
  return (
    <Router basename="/card-sharks">
      <div className="App">
        <Header />
        <Switch>
          <Route path="/"   exact   component={MainMenu} />
          <Route path="/game"       component={Game} />
          <Route path="/money"      component={Money} />
          <Route path="/highscores" component={HighScores} />
          <Route path="/infoscreen" component={InfoScreen} />
          <Route path="/axiostest"  component={AxiosTest} />
          <Route path="/savetest"   component={SaveTest} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
