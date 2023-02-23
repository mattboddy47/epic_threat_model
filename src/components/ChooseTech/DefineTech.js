import * as React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { WhatWhoHowWhyChips } from "./WhatWhoHowWhyChips"
import Chip from '@mui/material/Chip';
import { toast } from 'react-toastify';
import { LargeInfoCard } from '../LargeInfoCard';
import { getAssetName } from '../../Functions/Assets'
import { addTechToDB, removeAllTechFromDB } from '../../Functions/TechStack'
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import TechContainerButtons from '../TechContainerButtons';
import DialogContent from '@mui/material/DialogContent';


export function DefineTech(props) {
    const { onClose, tech, open, imageUrl, user, epicId } = props;
    const [chips, setChips] = useState(tech.asset_containers);
    const techName = tech.name
    const title = "Define Technology"
    const userTech = props.userTech;
    const setUserTech = props.setUserTech;

    const handleChipClick = (key) => {
        if (chips[key]) {
            const newValue = !chips[key].selected;
            let newChips = [...chips];
            newChips[key].selected = newValue;

            setChips(newChips);
        }
    }

    if (tech.holds_sensitive_data) {
        const assetName = getAssetName(techName, tech.existingTechCount);
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                scroll={'body'}
                onClose={onClose}
                open={open}>
                <DialogTitle>{title}</DialogTitle>
                <LargeInfoCard imageUrl={imageUrl} title={assetName} description={"For the best Threat Model accuracy, please provide as much information from the options below before adding the " +
                    techName.toLowerCase() +
                    " to your model."}>
                    <WhatWhoHowWhyChips
                        onClose={onClose}
                        tech={tech}
                        allTech={userTech}
                        epicId = {epicId}
                        setTech={setUserTech} />
                </LargeInfoCard>
            </Dialog>
        )
    }

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
                    <Stack direction="row" spacing={1} marginBottom={1}>
                        {Object.keys(chips).map((key) => {
                            return (
                                <Chip
                                    label={chips[key].name}
                                    icon={chips[key].selected ? <DoneIcon /> : ""}
                                    disabled={tech.selected}
                                    variant={chips[key].selected ? "filled" : "outlined"}
                                    color="secondary"
                                    onClick={() => handleChipClick(key)} />
                            );
                        })}

                    </Stack>
                    <TechContainerButtons 
                    removeButtonDisabled={!tech.selected}
                        addButtonDisabled={tech.selected}
                        addAssetOnClick={
                            () => {
                                addTechToDB(
                                    chips,
                                    tech,
                                    user,
                                    onClose,
                                    toast,
                                    userTech,
                                    setUserTech,
                                    epicId
                                )
                            }
                        }
                        onClose={onClose}
                        removeAssetOnClick={() => { removeAllTechFromDB(user, techName, onClose, userTech, setUserTech, epicId) }} />
                </LargeInfoCard>
            </DialogContent>
        </Dialog>
    );
}

DefineTech.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    assetContainer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
