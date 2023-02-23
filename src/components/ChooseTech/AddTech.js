import { React, useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import Grid from '@mui/material/Grid';
import AssetCard from "./AssetCard";
import CircularProgress from '@mui/material/CircularProgress';
import { defineAssetSelected, countExistingTech } from '../../Functions/Assets'

export default function AddTech(props) {
  const storage = getStorage();
  const navigate = useNavigate();
  const userTech = props.userTech;
  const setUserTech = props.setUserTech;
  const assetsJson = props.assetsJson;
  const [loading, setLoading] = useState(true);
  const user = props.user
  const epicId = props.epicId
  const handleCloseAddTech = props.handleCloseAddTech;


  useEffect(() => {
    var loadingProgressCount = 0;
    const assetsCount = Object.keys(assetsJson).length;

    assetsJson.forEach(asset => {
      const imageRef = ref(storage, 'images/' + asset.image);

      // Count the amount of technology of this asset type already in the threat model
      // This is used to assign a number to any new assets created, i.e. "Database table 2" if table 1 already exists
      countExistingTech(asset, userTech)

      // define if the asset is selected or not 
      defineAssetSelected(asset, userTech)
      

      // asset.asset_containers.forEach(asset_container => {
      //   asset_container.selected = userTech.some(userAsset => userAsset.name === asset_container.name);
      // })

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

    // eslint-disable-next-line 
  }, []);

  if (!loading) {
    return (
      <>
        <Grid container
          direction="row"
          spacing={2}
          paddingTop={2}
          justifyContent="center"
          alignItems="center">

          {Object.keys(assetsJson).map((key) => {
            return (
              <Grid item >
                <AssetCard
                  image={assetsJson[key].imageUrl}
                  title={assetsJson[key].name}
                  description={assetsJson[key].description}
                  tech={assetsJson[key]}
                  setUserTech={setUserTech}
                  allTech={userTech}
                  epicId={epicId}
                  selected={assetsJson[key].selected}
                  user={user}
                  handleCloseAddTech={handleCloseAddTech}
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