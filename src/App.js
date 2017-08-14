import React from 'react';
import PropTypes from 'prop-types';
import Dexie from 'dexie';
import './App.css';
import { Header } from 'semantic-ui-react';

import Explorer from './sections/Explorer';
import Runner from './sections/Runner';
import Output from './sections/Output';

import ContractsStore from './common/ContractsStore';

import parseArgs from './common/parseArgs';

class App extends React.Component {

  static childContextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };
  static contextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };

  constructor (props, state) {
    super(props, state);
    this.db = null;
    this.store = new ContractsStore();
  }

  getChildContext () {
    return { store: this.store };
  }

  componentWillMount = () => {
    this.store.loadContracts();
  };

  render () {
    return (
      <div>
        <div className='AppHeader'>
          <Header as='h1'>WASM Contract Runner</Header>
        </div>
        <div className='AppBody'>
          <div className='AppExplorer'>
            <Explorer />
          </div>
          <div className='AppRunner'>
            <Runner />
          </div>
          <div className='AppOutput'>
            <Output />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
