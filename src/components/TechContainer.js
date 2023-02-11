import * as React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { WhatWhoHowWhyChips } from "../components/WhatWhoHowWhyChips"
import Chip from '@mui/material/Chip';
import { toast } from 'react-toastify';
import { LargeInfoCard } from '../components/LargeInfoCard';
import { getAssetName } from '../Functions/Assets'
import { addTechToDB, removeTechFromDB } from '../Functions/TechStack'
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import TechContainerButtons from './TechContainerButtons';


export function TechContainer(props) {
    const { onClose, assetContainer, open, imageUrl, user } = props;
    const [chips, setChips] = useState(assetContainer.asset_containers);
    const techName = assetContainer.name
    const title = "Define Technology"

    const handleClose = () => {
        onClose(assetContainer);
    };

    const handleChipClick = (key) => {
        if (chips[key]) {
            const newValue = !chips[key].selected;
            let newChips = [...chips];
            newChips[key].selected = newValue;

            setChips(newChips);
        }
    }

    if (assetContainer.guards_sensitive_data) {
        const assetName = getAssetName(techName, assetContainer.existingTechCount);
        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{title}</DialogTitle>
                <LargeInfoCard imageUrl={imageUrl} title={assetName} description={"For the best Threat Model accuracy, please provide as much information from the options below before adding the " +
                    techName.toLowerCase() +
                    " to your model."}>
                    <WhatWhoHowWhyChips
                        onClose={onClose}
                        tech={assetContainer} />
                </LargeInfoCard>
            </Dialog>
        )
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <LargeInfoCard imageUrl={imageUrl} title={techName} description={"Please add " + techName.toLowerCase() + " to your model if it is a part of your tech stack."}>
                <Stack direction="row" spacing={1} marginBottom={1}>
                    {Object.keys(chips).map((key) => {
                        return (
                            <Chip
                                label={chips[key].name}
                                icon={chips[key].selected ? <DoneIcon /> : ""}
                                disabled={assetContainer.selected}
                                variant={chips[key].selected ? "filled" : "outlined"}
                                color="secondary"
                                onClick={() => handleChipClick(key)} />
                        );
                    })}

                </Stack>
                <TechContainerButtons removeButtonDisabled={!assetContainer.selected}
                    addButtonDisabled={assetContainer.selected}
                    addAssetOnClick={
                        () => {addTechToDB(
                            chips,
                            techName,
                            assetContainer.description,
                            assetContainer.image,
                            assetContainer.guards_sensitive_data,
                            user,
                            onClose,
                            toast
                            )}
                    }
                    onClose={onClose}
                    removeAssetOnClick={() => {removeTechFromDB(chips, techName, onClose)}} />
            </LargeInfoCard>

        </Dialog>
    );
}

TechContainer.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    assetContainer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
