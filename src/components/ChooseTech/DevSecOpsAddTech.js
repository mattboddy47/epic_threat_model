import * as React from 'react';
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import ChosenTechCard from "./ChosenTechCard";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import { TitleWithButton } from "../TitleWithButton";
import { FullScreenDialog } from "../FullScreenDialog";
import CircularProgress from '@mui/material/CircularProgress';
import AddTechCard from './AddTechCard';
import AddTech from './AddTech';



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

        <TitleWithButton
          title={"Current Tech Stack"}
          buttonLabel={"Add Tech"}
          onClick={handleClickOpen}
        />
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

        <FullScreenDialog
          title = {"Add Tech to Stack"}
          handleClose = {handleClose}
          open = {open}
        >

          <AddTech
            user={user}
            userTech={userTech}
            setUserTech={setUserTech}
            assetsJson={assetsJson}
            handleCloseAddTech={handleClose}
          />
        </FullScreenDialog>

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