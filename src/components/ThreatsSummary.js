import NumberCard from './NumberCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function ThreatsSummary(props) {
    const matchedRules = props.matchedRules;
    const matchedCWEs = props.matchedCWEs;
    const recommendationsRef = props.recommendationsRef;
    const programmingLanguageRef = props.programmingLanguageRef;

    const learnMoreRecommendationsClick = () => {
        recommendationsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const learnMoreProgrammingLanguageClick = () => {
        programmingLanguageRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
         <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box
                        m={4}
                        sx={{
                            width: '75vw',
                            // flexGrow: 1
                        }}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            marginBottom={2}
                            spacing={2}>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h7" component="div">
                            Overview
                            </Typography>
                    </Stack>
                    <Divider />

                </Box>
                </div>
            <Grid container
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center">
                <Grid item>
                    <NumberCard title="Recommendations count"
                        count={matchedRules.length}
                        subtitle="Based on discovered security concerns"
                        buttonText="Learn More"
                        buttonAction={learnMoreRecommendationsClick} />
                </Grid>
                <Grid item>
                    <NumberCard title="Potential vulnerabilities"
                        count={matchedCWEs.length}
                        subtitle="Out of the top 25 most dangerous vulnerabilities"
                        body="are valid based on your programming language"
                        buttonText="Learn More"
                        buttonAction={learnMoreProgrammingLanguageClick} />
                </Grid>

            </Grid>
        </>
    );
}