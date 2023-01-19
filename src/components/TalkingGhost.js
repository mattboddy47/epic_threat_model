import {React} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ghost_logo from '../images/ghost_logo.png'
import Box from '@mui/material/Box';
import { default_error_message } from '../Text/ErrorTexts';


export default function TalkingGhost(props) {
    var speech = props.speech

    if (!speech){
        speech = default_error_message
    }
    return(
        <Grid container
        direction="row"
        display="flex"
        spacing={2}
        justifyContent="center"
        alignItems="center">
          <Grid item>
      <img alt="Fred the friendly ghost" src={ghost_logo} height={100}/>
      </Grid>
      <Grid item>
      <Box sx={{
                bgcolor: '#fff',
                boxShadow: 1,
                borderRadius: 10,
                p: 2,
                minWidth: 300,
              }}>
<Typography color='#000' textAlign={'center'} sx={{fontWeight: 'bold' }} >
                    {speech}
</Typography>      </Box>
      </Grid>
      </Grid>
    )
}