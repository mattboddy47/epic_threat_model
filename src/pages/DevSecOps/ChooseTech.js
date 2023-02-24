import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { getAssets } from '../../Functions/Assets'
import { getTechStack } from '../../Functions/TechStack'
import { DevSecOpsAddTech } from '../../components/ChooseTech/DevSecOpsAddTech';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { validateEpicId } from '../../Functions/Validations'
import { EpicOverviewBox } from '../../components/Epics/EpicOverview'


export default function ChooseTech() {
  const location = useLocation();
  const { user } = UserAuth();
  const [assetsJson, setAssetsJson] = useState(null)
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);
  const epicId = validateEpicId(location);

  if (!epicId) {
    navigate('/error')
  }


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

    // eslint-disable-next-line 
  }, [user])

  // Make sure that assetsJson is not null
  if (assetsJson && tech) {
    return (
      <div>
        <EpicOverviewBox epicId={epicId} user={user} />
        <DevSecOpsStepper step={0} epicId={epicId} />
        <DevSecOpsAddTech
          user={user}
          userTech={tech}
          epicId={epicId}
          assetsJson={assetsJson}
          setUserTech={setTech}
        />
        <PageNavigationFAB
          buttonText='Select Security Tech'
          click={() => navigate('/choose-security', { state: { id: epicId } })}
        />
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