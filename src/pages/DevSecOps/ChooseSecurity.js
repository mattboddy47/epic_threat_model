import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import { UserAuth } from '../../context/AuthContext';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { getAssets } from '../../Functions/Assets'
import { useNavigate } from 'react-router-dom';
import { TitleWithButton } from "../../components/TitleWithButton";
import { FullScreenDialog } from "../../components/FullScreenDialog";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import AddTechCard from '../../components/AddTechCard';
import AddSecurity from '../../components/ChooseSecurity/AddSecurity';
import { getSecTechStack, removeSecTechFromDB } from '../../Functions/SecurityTechStack';
import Grid from '@mui/material/Grid';
import ChosenTechCard from "../../components/ChosenTechCard";
import CurrentSecurityStack from '../../components/ChooseSecurity/CurrentSecurityStack';


export default function ChooseSecurity() {
    const { user } = UserAuth();
    // eslint-disable-next-line
    const [secAssetsJson, setSecAssetsJson] = useState(null)
    const [securityTech, setSecurityTech] = useState(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [newSecurityTechUrl, setnewSecurityTechUrl] = useState()
    const storage = getStorage();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAssets(user)
            .then((assets) => {
                console.log(assets)
                setSecAssetsJson(assets.security_assets)
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



        getSecTechStack(user)
            .then((secTechStack) => {
                setSecurityTech(secTechStack)

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
    }, [user]);

    if (securityTech && secAssetsJson) {
        return (
            <div>
                <DevSecOpsStepper step={1} />
                <CurrentSecurityStack
                    user={user}
                    securityTech={securityTech}
                    secAssetsJson={secAssetsJson}
                    setSecurityTech={setSecurityTech}
                />
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