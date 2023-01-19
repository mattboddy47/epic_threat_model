import Grid from '@mui/material/Grid';
import SecurityMitigationsCard from './SecurityMitigationsCard';


export const SecurityMitigationsChooser = ({securityMitigationsJson, userMitigations, setMitigations, user}) => {
    return (
        <>

        <Grid container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center">

          {Object.keys(securityMitigationsJson).map((key) => {
            if (securityMitigationsJson[key].assets.length === 0){
              console.log(securityMitigationsJson[key].name + " has no assets, removing")
              return(
                <></>
              )
            }
            return (
              <Grid item >
                <SecurityMitigationsCard
                  title={securityMitigationsJson[key].name}
                  description={securityMitigationsJson[key].description}
                  currentMitigationKey= {key}
                  securityMitigations = {securityMitigationsJson}
                  setMitigations = {setMitigations}
                  userMitigations = {userMitigations}
                  user = {user}
                />

              </Grid>
            );
          })}
        </Grid>
        </>
    )
}