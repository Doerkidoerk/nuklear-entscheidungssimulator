import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartScreen from './components/StartScreen'
import SimulationContainer from './components/SimulationContainer'
import DebriefingScreen from './components/DebriefingScreen'

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-black">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/simulation/:scenarioId" element={<SimulationContainer />} />
          <Route path="/debriefing" element={<DebriefingScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
