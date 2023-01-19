import Fab from '@mui/material/Fab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PageNavigationFAB(props) {
    const nextPageURL = props.nextPageURL;
    const buttonText = props.buttonText;
    const click = props.click;
    if (click){
      return (
        <Fab sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
          onClick= {click}
          variant="extended" color="primary" aria-label="Next">
              <ArrowForwardIcon sx={{ mr: 1 }} />
              {buttonText}
            </Fab>
            )
    } 
    return (
        <Fab sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
          href={nextPageURL}
          variant="extended" color="primary" aria-label="Next">
              <ArrowForwardIcon sx={{ mr: 1 }} />
              {buttonText}
            </Fab>
            )
}