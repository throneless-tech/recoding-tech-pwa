// /src/MadLib.js
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { sanity, imageUrlBuilder } from './sanity';

const query = `
  *[ _type == 'madLib' && slug.current == $slug ]
`;

function Form() {
  // this variable is populated from `react-router` which pulls it from the URL
  const { slug } = useParams();

  // data is fetched from sanity via the sanity client and stored into
  // application state via react-query. note that the slug is used as the
  // "query key": https://react-query.tanstack.com/guides/query-keys
  const { data = [] } = useQuery(slug, () => sanity.fetch(query, { slug }));

  // we'll use destructuring assignment to return the first mab lib
  const [madLib] = data;

  // this will store the state of the answers of this mad lib
  const [answers, setAnswers] = useState(
    // if the items exist in localStorage, then
    localStorage.getItem(slug)
      ? // then set the initial state to that value
        JSON.parse(localStorage.getItem(slug))
      : // otherwise, set the initial state to an empty object
        {},
  );

  // this is a react "effect" hook: https://reactjs.org/docs/hooks-effect.html
  // we use this to watch for changes in the `slug` or `answers` variables and
  // update local storage when those change.
  useEffect(() => {
    localStorage.setItem(slug, JSON.stringify(answers));
  }, [slug, answers]);

  if (!madLib) {
    return <h1>Loading…</h1>;
  }

  // once the mad lib is loaded, we can map through the structured content to
  // find our placeholder shape. the end result is an array of these placeholders
  const placeholders = madLib?.story
    .map((block) => block.children.filter((n) => n._type === 'placeholder'))
    .flat();

  // using the above placeholders array, we calculate whether or not all the
  // blanks are filled in by checking the whether every placeholder has a value
  // in the `answers` state variable.
  const allBlanksFilledIn = placeholders?.every(
    (placeholder) => answers[placeholder._key],
  );

  return (
    <h2>Sign Up</h2>
  );
}

export default Form;
