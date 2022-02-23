import React from 'react';

import './App.css';
import {Header} from "./ui/Header/Header";
import {RoutesContainer} from "./ui/Routes/RoutesContainer";

function App() {
  return (
    <div className='app'>
        <Header/>
        <RoutesContainer/>

    </div>
  );
}

export default App;
