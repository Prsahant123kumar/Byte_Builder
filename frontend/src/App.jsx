import { useState } from 'react'
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Host from './Components/Host';
import LeaderBoard from './Components/LeaderBoard';
import AboutContest from './Components/AboutContest';
import Cards from './Components/Cards';
import DisplayQuestion from './Components/DisplayQuestion';
import SeeLeaderBoard from './Components/SeeLeaderBoard';
import Participants from './Components/Participants'; // Ensure the path is correct
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/Login" element={<Login />}/>
        <Route exact path="/SignUp" element={<SignUp/>}/>
        <Route exact path="/CreateContest" element={<Host/>}/>
        <Route exact path="/Cards" element={<Cards/>}/>
        <Route exact path="/Participants" element={<Participants/>}/>
        <Route exact path="/Start" element={<AboutContest/>}/>
        <Route exact path="/display" element={<DisplayQuestion/>}/>
        <Route exact path="/SeeLeaderBoard" element={<SeeLeaderBoard/>}/>
        <Route exact path="/LeaderBoard" element={<LeaderBoard/>}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App
