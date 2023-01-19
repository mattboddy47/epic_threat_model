import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'dark',
        type: 'dark',
        primary: {
            main: '#C6DE41',
            
        },
        primary_transparent_30: {
            main: '#C6DE4130',
            contrastText:'#fff'
        },
        secondary: {
            main: '#2D6E7E',
            dark: '#324e54'
        },
    },
    spacing: 10,
    shape: {
        borderRadius: 4,
    },
});


export const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}