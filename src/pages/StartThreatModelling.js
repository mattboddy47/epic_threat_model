import * as React from 'react';
import { useEffect, useState } from 'react'
import '../index.css';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../Text/ErrorTexts';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';


export default function StartThreatModelling() {
    const navigate = useNavigate();
    const storage = getStorage();
    const [devSecOpsImage, setDevSecOpsImage] = useState()
    const [secOpsImage, setSecOpsImage] = useState()


    useEffect(() => {
        const devSecOpsimageRef = ref(storage, 'images/devsecops2.png');
        const secOpsimageRef = ref(storage, 'images/secops1.png');

        getDownloadURL(devSecOpsimageRef)
            .then((imageUrl) => {
                setDevSecOpsImage(imageUrl);
            }).catch(error => {
                console.log(error)
                switch (error.code) {
                    case 'storage/quota-exceeded':
                        navigate('/error', { state: { speech: out_of_cloud_hosting_credit } })
                        break;
                    default:
                        navigate('/error')
                        break;
                }
            })


        getDownloadURL(secOpsimageRef)
            .then((imageUrl) => {
                setSecOpsImage(imageUrl);
            }).catch(error => {
                console.log(error)
                switch (error.code) {
                    case 'storage/quota-exceeded':
                        navigate('/error', { state: { speech: out_of_cloud_hosting_credit } })
                        break;
                    default:
                        navigate('/error')
                        break;
                }
            })
           // eslint-disable-next-line  
    }, []);

    if (secOpsImage && devSecOpsImage) {

        return (
            <>
                <Typography textAlign={'center'}  margin={2} gutterBottom component="div">
 Please select the pathway that you are wanting to model... </Typography>
                <Grid container
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center">
                    {/* SECOPS */}
                    <Grid item>
                        <Card
                            sx={{
                                boxShadow: 1,
                                borderRadius: 7,
                                marginTop: 4,
                                marginBottom: 5
                            }}>
                            <CardActionArea
                                onClick={event => {
toast.info("SecOps Threat Modelling is coming soon")
                                    // navigate('/choose-assets')
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={secOpsImage}
                                    alt="Security Operations Centre"
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 7,
                                        width: 350,
                                    }}
                                />
                                {/* USE https://www.midjourney.com/home/ FOR IMAGES */}
                                <CardContent
                                    sx={{
                                        width: 350,
                                        height: 150,
                                    }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        SecOps
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Start threat modelling your hardware
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    {/* DEVSECOPS */}
                    <Grid item>
                        <Card
                            sx={{
                                boxShadow: 1,
                                borderRadius: 7,
                                marginTop: 4,
                                marginBottom: 5
                            }}>
                            <CardActionArea
                                onClick={event => {
                                    navigate('/choose-tech')
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={devSecOpsImage}
                                    alt="Developer performing security tasks"
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 7,
                                        width: 350,
                                    }}
                                />
                                {/* USE https://www.midjourney.com/home/ FOR IMAGES */}
                                <CardContent
                                    sx={{
                                        width: 350,
                                        height: 150,
                                    }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        DevSecOps
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Start threat modelling for the software you are creating
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="70vh"
        >
            <CircularProgress />
        </Box>
    )
}