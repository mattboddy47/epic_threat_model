import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NumberCard(props) {
    const title = props.title;
    const count = props.count;
    const subtitle = props.subtitle;
    const body = props.body;
    const buttonText = props.buttonText;
    const buttonAction = props.buttonAction;

    return (
        <Card sx={{ boxShadow: 7,

              }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h1" component="div">
          {count}
        </Typography>
         <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {subtitle}
        </Typography> 
        <Typography variant="body2">
          {body}
        </Typography> 
      </CardContent>
      <CardActions>
<Button onClick={buttonAction}> {buttonText}</Button>
        </CardActions>
    </Card>
            )
}








  