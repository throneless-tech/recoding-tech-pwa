import React from 'react';
import sanityClient from "./client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// images
import keys from './svgs/keys.svg';

const useStyles = makeStyles(theme => ({
  border: {
    position: 'relative',
    '&:after': {
      backgroundColor: '#F6F000',
      bottom: '-80px',
      content: '""',
      height: 36,
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
  help: {
    color: theme.palette.error.main,
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
  input: {
    padding: 5,
    width: '100%',
  }
}));

function Signup() {
  const classes = useStyles();

  // validation for the form fields
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    background: Yup.string().required(),
    location: Yup.string().required(),
    policy: Yup.string().required(),
    uses: Yup.string().required(),
  });

  // start off fields as blank
  const initialValues = {
    _type: "subscriber",
    email: "",
    background: "",
    location: "",
    policy: "",
    uses: "",
  };

  // send data to Sanity CMS via API
  const onSubmit = (values) => {
    console.log(values);
    const request = { ...values };
    sanityClient.create(request).then(() => {
      alert(`Your response has been recorded.`);
    });
  };

  const renderError = (message) => <p className={classes.help}>{message}</p>;

  return (
    <Box className={classes.border}>
      <Box className={classes.imgContainer}>
        <img src={keys} alt="" aria-hidden="true" className={classes.img} />
      </Box>
      <Box mt={2} mb={6}>
        <Container>
          <Typography component="h1" variant="h1">Sign up</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            <Form>
              <Box my={4}>
                <Box mb={2}>
                  <label className={classes.label} htmlFor="email">
                    Email address
                  </label>
                  <div>
                    <Field
                      name="email"
                      type="text"
                      placeholder="me@example.com"
                      className={classes.input}
                    />
                    <ErrorMessage name="email" render={renderError} />
                  </div>
                </Box>
                <Box mb={2}>
                  <label className={classes.label} htmlFor="background">
                    Background or field
                  </label>
                  <div>
                    <Field
                      name="background"
                      type="text"
                      className={classes.input}
                    />
                    <ErrorMessage name="background" render={renderError} />
                  </div>
                </Box>
                <Box mb={2}>
                  <label className={classes.label} htmlFor="location">
                    Countries or geographies of interest
                  </label>
                  <div>
                    <Field
                      name="location"
                      type="text"
                      className={classes.input}
                    />
                    <ErrorMessage name="location" render={renderError} />
                  </div>
                </Box>
                <Box mb={2}>
                  <label className={classes.label} htmlFor="policy">
                    Tech policy areas of interest
                  </label>
                  <div>
                    <Field
                      name="policy"
                      type="text"
                      className={classes.input}
                    />
                    <ErrorMessage name="policy" render={renderError} />
                  </div>
                </Box>
                <Box mb={2}>
                  <label className={classes.label} htmlFor="uses">
                    How could a resource like recoding.tech be most useful to you and your work?
                  </label>
                  <div>
                    <Field
                      name="uses"
                      type="text"
                      className={classes.input}
                    />
                    <ErrorMessage name="uses" render={renderError} />
                  </div>
                </Box>

                <button type="submit" className="button is-primary">
                  Submit
                </button>
              </Box>
            </Form>
          </Formik>
          {/* this is a simple link back to the homepage */}
          <Link href="/">
            ← Back
          </Link>
        </Container>
      </Box>
    </Box>
  );
}

export default Signup;
