import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import { UserAuth } from '../../context/AuthContext';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { getAssets } from '../../Functions/Assets'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';


export default function ChooseSecurity() {
    const { user } = UserAuth();
     // eslint-disable-next-line
    const [assetsJson, setAssetsJson] = useState(null)
    const [securityTech, setSecurityTech] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAssets(user)
        .then((assets) => {
          setAssetsJson(assets.security_assets)
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
  
  
    setSecurityTech(true);
 // eslint-disable-next-line
    },[user]);

  // Make sure that assetsJson is not null
  if (securityTech && assetsJson) {
    return (
      <div>
        <DevSecOpsStepper step={1} />
        <Typography m="75px" align="center" sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
        Coming soon, construction in progress.
            </Typography>
        <PageNavigationFAB buttonText='Review Threats' nextPageURL='/review-developer-threats' />
      </div>
    )
  }
  // If the asset JSON hasn't downloaded yet, show a loading spinner.
  return (
    <div>
      <DevSecOpsStepper step={1} />
      <div class="centered">
        <CircularProgress />
      </div>
    </div>
  )
}