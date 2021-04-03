import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from "./components/Header";
import HighScores from "./components/HighScores";
import MainMenu from "./components/MainMenu";
import Regular from "./components/Regular";
import Money from "./components/Money";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact     component={MainMenu} />
          <Route path="/regular"    component={Regular} />
          <Route path="/money"      component={Money} />
          <Route path="/highscores" component={HighScores} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
