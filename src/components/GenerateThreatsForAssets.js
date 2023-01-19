


import { React } from 'react'
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import NumberCard from './NumberCard'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import VulnerabilityCharts from './VulnerabilityCharts';

export default function GenerateThreatsForAssets(props) {
    const assetAndValidTechniques = props.assetAndValidTechniques
    const assets = props.assets
    const navigate = useNavigate();

  
    
    if (assetAndValidTechniques){
        
        return(
            <>
            {assetAndValidTechniques.map((asset) => {

                return (
                    <>
                    <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{asset.name}</Typography>
                           <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          marginBottom={4}
          alignItems="center">
            <Grid item>
                    <NumberCard 
                    title="Valid Attack Techniques" 
                    count={Object.keys(asset.validAttackTechniques).length} 
                    subtitle="Affecting this device"
                    buttonText="Learn More"
                    buttonAction= {() => {
                        navigate('/mitre-techniques-data-view', { state: { data: asset.validAttackTechniques } })
                    }
                }
                    />
                         </Grid>
                         </Grid>
<VulnerabilityCharts asset = {asset} />
                    </>
                )
            }
            )}
            </>
        )
    }
return (
    <>
    {assets.map((asset) => {
        return (
            <Typography sx={{ lineHeight: 3 }} textAlign={'center'} gutterBottom variant="h4" component="div">{asset.asset}</Typography>
            )
            }
            )};

<CircularProgress/>
</>
)
   
}