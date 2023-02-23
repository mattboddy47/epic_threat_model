import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DefineSecureTech } from './DefineSecureTech';

export default function SecurityAssetCard(props) {
    const image = props.image;
    const title = props.title;
    const description = props.description;
    const epicId = props.epicId
    const tech = props.tech;
    const allSecTech = props.allSecTech;
    const setSecTech = props.setSecTech;
    const user = props.user;
    const [open, setOpen] = React.useState(false);
    const handleCloseAddTech = props.handleCloseAddTech;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (closeAll) => {
      setOpen(false);
      if (closeAll){
        handleCloseAddTech()
      }
    };
  
    return (
      <>
      <DefineSecureTech
        tech={tech}
        open={open}
        allSecTech={allSecTech}
        setSecTech={setSecTech}
        onClose={handleClose}
        imageUrl={image}
        user={user}
        handleCloseAddTech={handleCloseAddTech}
        epicId = {epicId}
      />
        <Card
        sx={{ 
          boxShadow: 1,
          borderRadius: 7,
          marginBottom: 5
        }}>
        <CardActionArea  
        onClick={
          handleClickOpen
    }
        >
      <CardMedia
        component="img"
        image={image}
        alt={tech.name}
        sx={{
          boxShadow: 1,
          borderRadius: 7,
          width: 350 , 
          height: 200,
        }}
      />
      {/* USE https://www.midjourney.com/home/ FOR IMAGES */}
      <CardContent
      sx={{ 
        width: 350 , 
        height: 130,
      }}>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      </CardActionArea>
      </Card>
      </>
            )
}








  