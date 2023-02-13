import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AddTech from './AddTech';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CurrentTechStack(props) {
  const [open, setOpen] = React.useState(false);
  const newTechnologyUrl = props.newTechnologyUrl;
  const userTech= props.userTech;
  const setUserTech=props.setUserTech;
  const user = props.user;
  const assetsJson=props.assetsJson;
  const setAssetsJson=props.setAssetsJson;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center">

        <Grid item >

          <Card
            sx={{
              boxShadow: 1,
              borderRadius: 7,
              marginBottom: 5
            }}>
            <CardActionArea
              onClick={handleClickOpen}
            >
              <CardMedia
                component="img"
                image={newTechnologyUrl}
                alt="Add technology to your stack"
                sx={{
                  boxShadow: 1,
                  borderRadius: 7,
                  width: 350,
                  height: 300,
                }}
              />
              <CardContent
                sx={{
                  width: 350,
                  height: 150,
                }}>
                <Typography gutterBottom variant="h5" component="div">
                  {"Add Tech"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Add technology to your threat model from your planned tech stack"}
                </Typography>
              </CardContent>
              <Button sx={{
                marginLeft: 2,
                marginBottom: 1
              }}
                startIcon={<AddIcon />}
                variant={"contained"}
                size='small'
                color='primary'
              >
                {"Select New Tech"}
              </Button>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>



      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Tech to Stack
            </Typography>
          </Toolbar>
        </AppBar>

        <AddTech 
        user={user}
        userTech={userTech}
        setUserTech={setUserTech}
        assetsJson={assetsJson}
        setAssetsJson={setAssetsJson}
        handleCloseAddTech= {handleClose}
        />
      </Dialog>
    </div>
  );
}