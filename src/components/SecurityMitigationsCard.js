import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import DoneIcon from '@mui/icons-material/Done';
import { React,  useState } from 'react'
import { db } from '../firebase'
import {collection, getDocs, addDoc, query, where, updateDoc, doc  } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


export default function SecurityMitigationsCard({title, description, securityMitigations, setMitigations, currentMitigationKey, user}) {
  const mitigationsCollectionRef = collection(db, "user_mitigations")
  const [updatePage, setUpdatePage] = useState(true)
  const navigate = useNavigate();

  const handleChipClick = (key) => {
   
    if (securityMitigations[currentMitigationKey].assets[key]){
      const newSelectedValue = !securityMitigations[currentMitigationKey].assets[key].selected;
      
      let newMitigations = securityMitigations;
      newMitigations[currentMitigationKey].assets[key].selected = newSelectedValue;
      setMitigations(newMitigations);
      setUpdatePage(!updatePage)
      crudMitigation(newMitigations[currentMitigationKey], key)
    }

  }

  const crudMitigation = function (mitigation, mitigationAssetKey) {
    const toUpload = {
      ID: mitigation.ID,
      'affected platforms': mitigation['affected platforms'],
      assets: mitigation.assets[mitigationAssetKey],
      description: mitigation.description,
      name: mitigation.name,
      owner: user.uid,
      url: mitigation.url,
    };

    try {
      getDocs(
        query(
          collection(db, "user_mitigations"),
          where("owner", "==", user.uid), 
          where("ID", '==', mitigation.ID)
        ))
       .then(
        data => {
          const mitigations = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

          if (mitigations.length > 0) {
            // Mitigation Exists - update or delete
            const userDoc = doc(db, "user_mitigations", mitigations[0].id)
            updateDoc(userDoc, toUpload)
            .then(console.log("SUCCESS"))
          } else {
            // Mitigation does not yet exist - create
            console.log("CREATE")
            addDoc(mitigationsCollectionRef, toUpload)
            .then(console.log("SUCCESS"));
          }
        }
      ).catch(
        (error) => {
          console.log(error)
          navigate('/error')

        }

      );

      
    } catch (e) {
      console.error(e);
    }
  }

  // const deleteMitigation = async(id) => {
  //   const userDoc = doc(db, "users", id)
  //   await deleteDoc(userDoc)
  // }
  
  // const updateMitigation = async(mitigation) => {
    
  //   const userDoc = doc(db, "user_mitigations", id)
  //   const newFields = {age: age + 1}
  //   await updateDoc(userDoc, newFields)
  // }

  return (
    <Card
      sx={{
        width: 350,
        boxShadow: 1,
        borderRadius: 7,
        marginBottom: 5
      }}>
      <CardContent
        sx={{
          width: 350,
        }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{
        marginBottom: 1
      }}>
        <Grid container direction="row" spacing={1} marginBottom={1}>
          {Object.keys(securityMitigations[currentMitigationKey].assets).map((key) => {

            return (
              <Grid item>
                <Chip
                  label={securityMitigations[currentMitigationKey].assets[key].name}
                  icon={securityMitigations[currentMitigationKey].assets[key].selected ? <DoneIcon /> : ""}
                  variant={securityMitigations[currentMitigationKey].assets[key].selected ? "filled" : "outlined"}
                  color="secondary"
                  onClick={() => handleChipClick(key)} />
              </Grid>
            );
          })}

        </Grid>
      </CardActions>
    </Card>
  )
        
}
