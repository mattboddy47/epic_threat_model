import { useState, React } from 'react'
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext';

export const WhatWhoHowWhyChips = (props) => {
    const tech = props.tech;
    const navigate = useNavigate();
    const techCollectionRef = collection(db, "dev_sec_ops_tech")
    const { user } = UserAuth()

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
            const selectedWhatChips = whatChips.filter(function (whatChip) {
                return whatChip.selected
            })
            const whatArray = selectedWhatChips.map(function(item) {
                return item['name'];
              });
            const selectedWhoChips = whoChips.filter(function (whoChip) {
                return whoChip.selected
            })
            const whoArray = selectedWhoChips.map(function(item) {
                return item['name'];
              });
            const selectedHowChips = howChips.filter(function (howChip) {
                return howChip.selected
            })
            const howArray = selectedHowChips.map(function(item) {
                return item['name'];
              });
            const selectedWhyChips = whyChips.filter(function (whyChip) {
                return whyChip.selected
            })
            const whyArray = selectedWhyChips.map(function(item) {
                return item['name'];
              });
            // if no chips are selected, throw an error and do nothing
            // if (selectedWhatChips.length == 0) {
            //     setOpenSnackbar(true);
            //     return
            // }
// push the selected assets to firebase
            await addDoc(techCollectionRef, {
                name: tech.name,
                owner: user.uid,
                what: whatArray,
                who: whoArray,
                how: howArray,
                why: whyArray,
                description: tech.description,
                storesData: tech.guards_sensitive_data
            })
            navigate('/choose-tech-dev-sec-ops')

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
                        navigate('/choose-tech-dev-sec-ops')
                    )
                })
            } catch (error) {
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
                            disabled={tech.selected}
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
                            disabled={tech.selected}
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
                            disabled={tech.selected}
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
                            disabled={tech.selected}
                            onClick={() => handleWhyChipClick(key)} />
                    );
                })}
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <Button href={'/choose-tech-dev-sec-ops'} color="primary" variant="text">Back</Button>
                        <Button disabled={!tech.selected} startIcon={<RemoveIcon />} color="primary" variant="text" onClick={removeAsset}>Remove From Model</Button>
                        <Button disabled={tech.selected} startIcon={<AddIcon />} variant="contained" onClick={addAsset} >Add To Model</Button>
                    </Stack>

        </>
    )
}