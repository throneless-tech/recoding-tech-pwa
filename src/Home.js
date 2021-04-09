import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { sanity, imageUrlBuilder } from './sanity';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import keys from './svgs/keys.svg';

const query = `
  *[ _type == 'madLib' ] { title, image, slug }
`;

const useStyles = makeStyles({
  bold: {
    fontWeight: 'bold',
  },
  img: {
    display: "block",
    objectFit: "cover",
    width: "100%",
  },
  imgContainer: {
    maxHeight: 200,
    overflow: "hidden",
  }
});

function Home() {
  const classes = useStyles();

  // in this one line, data is fetched from sanity via the sanity client and
  // stored into application state via react-query!
  const { data: madLibs } = useQuery('madLibsList', () => sanity.fetch(query));

  // if we don't have madLibs yet, then the data must be loading
  if (!madLibs) {
    return <h1>Loading…</h1>;
  }

  return (
    <>
      <Box className={classes.imgContainer}>
        <img src={keys} alt="" aria-hidden="true" className={classes.img} />
      </Box>
      <Box my={6}>
        <Container maxWidth="md">
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item>
              <Typography variant="h1" component="h1">
                recoding tech
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="div" component="h2">
                coming soon!
              </Typography>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography component="div" variant="body2">
              From the rampant spread of disinformation that sows distrust in elections and undermines public health during a pandemic, to the pervasive collection of our personal data and information to facilitate exploitative and manipulative advertising, Big Tech’s code all too often results in real-world harms.
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography component="div" variant="body1" gutterBottom>
              In response, <span className={classes.bold}>recoding tech</span> is working to curate and synthesize knowledge, research, and ideas to help better understand the harms resulting from Big Tech’s code and business models, as well as what types of oversight, regulations, and laws can create better outcomes for our democracies and societies
            </Typography>
          </Box>
          <Box textAlign="center" mt={4}>
            <Typography component="div" variant="body1" gutterBottom>
              <span className={classes.bold}>Sign up here for updates:</span>
            </Typography>
            <TextField id="email" label="type your email..." variant="outlined" />
            <Button variant="contained" color="primary">subscribe</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;
