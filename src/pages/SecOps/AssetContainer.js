import * as React from 'react';
import { useState, useEffect } from 'react'
import ThreatModelStepper from "../../components/SecOpsStepper";
import { useLocation } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { out_of_cloud_hosting_credit } from '../../Text/ErrorTexts';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'
import { LargeInfoCard } from '../../components/LargeInfoCard';
import { toast } from 'react-toastify';


export default function AssetContainer() {
    const asset_container_data = useLocation()
    const [chips, setChips] = useState(asset_container_data.state.asset_containers);
    const assetContainerName = asset_container_data.state.name
    const assetsCollectionRef = collection(db, "assets")
    const [imageUrl, setImageUrl] = useState(null);
    const { user } = UserAuth()
    const navigate = useNavigate();
    const storage = getStorage();


    useEffect(() => {
        const imageRef = ref(storage, 'images/' + asset_container_data.state.image);

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
        console.log(asset_container_data)
        getDocs(query(
            collection(db, "assets"),
            where("owner", "==", user.uid),
            where("asset_container", "==", assetContainerName)
        )).then(data => {
            const assets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            try {
                assets.forEach(asset => {
                    const assetDoc = doc(db, "assets", asset.id)
                    deleteDoc(assetDoc).finally(
                        navigate('/choose-assets')
                    )
                })
            } catch (error) {
                navigate('/error')
            }

        })

    }

    const addAsset =
        async () => {
            // Filter to the selected chips
            const selectedAssets = chips.filter(function (asset) {
                return asset.selected
            })
            // if no chips are selected, throw an error and do nothing
            if (selectedAssets.length === 0) {
toast.error("Please select the tech that you use.")
                return
            }
            // push the selected assets to firebase
            selectedAssets.forEach(async asset => {
                await addDoc(assetsCollectionRef, {
                    asset_container: assetContainerName,
                    name: asset.name,
                    selected: asset.selected,
                    platform_type: asset.platform_type,
                    has_CVEs: asset.has_CVEs,
                    CVE_filename: asset.CVE_filename,
                    owner: user.uid
                })
            });
            navigate('/choose-assets')
        }

    return (
        <div>
            <ThreatModelStepper step={0} />
            <LargeInfoCard imageUrl={imageUrl} title={assetContainerName} description = {"If you would like a more accurate threat model, select the " + assetContainerName.toLowerCase() +" type below."}>
                <Stack direction="row" spacing={1} marginBottom={1}>
                    {Object.keys(chips).map((key) => {
                        return (
                            <Chip
                                label={chips[key].name}
                                icon={chips[key].selected ? <DoneIcon /> : ""}
                                variant={chips[key].selected ? "filled" : "outlined"}
                                color="secondary"
                                onClick={() => handleChipClick(key)} />
                        );
                    })}

                </Stack>
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Button href={'/choose-assets'} color="primary" variant="text">Back</Button>
                    <Button disabled={!asset_container_data.state.selected} startIcon={<RemoveIcon />} color="primary" variant="text" onClick={removeAsset}>Remove From Model</Button>
                    <Button disabled={asset_container_data.state.selected} startIcon={<AddIcon />} variant="contained" onClick={addAsset} >Add To Model</Button>
                </Stack>
            </LargeInfoCard>
        </div>
    )
}