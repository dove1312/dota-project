import './App.scss';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import { useEffect } from 'react';
import axios from 'axios';



function App() {

  const asdasd = async () => {
    const asd = await axios({
      url: ` https://api.opendota.com/api/players/142056185/matches `
    })
    // console.log(asd)
  }

  useEffect(() => {
    asdasd()
  }, [])



  return (
    <BrowserRouter>
      <FrontPage />
    </BrowserRouter>
  );
}

export default App;
