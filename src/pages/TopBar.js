import { useNavigate, Outlet } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserAuth } from '../context/AuthContext';
import BackgroundLetterAvatar from '../components/BackgroundLetterAvatars';
import Button from '@mui/material/Button';
import '../index.css';
import ghost_logo from '../images/ghost_logo.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopBar = () => {
  const { user, logOut } = UserAuth()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }
  const navigate = useNavigate();


  return (

    <>
      <div className="padded-top-sides">
      <Stack  
      direction="row"
  justifyContent="space-between"
  alignItems="center"
  spacing={2}>
        {user ? <Button color="primary" onClick={handleSignOut}>Logout</Button>: <Button color="primary" to='/signin'>Sign in</Button>}
        {user?.displayName ? <BackgroundLetterAvatar userName={user.displayName} /> : null}
        </Stack>
        <Grid container
  direction="row"
  spacing={2}
  justifyContent="center"
  alignItems="center">
    <Grid item>
        <Typography  
             sx={{
              "&:hover": {
                cursor: 'pointer',
              }
            }}
        onClick={()=> navigate('/')} 
        textAlign={'center'} 
        fontFamily={'Creepster'} 
        color="primary" 
        fontSize={'100px'}>
          Simple Threat Model
        </Typography>
        </Grid>
        <Grid item>
        <img src={ghost_logo} height={100}/>
        </Grid>
        </Grid>
      </div>
      <Outlet />
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />

    </>
  )
};

export default TopBar;