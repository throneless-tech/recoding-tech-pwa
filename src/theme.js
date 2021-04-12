// base imports
import { createMuiTheme } from '@material-ui/core/styles';

// fonts
import "fontsource-noto-serif";

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    color: '#000',
    fontFamily: ['Noto Serif', 'serif'],
    lineHeight: 1.2,
    h1: {
      fontSize: '3.2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.1rem',
      fontStyle: 'italic',
      opacity: 0.6,
    },
    body1: {
      fontSize: '1.1rem',
    },
    body2: {
      fontSize: '1.5rem',
    },
  },
});

export default theme;
