import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { getAssets } from '../../Functions/Assets'
import { getTechStack } from '../../Functions/TechStack'
import { DevSecOpsAddTech } from '../../components/DevSecOpsAddTech';
import { useNavigate } from 'react-router-dom';
import TalkingGhost from '../../components/TalkingGhost';
import { UserAuth } from '../../context/AuthContext';


export default function DevSecOpsChooseAssets() {
  const { user } = UserAuth();
  const [assetsJson, setAssetsJson] = useState(null)
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);

  useEffect(() => {

    getAssets(user)
      .then((assets) => {
        setAssetsJson(assets.dev_sec_ops_asset_container)
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
        <Box margin={4}>
          <TalkingGhost speech={"Your selected technology is listed below, add to your tech stack to ensure that we have the most complete picture possible."} />
        </Box>

        <DevSecOpsAddTech 
        user={user} 
        userTech={tech}
        assetsJson={assetsJson}
        setUserTech={setTech} 
        />
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