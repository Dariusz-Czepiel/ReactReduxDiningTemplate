import React from 'react';
//import logo from './logo.svg';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import './App.css';

function App() {
  return (
      <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
      </Layout>
  );
}

export default App;

/*
  <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
 */