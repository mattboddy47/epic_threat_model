import { React, useEffect, useState } from 'react'
import ThreatModelStepper from "../../components/SecOpsStepper";
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { SecurityMitigationsChooser } from '../../components/SecurityMitigationsChooser';
import { db } from '../../firebase'
import { UserAuth } from '../../context/AuthContext';
import { collection, getDocs, query, where, writeBatch, doc, runTransaction  } from 'firebase/firestore'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { getStorage, ref,getDownloadURL  } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import TalkingGhost from '../../components/TalkingGhost';

export default function CurrentSecurityMitigations() {
  const { user } = UserAuth();
  const [mitigations, setMitigations] = useState(null);
  const [userMitigations, setUserMitigations] = useState(null);
  const [assets, setAssets] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage();
  const mitigationsJsonPath = ref(storage, 'mitre_attack_mitigations.json');

  const modelThreats = () => {
    navigate('/review-threats')
  }

  useEffect(() => {

    if (user.uid != undefined) {

      const getUserMitigations = async () => {
        try {
          const data = await getDocs(
            query(
              collection(db, "user_mitigations"),
              where("owner", "==", user.uid)
            ));

          setUserMitigations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch (err) {
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
      getUserMitigations();

      const getMitreAttackMitigations = async () => {
        getDownloadURL(mitigationsJsonPath)
        .then((url) => {
          axios.get(url)
            .then(response => {
              setMitigations(response.data)
            }) 
          }).catch(error => {
            switch (error.code){
              case 'storage/quota-exceeded' :
                navigate('/error', {state: {speech:out_of_cloud_hosting_credit}})
                break;
              default:
                navigate('/error')
                break;
    
            }
    
          }
          );
      }
      getMitreAttackMitigations();

      const getAssets = async () => {
        try{
        const data = await getDocs(
          query(
            collection(db, "assets"),
            where("owner", "==", user.uid)
          ));

        setAssets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      
    } catch (err) {
      switch (err.message) {
        case "Quota exceeded.":
          navigate('/error', {state: {speech:out_of_cloud_hosting_credit}})
          break;
        default:
          navigate('/error')
          break;
      }
    }
  }
    getAssets();

    }
  }, [user.uid]);


  if (mitigations && assets && userMitigations && !mitigations[0].assets) {
    const setMitigationAssets = () => {
      const newMitigations = []
      mitigations.forEach(mitigation => {
        const newAssets = []
        assets.forEach(asset => {
          // asset.platform_types.forEach(assetPlatform => {
            if (mitigation['affected platforms'].includes(asset.platform_type)) {
              /* vendors contains the element we're looking for */
              let assetCopy = JSON.parse(JSON.stringify(asset))
              
              const userMitigation = userMitigations.find(userMitigation => userMitigation.ID === mitigation.ID)
              var mitigationSelected = false
              if (userMitigation && userMitigation.assets.id === asset.id){
                mitigationSelected = userMitigation.assets.selected
              }
              
              assetCopy.selected = mitigationSelected;
              newAssets.push(assetCopy)
            }
          });
        // });
        mitigation.assets = newAssets;
        newMitigations.push(mitigation)
      });

      setMitigations(newMitigations)

    }
    setMitigationAssets()
  }


  if (mitigations && mitigations[0].assets) {
    return (
      <div>
        <ThreatModelStepper step={1} />
        <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">Security Mitigations</Typography>
        <Box margin={4}>
        <TalkingGhost speech = {"On any of the below security mitigations, select the relevent asset that is protected by that mitigation. " +
        "Please note that the assets you have selected will only display against mitigations that are relevent."}/>
        </Box>
        <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom component="div">
          Mitigations taken from the <Link href="https://attack.mitre.org/mitigations/enterprise/">Mitre ATT&CK framework</Link>.
        </Typography>
        <SecurityMitigationsChooser securityMitigationsJson={mitigations} 
        userMitigations={userMitigations}
          setMitigations={setMitigations}
          user={user} />

        <PageNavigationFAB buttonText='Review Threats' click={modelThreats} />


      </div>
    )
  }
  // If the mitigations aren't fully loaded yet, show the spinner

  return (
    <div>
      <ThreatModelStepper step={1} />
      <div class="centered">
        <CircularProgress />
      </div>
    </div>
  )
}
