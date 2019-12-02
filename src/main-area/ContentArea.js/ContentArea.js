import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Tabs, Tab, Button, Drawer } from '@material-ui/core';
import TabPanel from './TabPanel';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import './ContentArea.scss';
import MyIssuance from './MyIssuance/MyIssuance';
import { SideBarInfo } from './SidebarInfo/SidebarInfo';


function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

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

export default function ContentArea() {
  const classes = useStyles();
  const [value, setValue] = React.useState('tab-2');
  const [industryInfo, setIndustryInfo] = React.useState({});
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const getIssuanceInfo = (event, index, info) => {
    const openIn= 'right';
    setState({ ...state, [openIn]: true });
    setIndustryInfo(info);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs 
        value={value} 
        indicatorColor="primary"
        onChange={handleChange} 
        aria-label="wrapped label tabs example">
          {
            ['External Issuance', 'Favorite Issuance', 'My Issuance', 'MNDA Management'].map((val, index) => 
              <Tab value={'tab-' + index} label={val} wrapped {...a11yProps(index)} key={index}/>
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
      <TabPanel value={value} index={'tab-2'} className="tab-panel">
        <div className="extra-menu-bar">
          <Button color="primary"><AddIcon className="button-icon"/> Add issuance</Button>
          <Button color="primary"><FilterListIcon className="button-icon"/> Filters</Button>
        </div>
        <MyIssuance getInfo={getIssuanceInfo}/>
      </TabPanel>
      <TabPanel value={value} index={'tab-3'} className="tab-panel">
        Item Four
      </TabPanel>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        <SideBarInfo industryInfo={industryInfo}/>
      </Drawer>
    </div>
  );
}