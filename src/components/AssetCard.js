import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TechContainer } from './TechContainer';

export default function AssetCard(props) {
    const image = props.image;
    const title = props.title;
    const description = props.description;
    const assetContainer = props.assetContainer;
    const user = props.user;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };
  
    return (
      <>
      <TechContainer
        assetContainer={assetContainer}
        open={open}
        onClose={handleClose}
        imageUrl={image}
        user={user}
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
      //     event => {             
      //     navigate(next_page,{ state: asset_container})
      // }
    }
        >
      <CardMedia
        component="img"
        image={image}
        alt="CMS"
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








  