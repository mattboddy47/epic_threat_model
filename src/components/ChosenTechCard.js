import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ChosenTechCard(props) {
  const image = props.image;
  const techName = props.name;
  const description = props.description;
  const assetName = props.assetName;
  const removeTechFromDB = props.removeTechFromDB;
  return (
    <Card
      sx={{
        boxShadow: 1,
        borderRadius: 7,
        marginBottom: 5
      }}>
      <CardMedia
        component="img"
        image={image}
        alt={techName}
        sx={{
          boxShadow: 1,
          borderRadius: 7,
          width: 350,
          height: 200,
        }}
      />
      {/* USE https://www.midjourney.com/home/ FOR IMAGES */}
      <CardContent
        sx={{
          width: 350,
          height: 100,
        }}>
        <Typography gutterBottom variant="h5" component="div">
          {assetName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button sx={{
        marginLeft: 2,
        marginBottom: 1,
        marginTop: 1
      }}
        startIcon={<RemoveIcon />}
        variant="text"
        onClick={
            removeTechFromDB
        }
        size='small'
        color='primary'
      >
        {"REMOVE FROM MODEL"}
      </Button>
    </Card>
  )
}








