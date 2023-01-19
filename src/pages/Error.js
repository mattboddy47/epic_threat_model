import {React} from 'react'
import '../index.css';
import Box from '@mui/material/Box';
import TalkingGhost from '../components/TalkingGhost';
import { useLocation } from "react-router-dom";


export default function Error() {
    const locationData = useLocation();
    var speech
    if (locationData.state !== null){
        speech = locationData.state.speech;

    }

    return (
        <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="70vh"
>
<TalkingGhost speech = {speech}/>
</Box>
    )
}