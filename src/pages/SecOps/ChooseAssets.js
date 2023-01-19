import { React, useState, useEffect } from 'react'
import ThreatModelStepper from "../../components/SecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { AssetChooser } from '../../components/AssetChooser';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import TalkingGhost from '../../components/TalkingGhost';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase'


export default function ChooseAssets() {
  const { user } = UserAuth();
  const [assetsJson, setAssetsJson] = useState(null)
  const storage = getStorage();
  const assetsJsonPath = ref(storage, 'assets.json');
  const navigate = useNavigate();
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line 
    if (user.uid != undefined) {
    getDownloadURL(assetsJsonPath)
      .then((url) => {
        axios.get(url)
          .then(response => {
            setAssetsJson(response.data)
          })
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
      );

      const getAssets = async () => {
        try {
          const data = await getDocs(
            query(
              collection(db, "assets"),
              where("owner", "==", user.uid)
            ));

          setAssets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        } catch (err) {
          console.log(err)
          switch (err.message) {
            case "Quota exceeded.":
              navigate('/error', { state: { speech: out_of_cloud_hosting_credit } })
              break;
            default:
              navigate('/error')
              break;
          }
        }

      }
      getAssets();
    }
    // eslint-disable-next-line 
  }, [user])

  // Make sure that assetsJson is not null
  if (assetsJson && assets) {
    return (
      <div>
        <ThreatModelStepper step={0} />
        <Box margin={4}>
          <TalkingGhost speech={"Select any technology that you use from the list below, we will use this information to paint a picture of your threat model."} />
        </Box>

        <AssetChooser assetsJson={assetsJson.general_asset_container_types} userAssets={assets} assetChooserName='General Tools' />
        <AssetChooser assetsJson={assetsJson.developer_asset_container_types} userAssets={assets} assetChooserName='Developer Tools' />

        <PageNavigationFAB buttonText='Select Security Mitigations' nextPageURL='/select-current-security-mitigations' />
      </div>
    )
  }

  // If the asset JSON hasn't downloaded yet, show a loading spinner.
  return (
    <div>
      <ThreatModelStepper step={0} />
      <div class="centered">
        <CircularProgress />
      </div>
    </div>
  )
}