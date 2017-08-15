import React from 'react';
import PropTypes from 'prop-types';
import './Tools.css';
import { observer } from 'mobx-react';

import { Header, Form, Accordion } from 'semantic-ui-react';

import ContractsStore from '../../common/ContractsStore';
import runWasm from '../../common/runWasm';
import parseArgs from '../../common/parseArgs';

import Runner from '../Runner';
import Storage from '../Storage';

@observer
export default class Tools extends React.Component {
  run = () => {
    runWasm(this.context.store.selectedContract, parseArgs(this.state));
  };

  static contextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };

  render () {
    const { selectedContract } = this.context.store;

    if (!selectedContract) {
      return <div />;
    }

    const panels = [
      {
        key: 'call',
        title: 'Call Contract',
        content: <Runner contract={ selectedContract } />
      },
      {
        key: 'storage',
        title: 'Storage',
        content: <Storage contract={ selectedContract } />
      }
    ];

    return (
      <div className='Tools'>
        <Accordion exclusive={ false } panels={ panels } styled fluid />
      </div>
    );
  }
}
