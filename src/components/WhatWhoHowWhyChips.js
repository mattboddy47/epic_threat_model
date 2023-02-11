import { useState, React } from 'react'
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TechContainerButtons from './TechContainerButtons';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { getAssetName } from '../Functions/Assets';

export const WhatWhoHowWhyChips = (props) => {
    const tech = props.tech;
    const onClose = props.onClose;
    const navigate = useNavigate();
    const techCollectionRef = collection(db, "dev_sec_ops_tech");
    const { user } = UserAuth();
    const assetName = getAssetName(tech.name, tech.existingTechCount);


    const [whatChips, setWhatChips] = useState([
        { "name": "Confidentiality", "selected": false },
        { "name": "Integrity", "selected": false },
        { "name": "Availability", "selected": false }]);
    const [whoChips, setWhoChips] = useState([
        { "name": "Public", "selected": false },
        { "name": "Owner", "selected": false },
        { "name": "Group", "selected": false }]);
    const [howChips, setHowChips] = useState([
        { "name": "Read", "selected": false },
        { "name": "Write", "selected": false },
        { "name": "Delete", "selected": false },
        { "name": "Amend", "selected": false }]);
    const [whyChips, setWhyChips] = useState([
        { "name": "Future use", "selected": false },
        { "name": "Critical to operation", "selected": false }]);

    const getSelectedChips = (chips) => {
        const selectedChips = chips.filter(function (singleChip) {
            return singleChip.selected
        })
        return selectedChips.map(function (item) {
            return item['name'];
        });
    }

    const handleWhatChipClick = (key) => {
        if (whatChips[key]) {
            const newChips = chipClick(whatChips, key);
            setWhatChips(newChips);
        }
    }

    const handleWhoChipClick = (key) => {
        if (whoChips[key]) {
            const newChips = chipClick(whoChips, key);
            setWhoChips(newChips);
        }
    }

    const handleHowChipClick = (key) => {
        if (howChips[key]) {
            const newChips = chipClick(howChips, key);
            setHowChips(newChips);
        }
    }

    const handleWhyChipClick = (key) => {
        if (whyChips[key]) {
            const newChips = chipClick(whyChips, key);
            setWhyChips(newChips);
        }
    }

    const chipClick = (chips, key) => {
        const newValue = !chips[key].selected;
        let newChips = [...chips];
        newChips[key].selected = newValue;
        return newChips
    }



    const addAsset =
        async () => {
            // Filter to the selected chips

            const whatArray = getSelectedChips(whatChips);
            const whoArray = getSelectedChips(whoChips);
            const howArray = getSelectedChips(howChips);
            const whyArray = getSelectedChips(whyChips);

            // push the selected assets to firebase
            addDoc(techCollectionRef, {
                name: tech.name,
                owner: user.uid,
                what: whatArray,
                who: whoArray,
                how: howArray,
                why: whyArray,
                description: tech.description,
                asset: assetName,
                image: tech.image,
                storesData: tech.guards_sensitive_data
            }).then(
                response => {
                    console.log(response)
                    onClose()
                }
            ).catch(err => {
                console.log(err)
            })

        }

    const removeAsset = async () => {
        getDocs(query(
            collection(db, "dev_sec_ops_tech"),
            where("owner", "==", user.uid),
            where("name", "==", tech.name)
        )).then(data => {
            const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            try {
                tech.forEach(asset => {
                    const assetDoc = doc(db, "dev_sec_ops_tech", asset.id)
                    deleteDoc(assetDoc).finally(
                        onClose()                    )
                })
            } catch (error) {
                onClose()
                navigate('/error')
            }

        })

    }


    return (

        <>

            <Typography marginBottom={1}>
                <strong> What? </strong> - What is the type of data that this tech holds? Specify if a breach of the confidentiality, integrity or availability of that data would be problematic.
            </Typography>
            <Stack direction="row" spacing={1} marginBottom={1}>
                {Object.keys(whatChips).map((key) => {
                    return (
                        <Chip
                            label={whatChips[key].name}
                            icon={whatChips[key].selected ? <DoneIcon /> : ""}
                            variant={whatChips[key].selected ? "filled" : "outlined"}
                            // disabled={tech.selected}
                            color="secondary"
                            onClick={() => handleWhatChipClick(key)} />
                    );
                })}

            </Stack>
            <Typography marginBottom={1}>
                <strong> Who? </strong>- Who needs access to this data?
            </Typography>
            <Stack direction="row" spacing={1} marginBottom={1}>
                {Object.keys(whoChips).map((key) => {
                    return (
                        <Chip
                            label={whoChips[key].name}
                            icon={whoChips[key].selected ? <DoneIcon /> : ""}
                            variant={whoChips[key].selected ? "filled" : "outlined"}
                            color="secondary"
                            // disabled={tech.selected}
                            onClick={() => handleWhoChipClick(key)} />
                    );
                })}
            </Stack>
            <Typography marginBottom={1}>
                <strong>  How? </strong>- How will they access this data, and what level of access do they need?
            </Typography>
            <Stack direction="row" spacing={1} marginBottom={1}>
                {Object.keys(howChips).map((key) => {
                    return (
                        <Chip
                            label={howChips[key].name}
                            icon={howChips[key].selected ? <DoneIcon /> : ""}
                            variant={howChips[key].selected ? "filled" : "outlined"}
                            color="secondary"
                            // disabled={tech.selected}
                            onClick={() => handleHowChipClick(key)} />
                    );
                })}
            </Stack>
            <Typography marginBottom={1}>
                <strong> Why? </strong>- Why does this data need to be held?
            </Typography>
            <Stack direction="row" spacing={1} marginBottom={1}>
                {Object.keys(whyChips).map((key) => {
                    return (
                        <Chip
                            label={whyChips[key].name}
                            icon={whyChips[key].selected ? <DoneIcon /> : ""}
                            variant={whyChips[key].selected ? "filled" : "outlined"}
                            color="secondary"
                            // disabled={tech.selected}
                            onClick={() => handleWhyChipClick(key)} />
                    );
                })}
            </Stack>


            <TechContainerButtons removeButtonDisabled={true}
                addButtonDisabled={false}
                addAssetOnClick={addAsset}
                onClose={onClose}
                removeAssetOnClick={removeAsset} />

        </>
    )
}