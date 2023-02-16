import Card from '@mui/material/Card';
import { React } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Color from 'color';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';

export default function TechReview(props) {
    const matchedRules = props.matchedRules;

    if (matchedRules) {
        return (
            <>
                <Box
                    m={4}
                    sx={{
                        flexGrow: 1
                    }}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={2}
                        spacing={2}>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">Recommendations</Typography>
                    </Stack>
                    <Divider />

                </Box>
                <Grid container
                    marginBottom={2}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center">
                    {Object.keys(matchedRules).map((key) => {
                        // eslint-disable-next-line 
                        const hasWhat = matchedRules[key].matched_technology_what != undefined;
                        // eslint-disable-next-line 
                        const hasWho = matchedRules[key].matched_technology_who != undefined;
                        // eslint-disable-next-line 
                        const hasHow = matchedRules[key].matched_technology_how != undefined;
                        // eslint-disable-next-line 
                        const hasWhy = matchedRules[key].matched_technology_why != undefined;

                        return (
                            <Grid item >

                                <Card sx={{
                                    boxShadow: 1,
                                    borderRadius: 7,
                                    padding: 0.25,
                                    width: '90vw'
                                }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Tech
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {matchedRules[key].matched_technology_name}
                                        </Typography>
                                        <Typography marginBottom={2} variant="body2">
                                            {matchedRules[key].matched_technology_description}
                                        </Typography>



                                        <Grid container
                                            spacing={1}>

                                            {hasWhat &&
                                                <Grid item>
                                                    <Typography marginRight={1} variant="body2">What:</Typography>
                                                    {Object.keys(matchedRules[key].matched_technology_what).map((whatKey) => {
                                                        return (
                                                            <Chip
                                                                color={
                                                                    matchedRules[key].data_type.toLowerCase() === "what" ? "primary_transparent_30" : "default"
                                                                }
                                                                label={matchedRules[key].matched_technology_what[whatKey]}
                                                                size="small" />

                                                        )
                                                    })}

                                                </Grid>
                                            }
                                            {hasWho &&
                                                <Grid item>
                                                    <Typography marginRight={1} variant="body2">Who:</Typography>
                                                    {Object.keys(matchedRules[key].matched_technology_who).map((whoKey) => {
                                                        return (
                                                            <Chip
                                                                color={
                                                                    matchedRules[key].data_type.toLowerCase() === "who" ? "primary_transparent_30" : "default"
                                                                }
                                                                label={matchedRules[key].matched_technology_who[whoKey]}
                                                                size="small"
                                                            />

                                                        )
                                                    })}

                                                </Grid>
                                            }

                                            {hasHow &&
                                                <Grid item>
                                                    <Typography marginRight={1} variant="body2">How:</Typography>
                                                    {Object.keys(matchedRules[key].matched_technology_how).map((howKey) => {
                                                        return (
                                                            <Chip
                                                                color={
                                                                    matchedRules[key].data_type.toLowerCase() === "how" ? "primary_transparent_30" : "default"
                                                                }
                                                                label={matchedRules[key].matched_technology_how[howKey]}
                                                                size="small"
                                                            />

                                                        )
                                                    })}

                                                </Grid>
                                            }

                                            {hasWhy &&
                                                <Grid item>
                                                    <Typography marginRight={1} variant="body2">Why:</Typography>
                                                    {Object.keys(matchedRules[key].matched_technology_why).map((whyKey) => {
                                                        return (
                                                            // deepcode ignore ReactMissingArrayKeys: The suggested change by Snyk is to change nothing, Please suggest if 
                                                            <Chip
                                                                color={
                                                                    matchedRules[key].data_type.toLowerCase() === "why" ? "primary_transparent_30" : "default"
                                                                }
                                                                label={matchedRules[key].matched_technology_why[whyKey]}
                                                                size="small" />

                                                        )
                                                    })}

                                                </Grid>
                                            }
                                        </Grid>

                                        <Typography marginTop={2} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Threats
                                        </Typography>

                                        {matchedRules[key].threats.map((threat) => {
                                            return (
                                                <Card sx={{
                                                    boxShadow: 3,
                                                    borderRadius: 2,
                                                    padding: 0.25,
                                                    m: 0.5,
                                                    backgroundColor: Color("#FF5733").alpha(0.05).string(),
                                                }}>
                                                    <Typography padding={1} variant="body2">
                                                        {threat}
                                                    </Typography>
                                                </Card>
                                            )

                                        })}


                                        <Typography marginTop={2} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Recommendation
                                        </Typography>



                                        <Card sx={{
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            padding: 0.25,
                                            backgroundColor: Color("#C6DE41").alpha(0.1).string(),
                                        }}>
                                            <Typography padding={1} variant="body2">
                                                {matchedRules[key].advice}
                                            </Typography>
                                        </Card>

                                    </CardContent>

                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </>
        )
    }

    return (
        <div class="centered">
            <CircularProgress />
        </div>
    )
}