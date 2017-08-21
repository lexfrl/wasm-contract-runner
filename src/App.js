import React from 'react';
import PropTypes from 'prop-types';
import Dexie from 'dexie';
import './App.css';
import { Header } from 'semantic-ui-react';

import Explorer from './sections/Explorer';
import Tools from './sections/Tools';
import Editor from './sections/Editor';
import Console from './sections/Console';

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
          <div className='AppLeft'>
            <Explorer />
          </div>

          <div className='AppCenter'>
            <div className='AppCenterTop'>
              <Editor />
            </div>
            <div className='AppCenterBottom'>
              <Console />
            </div>
          </div>
          <div className='AppRight'>
            <Tools />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
