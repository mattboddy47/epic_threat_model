import * as React from 'react';
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChosenTechCard from "./ChosenTechCard";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddTechCard from './AddTechCard';
import Dialog from '@mui/material/Dialog';
import AddTech from './AddTech';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const DevSecOpsAddTech = (props) => {
  const [loading, setLoading] = useState(true)
  const [newTechnologyUrl, setNewTechnologyUrl] = useState()
  const user = props.user;
  const assetsJson = props.assetsJson;
  const userTech = props.userTech;
  const setUserTech = props.setUserTech;
  const userTechCount = Object.keys(userTech).length;
  const storage = getStorage();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    const loadNewTechURL = () => {
      const imageRef = ref(storage, 'images/technology.png');

      // Download the image URL from Firebase
      getDownloadURL(imageRef)
        .then((imageUrl) => {
          setNewTechnologyUrl(imageUrl);
        }).catch(error => {
          switch (error.code) {
            case 'storage/quota-exceeded':
              navigate('/error', { state: { speech: out_of_cloud_hosting_credit } })
              break;
            default:
              navigate('/error')
              break;
          }
        }
        ).finally(
          setLoading(false)
        );
    }

    var loadingProgressCount = 0;
    // if the user hasn't added any tech yet, there will be no images to download, we are therefore done loading
    if (userTechCount === 0) {
      loadNewTechURL();
    }

    userTech.forEach(asset => {
      const imageRef = ref(storage, 'images/' + asset.image);



      // Download the image URL from Firebase
      getDownloadURL(imageRef)
        .then((imageUrl) => {
          asset.imageUrl = imageUrl;
          loadingProgressCount = loadingProgressCount + 1;
        }).catch(error => {
          loadingProgressCount = loadingProgressCount + 1;
          switch (error.code) {
            case 'storage/quota-exceeded':
              navigate('/error', { state: { speech: out_of_cloud_hosting_credit } })
              break;
            default:
              navigate('/error')
              break;

          }

        }
        ).finally(
          () => {
            if (loadingProgressCount === userTechCount) {
              loadNewTechURL();
            }
          }
        );

    });
    // eslint-disable-next-line 
  }, [userTech]);


  if (!loading) {
    return (
      <>

        <Box sx={{
          marginLeft: '150px',
          marginRight: '150px',
          marginBottom: '45px',
          flexGrow: 1
        }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginBottom={2}
            spacing={2}>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              Current Tech Stack
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => handleClickOpen()}
              color="primary"
              variant="contained">
              Add Tech
            </Button>
          </Stack>
          <Divider />

        </Box>
        {/* <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{"Current Tech Stack"}</Typography> */}


        <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center">

          {userTechCount === 0 && <AddTechCard newTechnologyUrl={newTechnologyUrl} handleClickOpen={handleClickOpen} />}

          {Object.keys(userTech).map((key) => {
            return (
              <Grid item >
                <ChosenTechCard
                  image={userTech[key].imageUrl}
                  name={userTech[key].name}
                  assetName={userTech[key].asset}
                  description={userTech[key].description}
                  user={user}
                  allTech={userTech}
                  setTech={setUserTech}
                />

              </Grid>
            );
          })}
        </Grid>


        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Add Tech to Stack
              </Typography>
            </Toolbar>
          </AppBar>

          <AddTech
            user={user}
            userTech={userTech}
            setUserTech={setUserTech}
            assetsJson={assetsJson}
            handleCloseAddTech={handleClose}
          />
        </Dialog>

      </>
    )
  }
  return (
    <>
      <div class="centered">

        <CircularProgress />
      </div>
    </>
  )
}