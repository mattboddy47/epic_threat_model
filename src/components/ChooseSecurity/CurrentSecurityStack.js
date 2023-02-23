import { React, useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { FullScreenDialog } from "../../components/FullScreenDialog";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import AddTechCard from '../../components/AddTechCard';
import AddSecurity from '../../components/ChooseSecurity/AddSecurity';
import { removeSecTechFromDB } from '../../Functions/SecurityTechStack';
import Grid from '@mui/material/Grid';
import ChosenTechCard from "../../components/ChosenTechCard";
import { TitleWithButton } from "../TitleWithButton";


export default function CurrentSecurityStack(props) {
    const navigate = useNavigate();
    const user = props.user;
    const epicId = props.epicId;
    const securityTech = props.securityTech;
    const secAssetsJson = props.secAssetsJson;
    const setSecurityTech = props.setSecurityTech;
    const [open, setOpen] = useState(false);
    const [newSecurityTechUrl, setnewSecurityTechUrl] = useState()
    const [loading, setLoading] = useState(true)
    const storage = getStorage();
    const securityTechCount = Object.keys(securityTech).length;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        const loadNewTechURL = () => {
            const imageRef = ref(storage, 'images/technology.png');

            // Download the image URL from Firebase
            getDownloadURL(imageRef)
                .then((imageUrl) => {
                    setnewSecurityTechUrl(imageUrl);
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
                ).finally(
                    setLoading(false)
                );
        }

        // if the user hasn't added any tech yet, there will be no images to download, we are therefore done loading
        if (securityTechCount === 0) {
            loadNewTechURL();
        }

        let loadingProgressCount = 0;

        securityTech.forEach(asset => {
            const imageRef = ref(storage, 'images/' + asset.image);



            // Download the image URL from Firebase
            getDownloadURL(imageRef)
                .then((imageUrl) => {
                    asset.imageUrl = imageUrl;
                    loadingProgressCount = loadingProgressCount + 1;
                }).catch(error => {
                    loadingProgressCount = loadingProgressCount + 1;
                    switch (error.code) {
                        case 'storage/quota-exceeded':
                            navigate('/error', { state: { speech: out_of_cloud_hosting_credit } })
                            break;
                        default:
                            navigate('/error')
                            break;

                    }

                }
                ).finally(
                    () => {
                        if (loadingProgressCount === securityTechCount) {
                            loadNewTechURL();
                        }
                    }
                );
        });

        // eslint-disable-next-line
    }, [securityTech]);

    // make sure that all image urls have loaded
    if (!loading) {

        const securityTechCount = Object.keys(securityTech).length;

        return (
            <div>
                <TitleWithButton
                    title={"Current Security Stack"}
                    buttonLabel={"Add Security Tech"}
                    onClick={handleClickOpen}
                />
                <Grid container
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center">
                    {securityTechCount === 0 && <AddTechCard
                        newTechnologyUrl={newSecurityTechUrl}
                        handleClickOpen={handleClickOpen}
                        title={"Add Security Tech"}
                        description={"Your security stack is currently empty, add new technology to secure your tech stack to build a better picture of your threat model."}
                        buttonLabel={"Add Security Tech"}
                    />}

                    {Object.keys(securityTech).map((key) => {
                        return (
                            <Grid item >
                                <ChosenTechCard
                                    image={securityTech[key].imageUrl}
                                    name={securityTech[key].name}
                                    assetName={securityTech[key].asset}
                                    description={securityTech[key].description}
                                    user={user}
                                    allTech={securityTech}
                                    setTech={setSecurityTech}
                                    removeTechFromDB={() => removeSecTechFromDB(user, securityTech[key].asset, securityTech[key].name, securityTech, setSecurityTech, epicId)}
                                />

                            </Grid>
                        );
                    })}

                </Grid>

                <FullScreenDialog
                    title={"Add Security Tech"}
                    handleClose={handleClose}
                    open={open}
                >

                    <AddSecurity
                        secAssetsJson={secAssetsJson}
                        epicId={epicId}
                        user={user}
                        handleCloseAddTech={handleClose}
                        setSecTech={setSecurityTech}
                        secTech={securityTech}
                    />

                </FullScreenDialog>
            </div>
        )
    }
    // If the asset JSON hasn't downloaded yet, show a loading spinner.
    return (
        <div>
            <div class="centered">
                <CircularProgress />
            </div>
        </div>
    )
}