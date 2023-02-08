import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import TalkingGhost from '../../components/TalkingGhost';
import Box from '@mui/material/Box';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import Grid from '@mui/material/Grid';
import AssetCard from "../../components/AssetCard";
import CircularProgress from '@mui/material/CircularProgress';
import { getAssets } from '../../Functions/Assets'
import { getTechStack } from '../../Functions/TechStack'
import { UserAuth } from '../../context/AuthContext';


export default function DevSecOpsListTech() {
  const { user } = UserAuth();
  const storage = getStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [userTech, setUserTech] = useState(null);
  const [assetsJson, setAssetsJson] = useState(null)

  
  useEffect(() => {

    getAssets(user)
    .then((assets) => {
      setAssetsJson(assets.dev_sec_ops_asset_container)
    })
    .catch (
      (error) => {
        switch(error){
          case ('user_error'):
            break;
          default:
            navigate('/error')
        }
      }
    )


    getTechStack(user)
    .then((techStack) => {
      setUserTech(techStack)

    }) 
    .catch (
      (error) => {
        switch(error){
          case ('user_error'):
            break;
          default:
            navigate('/error')
        }      
      }
    )

      // eslint-disable-next-line 
  }, [user]);

  if (assetsJson && userTech){
    var loadingProgressCount = 0;
    const assetsCount = Object.keys(assetsJson).length;

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
  }

  if (!loading) {
    return (
      <>
      <DevSecOpsStepper step={0} />
      <Box margin={4}>
          <TalkingGhost speech={"Select any technology that you use from the list below, we will use this information to paint a picture of your threat model."} />
        </Box>

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
      <div class="centered">

        <CircularProgress />
      </div>
    </>
  )
}