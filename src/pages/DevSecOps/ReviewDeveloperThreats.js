import { React, useRef, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import TechReview from '../../components/TechReview';
import ProgrammingLanguageReview from '../../components/ProgrammingLanguageReview'
import ThreatsSummary from "../../components/ThreatsSummary";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { applyCWEsToTech } from "../../Functions/CWEAssessment";
import { applyRulesToTech } from "../../Functions/Rules";
import { getTechStack } from '../../Functions/TechStack';
import { getSecTechStack } from '../../Functions/SecurityTechStack';
import {useLocation} from 'react-router-dom';
import { validateEpicId } from '../../Functions/Validations'
import { EpicOverviewBox } from '../../components/Epics/EpicOverview';

export default function ReviewThreats() {
  const [tech, setTech] = useState();
  const [securityStack, setSecurityStack] = useState();
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [rules, setRules] = useState();
  const [CWEs, setCWEs] = useState();
  const [matchedCWEs, setMatchedCWEs] = useState();
  const [matchedRules, setMatchedRules] = useState();
  const storage = getStorage();
  const rulesJsonPath = ref(storage, 'dev_sec_ops_rules.json');
  const cweJsonPath = ref(storage, 'CWEs.json');
  const programmingLanguageRef = useRef(null);
  const recommendationsRef = useRef(null);
  const location = useLocation();
  const epicId = validateEpicId(location);

  if (!epicId){
    navigate('/error')
  }

  useEffect(() => {
    // eslint-disable-next-line 
    if (user.uid == undefined) {
      return;
    }

    getTechStack(user, epicId)
    .then((techStack) => {
      setTech(techStack)

    })
    .catch(
      (error) => {
        switch (error) {
          case ('user_error'):
            break;
          default:
            navigate('/error')
        }
      }
    )

    getSecTechStack(user, epicId)
    .then((secTechStack) => {
      setSecurityStack(secTechStack)

    })
    .catch(
      (error) => {
        switch (error) {
          case ('user_error'):
            break;
          default:
            navigate('/error')
        }
      }
    )

    getDownloadURL(rulesJsonPath)
      .then((url) => {
        axios.get(url)
          .then(response => {
            setRules(response.data)


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


    getDownloadURL(cweJsonPath)
      .then((url) => {
        axios.get(url)
          .then(response => {
            setCWEs(response.data)


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
      // eslint-disable-next-line 
  }, [user])


  if (tech && rules && !matchedRules) {
    const rulesThatMatch = applyRulesToTech(rules, tech, securityStack)
    setMatchedRules(rulesThatMatch);
  }

  if (tech && CWEs && !matchedCWEs) {
    const cwesThatMatch = applyCWEsToTech(CWEs, tech)
    setMatchedCWEs(cwesThatMatch);
  }


  if (matchedRules && matchedCWEs) {
    return (
      <div>
                        <EpicOverviewBox epicId={epicId} user={user} />

        <DevSecOpsStepper step={2} epicId={epicId} />
        <ThreatsSummary
          matchedRules={matchedRules}
          matchedCWEs={matchedCWEs}
          recommendationsRef={recommendationsRef}
          programmingLanguageRef={programmingLanguageRef}
          />

        <TechReview 
        matchedRules={matchedRules} 
        recommendationsRef={recommendationsRef}
        epicId={epicId}
        user={user}
         />
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