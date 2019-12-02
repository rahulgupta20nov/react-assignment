import React from 'react';
import './LeftSideNav.scss';
import logo from './../images/Sample-jpg-image-500kb.jpg';

export class LeftSideNav extends React.Component{
  state = {
    active: 0,
  }

  activateListItem = (index) => {
    this.setState({
      active: index,
    });
  }

  render() {
    return (
      <div className="left-side-nav col-md-2">
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <div>
          <ul className="list">
            {['Deal Room', 'Broker-Dealer Registry', 'Issuance Statistics'].map((val, index) => 
                <li 
                  key={index} 
                  className={`list-item ${this.state.active === index ? 'active' : ''}`}
                  onClick={() => this.activateListItem(index)}
                >{val}</li>
              )}
          </ul>
        </div>
      </div>
    );
  }
}