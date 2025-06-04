import { createTheme } from '@mui/material/styles';

const uxColor = '#115F81'; // Your UX blue color

const theme = createTheme({
  palette: {
    primary: {
      main: uxColor,
    },
  },
  typography: {
    // Define all variant styles within the typography object
    h1: {
      fontSize: 'clamp(1.5rem, 2vw + 1rem, 3rem)', //'2.0rem', // 28px //!Do not use for app. This is just an experiment
      fontWeight: 700, // Bold
      lineHeight: 1.2,
      marginBottom: '0.5rem',
    },
    h2: {
      fontSize: '1.75rem', // 24.5px, approximately
      fontWeight: 700, // Bold
      lineHeight: 1.3,
      marginBottom: '0.5rem',
    },
    h3: {
      fontSize: '1.5rem', // 21px
      fontWeight: 500, // Medium
      lineHeight: 1.35,
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1.25rem', // 17.5px
      fontWeight: 500, // Medium
      lineHeight: 1.4,
      marginBottom: '0.4rem',
    },
    h5: {
      fontSize: '1.125rem', // 15.75px, approximately
      fontWeight: 400, // Regular
      lineHeight: 1.45,
      marginBottom: '0.4rem',
    },
    h6: {
      fontSize: '1.0rem', // 14px
      fontWeight: 400, // Regular
      lineHeight: 1.5,
      marginBottom: '0.3rem',
    },
    body1: {
      fontSize: '1.0rem', // Correctly placed within typography, this now refers to a 12px base size, resulting in 12px for body1 if 1rem is used.
    },
    allVariants: {
      color: '#172B4D', // Default text color; you can also use palette values like palette.text.primary
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-size: 16px;
        }
      `,
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            fontSize: '1.2rem',
          },
          '&.MuiInputLabel-shrink': {
            fontSize: '1.2rem',
            fontWeight: '500',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: 'red', // Change to your desired color
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          border: `1px solid #ccc`,
          borderRadius: 4,
          '&:hover': {
            // Only apply hover effects when not disabled
            ':not(.Mui-disabled)': {
              borderColor: uxColor,
              backgroundColor: 'white',
            },
          },
          '&.Mui-focused': {
            borderColor: uxColor,
            backgroundColor: 'white',
            borderBottom: `none`,
          },
          // Ensure disabled inputs do not change on hover
          '&.Mui-disabled': {
            '&:hover': {
              borderColor: '#ccc',
            },
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          // targets the root element of MuiDialogTitle
          color: 'pink',
          fontSize: '1.2rem', // adjust font size
        },
      },
    },
    // Other component style overrides as needed
  },
});

export default theme;
