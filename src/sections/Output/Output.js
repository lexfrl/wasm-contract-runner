import './Output.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Header } from 'semantic-ui-react';

import ContractsStore from '../../common/ContractsStore';
import KeyValue from '../../components/KeyValue';

@observer
export default class Output extends React.Component {
  store = this.context.store;
  static propTypes = {
    result: 'any'
  };

  static contextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };

  render () {
    const selectedContract = this.context.store.selectedContract;

    if (!selectedContract) {
      return <div style={ { margin: 'auto' } }>
        <Header as='h2'>Select a contract</Header>
      </div>;
    }
    return <div />;
  }
}
