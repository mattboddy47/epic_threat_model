import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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


function getStyles(tech, selectedTech, theme) {
    return {
        fontWeight:
        selectedTech.indexOf(tech) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip(props) {
    const theme = useTheme();
    const tech = props.allTech;
    const selectedTech = props.selectedTech;
    const setSelectedTech = props.setSelectedTech;
    const title = props.title;


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTech(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 3, width: 300 }}>
                <InputLabel id="multiple-chip-label">{title}</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    value={selectedTech}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {Object.keys(tech).map((key) => (
                        <MenuItem
                            key={tech[key]}
                            value={tech[key]}
                            style={getStyles(tech[key], selectedTech, theme)}
                        >
                            {tech[key]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}