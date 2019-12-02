import React from 'react';
import './App.scss';
import { LeftSideNav } from './left-side-nav/LeftSideNav';
import { MainArea } from './main-area/MainArea';

function App() {
  return (
    <div className="row mr-0">
      <LeftSideNav />
      <MainArea />
    </div>
  );
}

export default App;
