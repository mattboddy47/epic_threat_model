import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export const TitleWithButton = (props) => {
  const title = props.title;
  const buttonLabel = props.buttonLabel;
  const onClick = props.onClick;

    return (
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
            {title}
          </Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => onClick()}
            color="primary"
            variant="contained">
            {buttonLabel}
          </Button>
        </Stack>
        <Divider />

      </Box>
</div>
            )
}