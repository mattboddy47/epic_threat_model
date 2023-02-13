import {React} from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';


export default function TechContainerButtons(props) {
  const {removeButtonDisabled, addButtonDisabled, addAssetOnClick, removeAssetOnClick, onClose} = props;

    return(
      <Stack spacing={2} direction="row" justifyContent="flex-end">
      <Button onClick={()=> onClose(false)} color="primary" variant="text">Back</Button>
      <Button disabled={removeButtonDisabled} startIcon={<RemoveIcon />} color="primary" variant="text" onClick={removeAssetOnClick}>Remove From Model</Button>
      <Button disabled={addButtonDisabled} startIcon={<AddIcon />} variant="contained" onClick={addAssetOnClick} >Add To Model</Button>
  </Stack>
    )
}
TechContainerButtons.propTypes = {
  removeButtonDisabled: PropTypes.bool.isRequired,
  addButtonDisabled: PropTypes.bool.isRequired,
  addAssetOnClick: PropTypes.func.isRequired,
  removeAssetOnClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};