import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { DevSecOpsTechChooser } from '../../components/DevSecOpsTechChooser';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import { useNavigate } from 'react-router-dom';
import TalkingGhost from '../../components/TalkingGhost';
import { collection, getDocs, query, where, writeBatch, doc } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase'


export default function DevSecOpsChooseAssets() {
  const { user } = UserAuth();
  const [assetsJson, setAssetsJson] = useState(null)
  const storage = getStorage();
  const assetsJsonPath = ref(storage, 'assets.json');
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);

  useEffect(() => {
    if (user.uid != undefined) {
    getDownloadURL(assetsJsonPath)
      .then((url) => {
        axios.get(url)
          .then(response => {
            setAssetsJson(response.data)
          })
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

      }
      );

      const getAssets = async () => {
        try {
          const data = await getDocs(
            query(
              collection(db, "dev_sec_ops_tech"),
              where("owner", "==", user.uid)
            ));

          setTech(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

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
  }, [user])

  // Make sure that assetsJson is not null
  if (assetsJson && tech) {
    return (
      <div>
        <DevSecOpsStepper step={0} />
        <Box margin={4}>
          <TalkingGhost speech={"Select any technology that you use from the list below, we will use this information to paint a picture of your threat model."} />
        </Box>

        <DevSecOpsTechChooser assetsJson={assetsJson.dev_sec_ops_asset_container} userTech={tech} assetChooserName='Technology Stack' />

        <PageNavigationFAB buttonText='Review Threats' nextPageURL='/review-developer-threats' />
      </div>
    )
  }

  // If the asset JSON hasn't downloaded yet, show a loading spinner.
  return (
    <div>
      <DevSecOpsStepper step={0} />
      <div class="centered">
        <CircularProgress />
      </div>
    </div>
  )
}