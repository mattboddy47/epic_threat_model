


import { React, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import NumberCard from './NumberCard'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';





export default function GenerateOverallThreats(props) {
    const userTechniques = props.userTechniques;
    const malwareCampaigns = props.malwareCampaigns;

    const [validMalwareCampaigns, setValidMalwareCampaigns] = useState()
    const navigate = useNavigate();



    useEffect(() => {
        const validTechniqueIds = []
        userTechniques.forEach(technique => {
            validTechniqueIds.push(technique.ID)
        });

        const newValidMalwareCampaigns = malwareCampaigns.filter(function (malwareCampaign) {
            return malwareCampaign.techniques.every(campaignTechnique => validTechniqueIds.some(validTechniqueId => validTechniqueId === campaignTechnique))
          });

        setValidMalwareCampaigns(newValidMalwareCampaigns)

          }, [])

        

        if(validMalwareCampaigns){
        return(
                    <>
                    <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{"Threats Overview"}</Typography>
                           <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          marginBottom={4}
          alignItems="center">
           
                         <Grid item>
                    <NumberCard 
                    title="Valid Attack Techniques" 
                    count={Object.keys(userTechniques).length} 
                    subtitle="Against all of your devices"
                    buttonText="Learn More"
                    buttonAction= {() => {
                        navigate('/mitre-techniques-data-view', { state: { data: userTechniques } })
                    }
                }
                    />
                         </Grid>
                         <Grid item>
                    <NumberCard 
                    title="Previous Malware Campaigns" 
                    count={Object.keys(validMalwareCampaigns).length} 
                    subtitle="Would likely be successful against you"
                    buttonText="Learn More"
                    buttonAction= {() => {
                        navigate('/mitre-malware-campaigns-data-view', { state: { data: validMalwareCampaigns } })
                    }
                    }
                    />
                         </Grid>
                         
                    </Grid>
                    </>
        )
        }
        return (
            <>
                    <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{"Threats Overview"}</Typography>
                           
<CircularProgress/>
                    </>
        )
   
}