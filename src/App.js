// base imports
import { Route, Switch, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// components
import Home from './Home';
import Form from './Form';
import NotFound from './NotFound';
// import styles from './App.module.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/*<header className={styles.header}>
        <Link className={styles.headerLink} to="/">
          Sanity Mad Libs
        </Link>
      </header>*/}

      <main>{/*className={styles.main}*/}
        <div>{/*className={styles.container}*/}
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={Form} path="/signup" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
