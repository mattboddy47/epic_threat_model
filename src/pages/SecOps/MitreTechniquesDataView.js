import {React} from 'react'
import '../../index.css';
import ThreatList from '../../components/ListMITRETechniques';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import TalkingGhost from '../../components/TalkingGhost';


export default function MitreTechniquesDataView() {
    const locationData = useLocation();
    const navigate = useNavigate();
    var data
    if (locationData.state === null){
        navigate('/error')
    } else {
        data = locationData.state.data;
    }

    return (
        <>
        <Button sx={{m: 4}} href={"/review-threats"}  startIcon={<ArrowBackIcon />} color="secondary" variant="text">Back to Overview</Button>
        <Box margin={4}>
        <TalkingGhost speech = {"Based on the information that you have provided, you have no mitigations in place for any of the techniques listed below."}/>
        </Box>

        <div class="centered">
<ThreatList techniquesAffectingUser= {data} />
            </div>
</>
    )
}