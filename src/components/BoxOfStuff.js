import Box from '@mui/material/Box';


export const BoxOfStuff = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Box
            component="form"
            alignItems="center"
            sx={{
              width: 1000,
              backgroundColor: 'rgba(66,66,66,0.15)',
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
              }}
              validate
              autoComplete="off"
            >
                    {children}

                </Box>
                
            </div>
            )
}