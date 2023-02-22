import * as React from 'react';
import '../index.css';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import add from '../images/add.png'
import { TitleWithButton } from "../components/TitleWithButton";
import CreateEpic from './DevSecOps/CreateEpic';
import { UserAuth } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';


export default function StartThreatModelling() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { user } = UserAuth();

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
if (user){
        return (
            <>
 <TitleWithButton
          title={"Epic Threat Models"}
          buttonLabel={"Add Epic"}
          onClick={handleClickOpen}
        />
                <Grid container
                    direction="row"
                    spacing={2}
                    marginBottom={5}
                    justifyContent="center"
                    alignItems="center">

                    {/* DEVSECOPS */}
                    <Grid item>
                        <Card
                            sx={{
                                boxShadow: 1,
                                borderRadius: 7,
                                padding: 0.25,
                                width: '90vw',
                                display: "flex"
                            }}>
                               
                            <CardActionArea
                                onClick={handleClickOpen}
                            >
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <CardMedia
                                    component="img"
                                    image={add}
                                    alt="Developer performing security tasks"
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 7,
                                        width: 100,
                                        height: 100
                                    }}
                                />
                                {/* USE https://www.midjourney.com/home/ FOR IMAGES */}
                                <CardContent
                                sx={{ flexDirection: 'column', display:'flex', flex: '1 0 auto' }}
                                >
                                    <Typography variant="h6">
                                        Add new Epic
                                    </Typography>
                                    <Typography >
                                        Add the Epic that you are about to start work on to understand the Threats it could face
                                    </Typography>
                                </CardContent>
                                </Box>

                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>

                <CreateEpic
                onClose={handleClose}
                open={open}
                user={user}
                />
            </>
        )
                                }

                                return (

                                    <div class="centered">
                                      <CircularProgress />
                                    </div>

                                )
    
}