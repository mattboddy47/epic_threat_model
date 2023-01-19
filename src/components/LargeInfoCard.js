import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BoxOfStuff } from '../components/BoxOfStuff';

export const LargeInfoCard = ({ children, imageUrl, title, description }) => {
    return (

        <div>
        <BoxOfStuff>
        <Grid container
            spacing={5}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item >
                <img src={imageUrl} height={300} width={300} alt="asset container type image"
                    style={{ borderRadius: 50 }}
                />
            </Grid>
            <Grid item>
                <Grid item>
                    <Typography variant="h3" marginBottom={2} >
                        {title}
                    </Typography>
                    <Typography marginBottom={1}>
                        {description}
                    </Typography>

                    {children}


                    </Grid>
                </Grid>
            </Grid>
            </BoxOfStuff>
        
        </div>
    )
}