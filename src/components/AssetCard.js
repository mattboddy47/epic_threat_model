import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'

export default function AssetCard(props) {
    const image = props.image;
    const title = props.title;
    const description = props.description;
    const asset_container = props.asset_container;
    const navigate = useNavigate();
    const next_page = props.next_page;

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
            )
}








  