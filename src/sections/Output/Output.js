import './Output.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Icon, Table } from 'semantic-ui-react';

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
      return <div />;
    }
    return (
      <div>
        <KeyValue keyName='Key' valueName='Value' data={ selectedContract.store } />
      </div>
    );
  }
}
