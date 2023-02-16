import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button'
import { React } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

export default function ProgrammingLanguageReview(props) {
    const matchedCWEs = props.matchedCWEs; 
    const hasCWEs = matchedCWEs.length > 0;
    
    if (matchedCWEs) {
        return (
            <>
               {hasCWEs &&
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
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">Potential Vulnerabilities</Typography>
                    </Stack>
                    <Divider />

                </Box>
                <Typography variant="body2" color="text.secondary" margin={2}>
                    The following vulnerabilities are applicable to your chosen programming language. These have been extracted from the<Link href='https://cwe.mitre.org/top25/archive/2022/2022_cwe_top25.html#cwe_top_25'> top 25 most dangerous vulnerabilities for 2022</Link>. learn more about these vulnerabilties and how to ensure that you don't introduce them into the code that you are writing. 
                </Typography>
                <Grid container
                marginBottom={2}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center">
                    {Object.keys(matchedCWEs).map((key) => {
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
                                        {"CWE-" + matchedCWEs[key]["CWE-ID"]}
                                        </Typography>
                                        <Typography variant="h5" component="div" marginBottom={2}>
                                            {matchedCWEs[key].Name}
                                        </Typography>
                                        <Typography color="text.secondary" marginBottom={2} variant="body2">
                                            {matchedCWEs[key].Description}
                                        </Typography>



                                        <Grid container
                                            spacing={1}>

                                                <Grid item>
                                                    <Typography marginBottom={0.3} marginRight={1} variant="body2">Programming Languages Affected:</Typography>
                                                    {Object.keys(matchedCWEs[key]["Applicable Platforms"]).map((languageKey) => {
                                                        return (
                                                            <Chip label={matchedCWEs[key]["Applicable Platforms"][languageKey]} size="small" />

                                                        )
                                                    })}

                                                </Grid>
                                            
                                        </Grid>

                                    </CardContent>
                                    <CardActions>
<Button href={'https://cwe.mitre.org/data/definitions/'+ matchedCWEs[key]["CWE-ID"] + '.html'}>Learn More</Button>
        </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
                </>}
            </>
        )
    }

    return (
        <div class="centered">
            <CircularProgress />
        </div>
    )
}