import React from 'react';
import { AppBar, Tabs, Tab, Link } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './SidebarInfo.scss';
import TabPanel from '../TabPanel';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
}));

export function SideBarInfo(){
  const classes = useStyles();
  const [value, setValue] = React.useState('tab-0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeSideNav = (e) => {
    e.preventDefault()
  }

  return (
    <div className={`${classes.list} container-sm`}>
      <header className="text-right top-bar">
        <Link className="close-sidenav" onClick={closeSideNav}>
          Close <CloseIcon />
        </Link>
      </header>
      <div>
      <AppBar position="static" color="default">
        <Tabs 
        value={value} 
        indicatorColor="primary"
        onChange={handleChange}
        variant="fullWidth"
        aria-label="wrapped label tabs example">
          {
            ['Deal Info', 'Additional Info'].map((val, index) => 
              <Tab value={'tab-' + index} label={val} wrapped key={index}/>
            )
          }
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={'tab-0'} className="tab-panel">
        Item One
      </TabPanel>
      <TabPanel value={value} index={'tab-1'} className="tab-panel">
        Item Two
      </TabPanel>
      </div>
    </div>
  );
}