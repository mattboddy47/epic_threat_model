import * as React from 'react';
import { useState, useEffect } from 'react'
import ThreatModelStepper from "../../components/DevSecOpsStepper";
import { WhatWhoHowWhyChips } from "../../components/WhatWhoHowWhyChips"
import { useLocation } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'
import { LargeInfoCard } from '../../components/LargeInfoCard';
import { toast } from 'react-toastify';
import TechContainerButtons from '../../components/TechContainerButtons';
import { getAssetName } from '../../Functions/Assets'

export default function DevSecOpsAssetContainer() {
// We recieve a single asset from the assets json file stored within tech_data.state 
    const tech_data = useLocation()
    const navigate = useNavigate();
    const techCollectionRef = collection(db, "dev_sec_ops_tech")
    const [imageUrl, setImageUrl] = useState(null);
    const { user } = UserAuth()
    const storage = getStorage();
    const [chips, setChips] = useState(tech_data.state.asset_containers);
    const techName = tech_data.state.name

    useEffect(() => {
        const imageRef = ref(storage, 'images/' + tech_data.state.image);

        getDownloadURL(imageRef)
            .then((imageUrl) => {
                setImageUrl(imageUrl);
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
            );
        // eslint-disable-next-line 
    }, []);


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
                        navigate('/choose-tech-dev-sec-ops')
                    )
                })
            } catch (error) {
                navigate('/error')
            }

        })

    }

    const addAsset =
        async () => {
            if (chips.length === 0) {
                addDoc(techCollectionRef, {
                    name: techName,
                    asset: techName,
                    description: tech_data.state.description,
                    image:  tech_data.state.image,
                    storesData: tech_data.state.guards_sensitive_data,
                    owner: user.uid
                }).then(
                    navigate('/choose-tech-dev-sec-ops')
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
                    image:  tech_data.state.image,
                    asset: asset.name,
                    storesData: tech_data.state.guards_sensitive_data,
                    description: tech_data.state.description,
                    owner: user.uid
                })
            });
            navigate('/choose-tech-dev-sec-ops')

        }

    if (tech_data.state.guards_sensitive_data) {
        const assetName = getAssetName(techName, tech_data.state.existingTechCount);
        return (
            <div>
                <ThreatModelStepper step={0} />
                <LargeInfoCard imageUrl={imageUrl} title={assetName} description={"For the best Threat Model accuracy, please provide as much information from the options below before adding the " +
                    techName.toLowerCase() +
                    " to your model."}>
                    <WhatWhoHowWhyChips tech={tech_data.state} />
                </LargeInfoCard>
            </div>
        )
    }

    return (
        <div>
            <ThreatModelStepper step={0} />
            <LargeInfoCard imageUrl={imageUrl} title={techName} description={"Please add " + techName.toLowerCase() + " to your model if it is a part of your tech stack."}>
                <Stack direction="row" spacing={1} marginBottom={1}>
                    {Object.keys(chips).map((key) => {
                        return (
                            <Chip
                                label={chips[key].name}
                                icon={chips[key].selected ? <DoneIcon /> : ""}
                                disabled={tech_data.state.selected}
                                variant={chips[key].selected ? "filled" : "outlined"}
                                color="secondary"
                                onClick={() => handleChipClick(key)} />
                        );
                    })}

                </Stack>
                <TechContainerButtons removeButtonDisabled={!tech_data.state.selected}
                        addButtonDisabled={tech_data.state.selected}
                        addAssetOnClick= {addAsset}
                        removeAssetOnClick={removeAsset} />
            </LargeInfoCard>
        </div>
    )
}