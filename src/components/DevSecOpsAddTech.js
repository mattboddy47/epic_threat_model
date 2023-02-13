import { React, useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChosenTechCard from "./ChosenTechCard";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CurrentTechStack from './CurrentTechStack';


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


  useEffect(() => {

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
  }, []);


  if (!loading) {
    return (
      <>
      <CurrentTechStack 
      newTechnologyUrl={newTechnologyUrl} 
      userTech={userTech}
      setUserTech={setUserTech}
      assetsJson={assetsJson}
      user={user}
      />
        {
          userTechCount !== 0 && <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{"Current Tech Stack"}</Typography>
        }

        <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center">

          {Object.keys(userTech).map((key) => {
            return (
              <Grid item >
                <ChosenTechCard
                  image={userTech[key].imageUrl}
                  name={userTech[key].name}
                  assetName={userTech[key].asset}
                  description={userTech[key].description}
                  user={user}
                  userTech ={userTech}
                />

              </Grid>
            );
          })}
        </Grid>
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