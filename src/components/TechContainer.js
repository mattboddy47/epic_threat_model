import * as React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { WhatWhoHowWhyChips } from "../components/WhatWhoHowWhyChips"
import Chip from '@mui/material/Chip';
import { toast } from 'react-toastify';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'
import { LargeInfoCard } from '../components/LargeInfoCard';
import { db } from '../firebase'
import { getAssetName } from '../Functions/Assets'
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import TechContainerButtons from './TechContainerButtons';


export function TechContainer(props) {
    const { onClose, assetContainer, open, imageUrl, user } = props;
    const [chips, setChips] = useState(assetContainer.asset_containers);
    const techName = assetContainer.name
    const title = "Define Technology"
    const techCollectionRef = collection(db, "dev_sec_ops_tech")

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

    const removeAsset = async () => {
        getDocs(query(
            collection(db, "dev_sec_ops_tech"),
            where("owner", "==", user.uid),
            where("name", "==", techName)
        )).then(data => {
            const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            try {
                tech.forEach(asset => {
                    const assetDoc = doc(db, "dev_sec_ops_tech", asset.id)
                    deleteDoc(assetDoc).finally(
                        onClose()
                    )
                })
            } catch (error) {
                onClose();
            }

        })

    }

    const addAsset =
        async () => {
            if (chips.length === 0) {
                addDoc(techCollectionRef, {
                    name: techName,
                    asset: techName,
                    description: assetContainer.description,
                    image: assetContainer.image,
                    storesData: assetContainer.guards_sensitive_data,
                    owner: user.uid
                }).then(
                    onClose()
                )
                return;
            }
            // Filter to the selected chips
            const selectedTech = chips.filter(function (tech) {
                return tech.selected
            })
            // if no chips are selected, throw an error and do nothing
            if (selectedTech.length === 0) {
                toast.error("Please select the tech that you use.")
                return
            }
            // push the selected assets to firebase
            selectedTech.forEach(async asset => {
                await addDoc(techCollectionRef, {
                    name: techName,
                    image: assetContainer.image,
                    asset: asset.name,
                    storesData: assetContainer.guards_sensitive_data,
                    description: assetContainer.description,
                    owner: user.uid
                })
            });
            onClose()

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
                    addAssetOnClick={addAsset}
                    onClose={onClose}
                    removeAssetOnClick={removeAsset} />
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
