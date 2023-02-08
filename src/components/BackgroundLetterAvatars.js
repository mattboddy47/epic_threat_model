import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';


function stringAvatar(name) {
  return {
    sx: {
      bgcolor: deepPurple[500],
    },
    // children: name
    children: `${name.split(' ')[0][0]}`,
  };
}



function BackgroundLetterAvatar(props) {
    const name = props.userName;

  return (
        <Avatar {...stringAvatar(name)} />
  );
}


export default BackgroundLetterAvatar;