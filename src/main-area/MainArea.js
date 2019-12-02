import React from 'react';
import './MainArea.scss';
import TopNav from './top-nav/TopNav';
import ContentArea from './ContentArea.js/ContentArea';

export class MainArea extends React.Component {

  render() {
    return (
      <div className="container col-md-10 offset-md-2 main-area">
        <TopNav />
        <div className="header">
          <h1>Deal Room</h1>
        </div>
        <ContentArea/>
      </div>
    );
  }

}