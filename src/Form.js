// /src/MadLib.js
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { sanity } from './sanity';

// Material UI imports
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const query = `
  *[ _type == 'signup' ] { email, background, location, policy, uses }
`;

function Signup() {
  // in this one line, data is fetched from sanity via the sanity client and
  // stored into application state via react-query!
  const { data: signup } = useQuery('signup', () => sanity.fetch(query));

  // this will store the state of the answers of this mad lib
  const [answers, setAnswers] = useState(
    // if the items exist in localStorage, then
    localStorage.getItem(signup)
      ? // then set the initial state to that value
        JSON.parse(localStorage.getItem(signup))
      : // otherwise, set the initial state to an empty object
        {},
  );

  // this is a react "effect" hook: https://reactjs.org/docs/hooks-effect.html
  // we use this to watch for changes in the `slug` or `answers` variables and
  // update local storage when those change.
  useEffect(() => {
    localStorage.setItem(signup, JSON.stringify(answers));
  }, [signup, answers]);

  // if we don't have a signup form yet, then the data must be loading
  if (!signup) {
    return <h1>Loading…</h1>;
  }

  // once the sign up form is loaded, we can map through the structured content to
  // find our placeholder shape. the end result is an array of these placeholders
  const placeholders = signup
    .map((block) => block.children.filter((n) => n._type === 'placeholder'))
    .flat();

  // using the above placeholders array, we calculate whether or not all the
  // blanks are filled in by checking the whether every placeholder has a value
  // in the `answers` state variable.
  const allBlanksFilledIn = placeholders?.every(
    (placeholder) => answers[placeholder._key],
  );

  return (
    <>
      <Typography component="h1" variant="h1">Sign up</Typography>
      {!allBlanksFilledIn ? (
        // if all the blanks are _not_ filled in, then we can show the form
        <>
          <p>Fill in the form.</p>
          <form
            // this `onSubmit` will fire when the user clicks the submit button
            onSubmit={(e) => {
              e.preventDefault();

              const answerEntries = Array.from(
                // find all the inputs
                e.currentTarget.querySelectorAll('input'),
              )
                // then get the name and values in a tuple
                .map((inputEl) => [inputEl.name, inputEl.value]);

              // use `Object.fromEntries` to transform them back to an object
              const nextAnswers = Object.fromEntries(answerEntries);

              setAnswers(nextAnswers);
            }}
          >
            <ul>
              {/* for each placeholder… */}
              {placeholders.map(({ _key, type }) => (
                <li key={_key}>
                  {/* …render an input an a label. */}
                  <input
                    // the `name` of the input will be the sanity `_key`:
                    // https://www.sanity.io/docs/array-type#why-the-key-92296c6c45ea
                    // this will enables us to match this input value with the
                    // correct placeholder
                    name={_key}
                    id={_key}
                  />
                  <label htmlFor={_key}>
                    {type}
                  </label>
                </li>
              ))}
            </ul>
            <button>Submit!</button>
          </form>
        </>
      ) : (
        // if all the blanks are filled in, then we can show the rendered
        // story with a custom serializer for the type `placeholder`
        <>
          <BlockContent
            blocks={signup.story}
            serializers={{
              // see here: https://github.com/sanity-io/block-content-to-react
              types: { placeholder: ({ node: { _key } }) => answers[_key] },
            }}
          />

          <button
            onClick={() => {
              // we reset the state on click after the users confirms it's okay.
              if (window.confirm('Are you sure you want to reset?')) {
                setAnswers({});
              }
            }}
          >
            Reset
          </button>

          {/* this is a simple link back to the main mab libs index */}
          <Link to="/">
            ← More Mad Libs
          </Link>
        </>
      )}
    </>
  );
}

export default Signup;
