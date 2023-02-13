import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { getAssets } from '../../Functions/Assets'
import { getTechStack } from '../../Functions/TechStack'
import { DevSecOpsAddTech } from '../../components/DevSecOpsAddTech';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';


export default function ChooseTech() {
  const { user } = UserAuth();
  const [assetsJson, setAssetsJson] = useState(null)
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);

  useEffect(() => {

    getAssets(user)
      .then((assets) => {
        setAssetsJson(assets.tech_stack_assets)
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


    getTechStack(user)
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

    // eslint-disable-next-line 
  }, [user])

  // Make sure that assetsJson is not null
  if (assetsJson && tech) {
    return (
      <div>
        <DevSecOpsStepper step={0} />
        <DevSecOpsAddTech 
        user={user} 
        userTech={tech}
        assetsJson={assetsJson}
        setUserTech={setTech} 
        />
        <PageNavigationFAB buttonText='Select Security Tech' nextPageURL='/choose-security' />
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