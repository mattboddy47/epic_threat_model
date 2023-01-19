import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done';

export default function AssetCard(props) {
    const image = props.image;
    const title = props.title;
    const description = props.description;
    const asset_container = props.asset_container;
    const selected = props.selected;
    const navigate = useNavigate();
    const next_page = props.next_page;
    var buttonText = "NOT SELECTED"
    if (selected){
      buttonText = "SELECTED"
    }

    return (
        <Card 
        sx={{ 
          boxShadow: 1,
          borderRadius: 7,
          marginBottom: 5
        }}>
        <CardActionArea  
        onClick={event => {             
          navigate(next_page,{ state: asset_container})
      }}
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
        height: 150,
      }}>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <Button sx={{
        marginLeft: 2,
        marginBottom: 1
      }} 
      disabled={!selected} 
      startIcon={selected ? <DoneIcon /> : ""}
      variant={selected? "contained" : "outlined"} 
      size='small'
      color='secondary'
      >
      {buttonText}
      </Button>
      </CardActionArea>
      </Card>
            )
}








  