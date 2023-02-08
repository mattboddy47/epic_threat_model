import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import { collection, getDocs, deleteDoc, query, where, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function ChosenTechCard(props) {
    const image = props.image;
    const techName = props.name;
    const description = props.description;
    const user = props.user
    const navigate = useNavigate();

    const removeAssetOnClick = async () => {
      getDocs(query(
          collection(db, "dev_sec_ops_tech"),
          where("owner", "==", user.uid),
          where("name", "==", techName)
      )).then(data => {
          const tech = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          try {
              tech.forEach(asset => {
                  const assetDoc = doc(db, "dev_sec_ops_tech", asset.id)
                  deleteDoc(assetDoc).finally(
                    window.location.reload(false)
                  )
              })
          } catch (error) {
              navigate('/error')
          }

      })

  }

    return (
        <Card 
        sx={{ 
          boxShadow: 1,
          borderRadius: 7,
          marginBottom: 5
        }}>
      <CardMedia
        component="img"
        image={image}
        alt="CMS"
        sx={{
          boxShadow: 1,
          borderRadius: 7,
          width: 350 , 
          height: 200,
        }}
      />
      {/* USE https://www.midjourney.com/home/ FOR IMAGES */}
      <CardContent
      sx={{ 
        width: 350 , 
        height: 150,
      }}>
        <Typography gutterBottom variant="h5" component="div">
            {techName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
        <Button sx={{
        marginLeft: 2,
        marginBottom: 1,
        marginTop: 1
      }} 
      startIcon={<RemoveIcon />}
      variant="text" 
      onClick={removeAssetOnClick}
      size='small'
      color='primary'
      >
      {"REMOVE FROM MODEL"}
      </Button>
      </CardContent>
      </Card>
            )
}








  