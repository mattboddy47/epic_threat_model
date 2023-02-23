import * as React from 'react';
import { useState, useEffect } from 'react'
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
import epicLogo from '../images/epic.png'
import { TitleWithButton } from "../components/TitleWithButton";
import CreateEpic from '../components/Epics/CreateEpic';
import { UserAuth } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { getEpics } from '../Functions/Epics';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';


export default function StartThreatModelling() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [epics, setEpics] = useState();
    const { user } = UserAuth();

    const handleClickOpenEpic = (epic) => {
        navigate("/choose-tech", { state: { id: epic.id } })
    }

    const handleDeleteEpic = (epic) => {

    }

    const handleClickOpenAddEpicDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // retrieve all existing epics from the DB
        getEpics(user)
            .then((allEpics) => {
                setEpics(allEpics)

            })
            .catch(
                (error) => {
                    switch (error) {
                        case ('user_error'):
                            break;
                        default:
                            navigate('/error')
                    }
                }
            )

    }, [user, epics]
    )

    if (epics) {
        return (
            <>
                <TitleWithButton
                    title={"Epic Threat Models"}
                    buttonLabel={"Add Epic"}
                    onClick={handleClickOpenAddEpicDialog}
                />
                <Grid container
                    direction="row"
                    spacing={2}
                    marginBottom={5}
                    justifyContent="center"
                    alignItems="center">

                    {/* Add new Epic card */}
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
                                onClick={handleClickOpenAddEpicDialog}
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
                                        sx={{ flexDirection: 'column', display: 'flex', flex: '1 0 auto' }}
                                    >
                                        <Typography variant="h6">
                                            Add new Epic
                                        </Typography>
                                        <Typography variant='body2' color={"text.secondary"}>
                                            Add the Epic that you are about to start work on to start modeling the Threats it could face
                                        </Typography>
                                    </CardContent>
                                </Box>

                            </CardActionArea>
                        </Card>
                    </Grid>

                    {/* Loop over existing Epics */}
                    {Object.keys(epics).map((key) => {
                        const creationDate = new Date(epics[key].creationDate)
                        return (
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
                                        onClick={() => handleClickOpenEpic(epics[key])}
                                    >
                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <CardMedia
                                                component="img"
                                                image={epicLogo}
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
                                                sx={{ flexDirection: 'column', display: 'flex', flex: '1 0 auto' }}
                                            >
                                                <Typography sx={{ marginBottom: '5px' }} variant="h6">
                                                    {epics[key].name}
                                                </Typography>

                                                <Grid container
                                                    direction="row"
                                                    spacing={1}
                                                    justifyContent="flex-start"
                                                    alignItems="center">
                                                    <Grid item>
                                                        <Typography variant='body2' color={"text.secondary"}>
                                                            Created {creationDate.getDate()}/{creationDate.getMonth()}/{creationDate.getFullYear()}
                                                        </Typography>
                                                    </Grid>
                                                    <Divider orientation='vertical' sx={{ marginLeft: '8px', marginTop: '5px' }} />
                                                    <Grid item>
                                                        <Typography variant='body2' color={"text.secondary"}>Security Priorities: </Typography>
                                                    </Grid>
                                                    {Object.keys(epics[key].securityFocus).map((securityFocusKey) => {
                                                        return (
                                                            <Grid item>
                                                                <Chip
                                                                    color={"primary_transparent_30"}
                                                                    label={epics[key].securityFocus[securityFocusKey]}
                                                                    size="small" />
                                                            </Grid>
                                                        )
                                                    })}
                                                    
                                                </Grid>

                                            </CardContent>

                                        </Box>

                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })
                    }
                </Grid>

                {/* Create Epic Dialog popup */}
                <CreateEpic
                    onClose={handleClose}
                    open={open}
                    user={user}
                    epics={epics}
                    setEpics={setEpics}
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