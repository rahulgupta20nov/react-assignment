import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './TopNav.scss';


export default function TopNav() {
  const [name, setName] = React.useState('Alan Lambert');
  const handleChange = event => {
    setName(event.target.value);
  };
  
  return (
    <div className="text-right">
      <FormControl>
        <Select value={name} onChange={handleChange} disableUnderline={true} className="select-person">
          {['Alan Lambert', 'Alan Lambert_1', 'Alan Lambert_2'].map((val, index) => 
            <MenuItem value={val} key={index}>{val}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}