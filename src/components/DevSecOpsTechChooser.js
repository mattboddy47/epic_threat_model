import { React, useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AssetCard from "./AssetCard";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


export const DevSecOpsTechChooser = (props) => {
  const [loading, setLoading] = useState(true)
  const assetsJson = props.assetsJson;
  const userTech = props.userTech;
  const assetsCount = Object.keys(assetsJson).length;
  const assetChooserName = props.assetChooserName;
  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    var loadingProgressCount = 0;

    assetsJson.forEach(asset => {
      const imageRef = ref(storage, 'images/' + asset.image);

      // define if the asset is selected or not 
      const selected = userTech.some(tech => tech.name === asset.name)

      if (selected) {
        asset.selected = selected;
      }
      asset.asset_containers.forEach(asset_container => {
        asset_container.selected = userTech.some(userAsset => userAsset.name === asset_container.name);
      })

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
            if (loadingProgressCount === assetsCount) {
              setLoading(false)
            }
          }
        );

    });
    // setAssetsJson(assetsJson)
  }, []);
  if (!loading) {
    return (
      <>
        <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{assetChooserName}</Typography>

        <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center">

          {Object.keys(assetsJson).map((key) => {
            return (
              <Grid item >
                <AssetCard
                  image={assetsJson[key].imageUrl}
                  title={assetsJson[key].name}
                  description={assetsJson[key].description}
                  asset_container={assetsJson[key]}
                  selected={assetsJson[key].selected}
                  next_page={'/dev-sec-ops-tech'}
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
      <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{assetChooserName}</Typography>
      <div class="centered">

        <CircularProgress />
      </div>
    </>
  )
}