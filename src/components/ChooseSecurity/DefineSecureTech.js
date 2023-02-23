import * as React from 'react';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { LargeInfoCard } from '../LargeInfoCard';
import { addSecTechToDB, removeAllSecTechFromDB } from '../../Functions/SecurityTechStack'
import TechContainerButtons from '../TechContainerButtons';
import DialogContent from '@mui/material/DialogContent';
import { getTechStack } from '../../Functions/TechStack'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import MultipleSelectChip from '../MultiSelectTechChips';
import Typography from '@mui/material/Typography'

export function DefineSecureTech(props) {
    const { onClose, tech, open, imageUrl, user } = props;
    const techName = tech.name;
    const epicId = props.epicId;
    const title = "Define Technology"
    const allSecTech = props.allSecTech;
    const setSecTech = props.setSecTech;
    const [filteredTechStack, setFilteredTechStack] = useState(null);
    const [protectedTech, setProtectedTech] = useState([]);
    const [settings, setSettings] = useState([]);
    const navigate = useNavigate();
    let settingsTitle = null;
    let settingsChips = null;

    if (tech.settings.length > 0){
    settingsTitle =  <Typography marginBottom={1} >Select any features of the {techName.toLowerCase()} from the list below</Typography> 
    settingsChips = <MultipleSelectChip title= {techName + " features"} allTech={tech.settings} selectedTech={settings} setSelectedTech={setSettings} />
    }
    
    
    useEffect(() => {
        
        getTechStack(user, epicId)
            .then((t) => {
                const filteredTech = t.filter(te => te.storesData)
                const assets = filteredTech.map(function(t) {
                    return t['asset'];
                  });
                setFilteredTechStack(assets)

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
    }, []);

    if (filteredTechStack && tech.protects_sensitive_data_tech) {
        return (
            <Dialog
                onClose={onClose}
                fullWidth={true}
                maxWidth={'lg'}
                scroll={'body'}
                open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>

                    <LargeInfoCard imageUrl={imageUrl} title={techName} description={"Please add " + techName.toLowerCase() + " to your model if it is a part of your tech stack."}>
                    <Typography marginBottom={1} >Select the technology that is protected by {techName.toLowerCase()} from the list below</Typography>
                       <MultipleSelectChip title={"Protected Tech"} allTech={filteredTechStack} selectedTech={protectedTech} setSelectedTech={setProtectedTech} />

                       {settingsTitle}
                       {settingsChips}           
                
            
                        <TechContainerButtons
                            removeButtonDisabled={!tech.selected}
                            addButtonDisabled={tech.selected}
                            addAssetOnClick={
                                () => {
                                    addSecTechToDB(
                                        tech,
                                        protectedTech,
                                        user,
                                        onClose,
                                        allSecTech,
                                        setSecTech,
                                        settings,
                                        epicId
                                    )
                                }
                            }
                            onClose={onClose}
                            removeAssetOnClick={() => {
                                removeAllSecTechFromDB(
                                    user,
                                    techName,
                                    onClose,
                                    allSecTech,
                                    setSecTech,
                                    epicId
                                )
                            }}
                        />
                    </LargeInfoCard>
                </DialogContent>
            </Dialog>
        );
    }

    if (filteredTechStack) {
        return (
            <Dialog
                onClose={onClose}
                fullWidth={true}
                maxWidth={'lg'}
                scroll={'body'}
                open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>

                    <LargeInfoCard imageUrl={imageUrl} title={techName} description={"Please add " + techName.toLowerCase() + " to your model if it is a part of your tech stack."}>
                        <TechContainerButtons
                            removeButtonDisabled={!tech.selected}
                            addButtonDisabled={tech.selected}
                            addAssetOnClick={
                                () => {
                                    addSecTechToDB(
                                        tech,
                                        protectedTech,
                                        user,
                                        onClose,
                                        allSecTech,
                                        setSecTech,
                                        settings,
                                        epicId
                                    )
                                }
                            }
                            onClose={onClose}
                            removeAssetOnClick={() => {
                                removeAllSecTechFromDB(
                                    user,
                                    techName,
                                    onClose,
                                    allSecTech,
                                    setSecTech,
                                    epicId
                                )
                            }}
                        />
                    </LargeInfoCard>
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <div>
            <div class="centered">
                <CircularProgress />
            </div>
        </div>
    )
}

DefineSecureTech.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
