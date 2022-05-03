import './App.scss';
import Home from './components/Home';
import {  BrowserRouter } from 'react-router-dom';
import FrontPage from './components/FrontPage';



function App() {



  return (
    <BrowserRouter>
        <FrontPage/>
    </BrowserRouter>
  );
}

export default App;
