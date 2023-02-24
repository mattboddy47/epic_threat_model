import React from "react";
import { Outlet } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { UserAuth } from '../context/AuthContext';
import BackgroundLetterAvatar from '../components/BackgroundLetterAvatars';
import Button from '@mui/material/Button';
import '../index.css';
import ghost_logo from '../images/ghost_logo.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'


export default function TopBar() {
  const { user, logOut } = UserAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      toast.error("Something went wrong during sign out")
        }
    setAnchorElUser(null);

  }
  // const navigate = useNavigate();

  return (
    <>
    <AppBar 
    position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 64,
              mt:1,
              mb:1,
              display: { xs: 'none', md: 'flex' }, mr: 1
            }}
            alt="Fred the Epic Threat Modeller"
            src={ghost_logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            color="primary"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Creepster',
              textDecoration: 'none',
            }}
          >
            Epic Threat Model
          </Typography>
          {user?.displayName ? 

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={"Epics"} component={Link} to='/start-threat-modelling' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Epics</Typography>
              </MenuItem>
            </Menu>
          </Box>
: null}
          <Box
            component="img"
            sx={{
              height: 64,
              mt:1,
              mb:1,
              display: { xs: 'flex', md: 'none' }, mr: 1
            }}
            alt="Fred the Epic Threat Modeller"
            src={ghost_logo}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            color="primary"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Creepster',
              textDecoration: 'none',
            }}
          >
            Epic Threat Model
          </Typography>
          {user?.displayName ? 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={"Epics"}
              href="/start-threat-modelling"
              onClick={handleCloseNavMenu}
              sx={{ color: "white" }}
            >
              Epics
            </Button>
          </Box>
: null}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               {user?.displayName ? <BackgroundLetterAvatar userName={user.displayName} /> : null}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key={"Logout"} onClick={handleSignOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
             
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
    <Outlet />
    <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </>
  )

  // return (

  //   <>
  //     <div className="padded-top-sides">
  //     <Stack  
  //     direction="row"
  // justifyContent="space-between"
  // alignItems="center"
  // spacing={2}>
  //       {user ? <Button color="primary" onClick={handleSignOut}>Logout</Button>: <Button color="primary" to='/signin'>Sign in</Button>}
  //       {user?.displayName ? <BackgroundLetterAvatar userName={user.displayName} /> : null}
  //       </Stack>
  //       <Grid container
  // direction="row"
  // spacing={2}
  // justifyContent="center"
  // alignItems="center">
  //   <Grid item>
  //       <Typography  
  //            sx={{
  //             "&:hover": {
  //               cursor: 'pointer',
  //             }
  //           }}
  //       onClick={()=> navigate('/')} 
  //       textAlign={'center'} 
  //       fontFamily={'Creepster'} 
  //       color="primary" 
  //       fontSize={'100px'}>
  //         Epic Threat Model
  //       </Typography>
  //       </Grid>
  //       <Grid item>
  //       <img alt="Fred the friendly ghost says hi" src={ghost_logo} height={100}/>
  //       </Grid>
  //       </Grid>
  //     </div>
  //     <Outlet />
  //     <ToastContainer toastStyle={{ backgroundColor: "black" }} />

  //   </>
  // )
};

