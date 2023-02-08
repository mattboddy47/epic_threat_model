import { React, useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChosenTechCard from "./ChosenTechCard";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


export const DevSecOpsAddTech = (props) => {
  const [loading, setLoading] = useState(true)
  const assetsJson = props.assetsJson;
  const user = props.user;
  const userTech = props.userTech;
  const userTechCount = Object.keys(userTech).length;
  const storage = getStorage();
  const navigate = useNavigate();

  const [newTechnologyUrl, setNewTechnologyUrl] = useState()

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

        <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center">

          <Grid item >

            <Card
              sx={{
                boxShadow: 1,
                borderRadius: 7,
                marginBottom: 5
              }}>
              <CardActionArea
                onClick={() => {
                  navigate('/dev-sec-ops-list-tech')
                }}
              >
                <CardMedia
                  component="img"
                  image={newTechnologyUrl}
                  alt="Add technology to your stack"
                  sx={{
                    boxShadow: 1,
                    borderRadius: 7,
                    width: 350,
                    height: 300,
                  }}
                />
                <CardContent
                  sx={{
                    width: 350,
                    height: 150,
                  }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {"Add Tech"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"Add technology to your threat model from your planned tech stack"}
                  </Typography>
                </CardContent>
                <Button sx={{
                  marginLeft: 2,
                  marginBottom: 1
                }}
                  startIcon={<AddIcon />}
                  variant={"contained"}
                  size='small'
                  color='primary'
                >
                  {"Select New Tech"}
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        
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
                  description={userTech[key].description}
                  user={user}
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