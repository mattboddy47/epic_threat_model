import { React, useEffect, useState } from 'react'
import ThreatModelStepper from "../../components/SecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import { UserAuth } from '../../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import GenerateThreats from '../../components/GenerateThreats';
import axios from 'axios';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';

export default function ReviewThreats() {
  const { user } = UserAuth();

  const [assets, setAssets] = useState([]);
  const [techniques, setTechniques] = useState(null);
  const [malwareCampaigns, setMalwareCampaigns] = useState(null);
  const [userMitigations, setUserMitigations] = useState(null);
  const [userTechniques, setUserTechniques] = useState(null);
  
  const storage = getStorage();
  const techniquesJsonPath = ref(storage, 'mitre_attack_techniques.json');
  const malwareJsonPath = ref(storage, 'mitre_attack_malware.json');
  const navigate = useNavigate();

  useEffect(() => {
    if (user.uid !== undefined) {

      const getAssets = async () => {
        try {
          const data = await getDocs(
            query(
              collection(db, "assets"),
              where("owner", "==", user.uid)
            ));

          setAssets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
      getAssets();

      const getTechniques = async () => {
        getDownloadURL(techniquesJsonPath)
          .then((url) => {
            axios.get(url)
              .then(response => {
                setTechniques(response.data)
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
      }

      getTechniques();

      const getMalwareCampaigns = async () => {
        getDownloadURL(malwareJsonPath)
          .then((url) => {
            axios.get(url)
              .then(response => {
                setMalwareCampaigns(response.data)
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
      }

      getMalwareCampaigns();

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
    }
  }, [user]);

  // When the data from Firebase is loaded, we need to identify the techniques that directly affect the user.

  if (!userTechniques && userMitigations && techniques && assets && malwareCampaigns) {
    const defineTechniquesAffectingUser = () => {
      const techniquesAffectingUser = []

      const userMitigationIDs = []

      userMitigations.forEach(mitigation => {
        if (mitigation.assets.selected){
        userMitigationIDs.push(mitigation.ID)
        }

      })

      techniques.forEach(technique => {
        // check if the technique affects a users asset
          const common_platforms = technique.platforms.filter(function (techniquePlatform) {
            return assets.some(asset => asset.platform_type === techniquePlatform)
          })
         
        // check if the technique has been mitigated by the user
        const techniqueMitigated = technique['mitigation IDs'].filter(function (mitigationID) {
          return userMitigationIDs.some(userMitigationID => userMitigationID === mitigationID)
        })

          if (techniqueMitigated.length == 0 && common_platforms.length != 0) {
            techniquesAffectingUser.push(technique)

          }
      });

      setUserTechniques(techniquesAffectingUser)

    }
    defineTechniquesAffectingUser()

  }

  if (userTechniques) {
    return (
      <div>
        <ThreatModelStepper step={2} />

        <GenerateThreats userTechniques={userTechniques} userMitigations={userMitigations} assets={assets} malwareCampaigns={malwareCampaigns} />

      </div>
    )
  }

  return (
    <div>
      <ThreatModelStepper step={2} />
      <div class="centered">
        <CircularProgress />
      </div>
    </div>
  )
}
