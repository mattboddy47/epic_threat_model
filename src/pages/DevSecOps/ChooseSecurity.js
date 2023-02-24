import { React, useState, useEffect } from 'react'
import DevSecOpsStepper from "../../components/DevSecOpsStepper";
import CircularProgress from '@mui/material/CircularProgress';
import { UserAuth } from '../../context/AuthContext';
import PageNavigationFAB from '../../components/PageNavigationFAB'
import { getAssets } from '../../Functions/Assets'
import { useNavigate } from 'react-router-dom';
import { getSecTechStack } from '../../Functions/SecurityTechStack';
import CurrentSecurityStack from '../../components/ChooseSecurity/CurrentSecurityStack';
import { useLocation } from 'react-router-dom';
import { validateEpicId } from '../../Functions/Validations'
import { EpicOverviewBox } from '../../components/Epics/EpicOverview';


export default function ChooseSecurity() {
    const { user } = UserAuth();
    // eslint-disable-next-line
    const [secAssetsJson, setSecAssetsJson] = useState(null)
    const [securityTech, setSecurityTech] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const epicId = validateEpicId(location);

    if (!epicId) {
        navigate('/error')
    }

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



        getSecTechStack(user, epicId)
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
                <EpicOverviewBox epicId={epicId} user={user} />

                <DevSecOpsStepper step={1} epicId={epicId} />
                <CurrentSecurityStack
                    user={user}
                    securityTech={securityTech}
                    secAssetsJson={secAssetsJson}
                    setSecurityTech={setSecurityTech}
                    epicId={epicId}
                />
                <PageNavigationFAB buttonText='Review Threats'
                    click={() => navigate('/review-developer-threats', { state: { id: epicId } })}
                />
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