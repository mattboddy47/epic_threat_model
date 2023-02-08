import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

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