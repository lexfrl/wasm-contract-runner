import './Storage.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Icon, Table } from 'semantic-ui-react';

import Contract from '../../common/Contract';
import KeyValue from '../../components/KeyValue';

@observer
export default class Storage extends React.Component {

  store = this.context.store;
  static propTypes = {
    result: 'any'
  };

  static propTypes = {
    contract: PropTypes.instanceOf(Contract)
  };

  render () {
    return (
      <div>
        <KeyValue keyName='Key' valueName='Value' data={ this.props.contract.store } />
      </div>
    );
  }
}
