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


const or_condition = "or"
const and_condition = "and"

// This function takes in either a is_condition or an is_not condition and then returns whether that is met.
function check_condition(is_is_not_condition, rule_is_is_not, technology, data_type, is_condition) {
  if (rule_is_is_not === "") {
    console.log(is_condition + " rule blank")
    return true;
  }
  if (is_condition) {
    return check_is_condition(is_is_not_condition, rule_is_is_not, technology, data_type)
  }
  return !check_is_condition(is_is_not_condition, rule_is_is_not, technology, data_type)

}
function check_is_condition(is_is_not_condition, rule_is_is_not, technology, data_type) {
  if (is_is_not_condition === or_condition) {
    return rule_is_is_not.some(element => {
      return technology[data_type].includes(element);
    });

  } else if (is_is_not_condition === and_condition) {

    return rule_is_is_not.every(element => {
      return technology[data_type].includes(element);
    });
  }
}

function check_tech_stack_contains_required_assets(tech_stack_should_not_contain, tech) {
  if (tech_stack_should_not_contain.length === 0) {
    return true;
  }

  return !tech.some(t => tech_stack_should_not_contain.some(check_for_tech => check_for_tech === t.name))

}

function applyRulesToTech(rules, allTech) {
  const result = [];

  allTech.forEach(technology => {
    rules.forEach(rule => {
      // eslint-disable-next-line 
      if (technology[rule.data_type.toLowerCase()] == undefined) {
        return;
      };


      // check whether the is_condition is met, and set this variable accordingly.

      const is_condition_met = check_condition(rule.is_condition, rule.is, technology, rule.data_type.toLowerCase(), true);

      const is_not_condition_met = check_condition(rule.is_not_condition, rule.is_not, technology, rule.data_type.toLowerCase(), false);

      const tech_stack_contains_required_assets = check_tech_stack_contains_required_assets(rule.tech_stack_does_not_contain, allTech)

      if (is_condition_met && is_not_condition_met && tech_stack_contains_required_assets) {
        const new_rule = Object.create(rule);

        new_rule.matched_technology_name = technology.name;
        new_rule.matched_technology_id = technology.id;
        new_rule.matched_technology_description = technology.description;
        new_rule.matched_technology_what = technology.what;
        new_rule.matched_technology_who = technology.who;
        new_rule.matched_technology_how = technology.how;
        new_rule.matched_technology_why = technology.why;
        new_rule.matched_technology_stores_data = technology.storesData;
        result.push(new_rule)
      }


    })
  })
  return result;
}

function applyCWEsToTech(CWEs, tech) {
  const result = [];

  const programming_languages = tech.filter(t => {
    return t.name === "Programming Language"
  })

  if (programming_languages.length === 0) {
    return result;
  }

  CWEs.forEach(CWE => {
    if (CWE["Applicable Platforms"].includes("Language-Independent")) {
      result.push(CWE)
      return;
    }


    programming_languages.forEach(programming_language => {
      if (CWE["Applicable Platforms"].includes(programming_language.asset)) {
        if (result.indexOf(CWE) === -1) {
          result.push(CWE);
        }
      }
    })
  })
  return result;
}


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
        <DevSecOpsStepper step={1} />
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