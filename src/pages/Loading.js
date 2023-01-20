import {React, useEffect} from 'react'
import '../index.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


const Loading = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("TEST", user)
        if (user == null || user.uid == null){
            console.log("1", user)
            navigate('/signin')
        }
        // eslint-disable-next-line 
        else if (user.uid != undefined && user.uid != null) {
            console.log("2", user)
            navigate('/start-threat-modelling')
        }
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
<div class="centered">
<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
            </div>

    )
}

export default Loading;