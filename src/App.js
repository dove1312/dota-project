import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HeroInfo from './components/HeroInfo';



function App() {



  return (
    <BrowserRouter>
    <div className="App">
      <p>okokok</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HeroInfo" element={<HeroInfo />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
