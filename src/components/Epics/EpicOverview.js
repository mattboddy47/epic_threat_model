import { React, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom';
import { getEpic, deleteEpicFromDB } from '../../Functions/Epics'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';


export function EpicOverviewBox(props) {
    const epicId = props.epicId;
    const user = props.user;
    const [epic, setEpic] = useState();
    const navigate = useNavigate();
    const [openDeletePrompt, setOpenDeletePrompt] = useState(false);

    const deleteEpic = (epicId, user) => {
        handleClose();
        deleteEpicFromDB(epicId, user, toast, navigate)
    }

    const handleClickDelete = () => {
      setOpenDeletePrompt(true);

    };
  
    const handleClose = () => {
      setOpenDeletePrompt(false);
    };

    useEffect(() => {
        getEpic(user, epicId)
            .then((allEpics) => {
                setEpic(allEpics[0])
            })
            .catch(
                (error) => {
                    switch (error) {
                        case ('user_error'):
                            break;
                        default:
                            navigate('/error')
                    }
                }
            )
    }, [user])
    if (epic) {
        const creationDate = new Date(epic.creationDate)

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box
                    component="form"
                    alignItems="center"

                    sx={{
                        mt: 2,
                        mb: 2,
                        width: '75vw',
                        //   backgroundColor: 'rgba(66,66,66,0.15)',
                        borderRadius: 2,
                        //   boxShadow: 1,
                        p: 2,
                    }}
                    validate
                    autoComplete="off"
                >
                    <Typography sx={{ marginBottom: '5px' }} variant="h5">
                        {epic.name}
                    </Typography>
                    <Divider />


                    <Typography variant='body2' color={"text.secondary"} marginBottom={1} marginTop={1}>
                        Created {creationDate.getDate()}/{creationDate.getMonth()}/{creationDate.getFullYear()}
                    </Typography>

                    <Grid container
                        direction="row"
                        spacing={0.5}
                        marginBottom={4}
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid item>
                            <Typography variant='body2' color={"text.secondary"}>Security Priorities: </Typography>
                        </Grid>
                        {Object.keys(epic.securityFocus).map((securityFocusKey) => {
                            return (
                                <Grid item>
                                    <Chip
                                        color={"primary_transparent_30"}
                                        label={epic.securityFocus[securityFocusKey]}
                                        size="small" />
                                </Grid>
                            )
                        })}

                    </Grid>

                    <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleClickDelete(epicId, user)}
                        color={"secondary"}
                        variant='text'
                        size='small'
                        >
                        Delete Epic
                    </Button>
                </Box>

                <Dialog
        open={openDeletePrompt}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete this Epic?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Epic "{epic.name}" is about to be deleted, confirm that you are intending to delete this Epic. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => deleteEpic(epicId, user)} autoFocus>
            Delete Epic
          </Button>
        </DialogActions>
      </Dialog>
            </div>
        )
    }

    return (
        <div class="centered">
            <CircularProgress />
        </div>
    )
}