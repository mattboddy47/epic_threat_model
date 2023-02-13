import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function AddTechCard(props) {
  const newTechnologyUrl = props.newTechnologyUrl;
  const handleClickOpen = props.handleClickOpen;


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
                alt="Clouds surrounding a blob of technology"
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
                  {"Your tech stack is currently empty, add new tech to your tech stack to start building a picture of your threat model."}
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
                {"Add Tech"}
              </Button>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>



    </div>
  );
}