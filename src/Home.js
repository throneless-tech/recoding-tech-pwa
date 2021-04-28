// base imports
import React from 'react';
import { useQuery } from 'react-query';
import { sanity } from './sanity';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// images
import keys from './svgs/keys.svg';

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: 'bold',
  },
  border: {
    position: 'relative',
    '&:after': {
      backgroundColor: '#F6F000',
      bottom: '-80px',
      content: '""',
      height: 64,
      left: 0,
      position: 'absolute',
      right: 0,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        bottom: 0,
        position: 'fixed',
      },
    }
  },
  img: {
    display: 'block',
    marginLeft: '-70px',
    minWidth: 600,
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
  imgContainer: {
    backgroundColor: '#F6F000',
    maxHeight: 100,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      maxHeight: 150,
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 200,
    },
  },
  link: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '5px 10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Box className={classes.border}>
      <Box className={classes.imgContainer}>
        <img src={keys} alt="" aria-hidden="true" className={classes.img} />
      </Box>
      <Box my={10}>
        <Container maxWidth="md">
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item xs={12} sm={5}>
              <Typography variant="h1" component="h1">
                recoding tech
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h2" component="div">
                coming soon!
              </Typography>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography component="div" variant="body1">
              From the rampant spread of disinformation that sows distrust in elections and undermines public health during a pandemic, to the pervasive collection of our personal data and information to facilitate exploitative and manipulative advertising, Big Tech’s code all too often results in real-world harms.
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography component="div" variant="body2" gutterBottom>
              In response, <span className={classes.bold}>recoding tech</span> is working to curate and synthesize knowledge, research, and ideas to help better understand the harms resulting from Big Tech’s code and business models, as well as what types of oversight, regulations, and laws can create better outcomes for our democracies and societies.
            </Typography>
          </Box>
          <Box textAlign="center" mt={4}>
            <Typography component="div" variant="body1" gutterBottom>
              <Link href='/signup' className={classes.link}>Sign up here for updates</Link>
            </Typography>
          </Box>
          {/*<Box textAlign="center" mt={4}>
            <Typography component="div" variant="body1" gutterBottom>
              <span className={classes.bold}>Sign up here for updates:</span>
            </Typography>
            <TextField id="email" label="type your email..." variant="outlined" />
            <Button variant="contained" color="primary">subscribe</Button>
          </Box>*/}
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
