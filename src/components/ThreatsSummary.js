import NumberCard from './NumberCard';
import Grid from '@mui/material/Grid';

export default function ThreatsSummary(props) {
    const matchedRules = props.matchedRules;
    const matchedCWEs = props.matchedCWEs;
    const recommendationsRef = props.recommendationsRef;
    const programmingLanguageRef= props.programmingLanguageRef;
    const learnMoreRecommendationsClick = () => {
        recommendationsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const learnMoreProgrammingLanguageClick = () => {
        programmingLanguageRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Grid container
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center">
            <Grid item>
                <NumberCard title="Reccomendations count"
                    count={matchedRules.length}
                    subtitle="based on discovered security concerns"
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
    );
}