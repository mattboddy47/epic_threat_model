import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField'
import { BoxOfStuff } from '../BoxOfStuff';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { addEpicToDB } from '../../Functions/Epics';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const securityFocusChips = [
    'Confidentiality',
    'Integrity',
    'Availability'
];



export default function CreateEpic(props) {
    const onClose = props.onClose;
    const user = props.user;
    const open = props.open;
    const epics = props.epics;
    const setEpics = props.setEpics;
    const [securityFocus, setSecurityFocus] = React.useState([]);
    const [epicName, setEpicName] = React.useState()

    React.useEffect(() =>{

    },[epics])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSecurityFocus(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                scroll={'body'}
                onClose={onClose}
                open={open}>
                <DialogTitle>New Epic</DialogTitle>
                <BoxOfStuff>
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        {/* get the name of the epic */}
                        <Grid item>
                            <Typography>
                                Give this Epic a name:
                            </Typography>
                            </Grid>
                            <Grid item>
                            <TextField fullWidth
                                id="Epic-Name"
                                type="text"
                                
                                onChange={e => setEpicName(e.target.value)}
                                label="Epic Name"
                                variant="outlined" />
                                </Grid>

                            {/* get the CIA rating of the epic */}
                            <Grid item>
                                <Typography>
                                    Select the most important security factor(s) of this Epic:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ width: 400 }}>
                                    <InputLabel id="epic-security-focus">Epic Security Focus</InputLabel>
                                    <Select
                                        labelId="epic-security-focus"
                                        id="epic-security-focus"
                                        multiple
                                        value={securityFocus}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Epic security focus" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {securityFocusChips.map((CIAChip) => (
                                            <MenuItem
                                                key={CIAChip}
                                                value={CIAChip}
                                            >
                                                {CIAChip}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* TODO Link the epic with any other existing epics  */}
                            
                            {/* create button */}
                            <Grid item>
                                <Button
                                    onClick={() => addEpicToDB(epicName, securityFocus, onClose, user, setEpics, epics, toast)}
                                    color="primary"
                                    variant="contained">
                                    Create
                                </Button>
                            </Grid>

                        </Grid>
                </BoxOfStuff>
            </Dialog>
        </>
    )

}