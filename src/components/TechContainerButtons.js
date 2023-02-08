import {React} from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';


export default function TechContainerButtons(props) {
    const removeButtonDisabled = props.removeButtonDisabled;
    const addButtonDisabled = props.addButtonDisabled;
    const addAssetOnClick = props.addAssetOnClick;
    const removeAssetOnClick = props.removeAssetOnClick;


    return(
      <Stack spacing={2} direction="row" justifyContent="flex-end">
      <Button href={'/choose-tech-dev-sec-ops'} color="primary" variant="text">Back</Button>
      <Button disabled={removeButtonDisabled} startIcon={<RemoveIcon />} color="primary" variant="text" onClick={removeAssetOnClick}>Remove From Model</Button>
      <Button disabled={addButtonDisabled} startIcon={<AddIcon />} variant="contained" onClick={addAssetOnClick} >Add To Model</Button>
  </Stack>
    )
}