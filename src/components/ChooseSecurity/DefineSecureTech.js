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

export function DefineSecureTech(props) {
    const { onClose, tech, open, imageUrl, user } = props;
    const techName = tech.name
    const title = "Define Technology"
    const allSecTech = props.allSecTech;
    const setSecTech = props.setSecTech;
    const [techStack, setTechStack] = useState(null);
    const [protectedTech, setProtectedTech] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTechStack(user)
            .then((t) => {
                setTechStack(t)

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

    if (techStack && tech.protects_sensitive_data_tech) {
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
                       <MultipleSelectChip securityTechName={techName} allTech={techStack} selectedTech={protectedTech} setSelectedTech={setProtectedTech} />
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
                                        setSecTech
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
                                    setSecTech
                                )
                            }}
                        />
                    </LargeInfoCard>
                </DialogContent>
            </Dialog>
        );
    }

    if (techStack) {
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
                                        user,
                                        onClose,
                                        allSecTech,
                                        setSecTech
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
                                    setSecTech
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
    assetContainer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
