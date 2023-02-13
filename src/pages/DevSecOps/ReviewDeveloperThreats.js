import { React, useRef, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import { UserAuth } from '../../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import TechReview from '../../components/TechReview';
import ProgrammingLanguageReview from '../../components/ProgrammingLanguageReview'
import ThreatsSummary from "../../components/ThreatsSummary";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { applyCWEsToTech } from "../../Functions/CWEAssessment";
import { applyRulesToTech } from "../../Functions/Rules";


export default function ReviewThreats() {
  const [tech, setTech] = useState()
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [rules, setRules] = useState()
  const [CWEs, setCWEs] = useState()
  const [matchedCWEs, setMatchedCWEs] = useState()
  const [matchedRules, setMatchedRules] = useState()
  const storage = getStorage();
  const rulesJsonPath = ref(storage, 'dev_sec_ops_rules.json');
  const cweJsonPath = ref(storage, 'CWEs.json');
  const programmingLanguageRef = useRef(null);
  const recommendationsRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line 
    if (user.uid == undefined) {
      return;
    }

    const getTech = async () => {
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
    getTech();

    getDownloadURL(rulesJsonPath)
      .then((url) => {
        axios.get(url)
          .then(response => {
            setRules(response.data)


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


    getDownloadURL(cweJsonPath)
      .then((url) => {
        axios.get(url)
          .then(response => {
            setCWEs(response.data)


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
      // eslint-disable-next-line 
  }, [user])


  if (tech && rules && !matchedRules) {
    const rulesThatMatch = applyRulesToTech(rules, tech)
    setMatchedRules(rulesThatMatch);
  }

  if (tech && CWEs && !matchedCWEs) {
    const cwesThatMatch = applyCWEsToTech(CWEs, tech)
    setMatchedCWEs(cwesThatMatch);
  }


  if (matchedRules && matchedCWEs) {
    return (
      <div>
        <DevSecOpsStepper step={2} />
        <ThreatsSummary
          matchedRules={matchedRules}
          matchedCWEs={matchedCWEs}
          recommendationsRef={recommendationsRef}
          programmingLanguageRef={programmingLanguageRef} />

        <TechReview matchedRules={matchedRules} recommendationsRef={recommendationsRef} />
        <ProgrammingLanguageReview matchedCWEs={matchedCWEs} programmingLanguageRef={programmingLanguageRef} />
      </div>
    )
  }
  return (
    <div>
      <DevSecOpsStepper step={1} />
      <div class="centered">
        <CircularProgress />
      </div>
    </div>
  )
}