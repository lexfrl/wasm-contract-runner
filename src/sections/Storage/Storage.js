import './Storage.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Icon, Table } from 'semantic-ui-react';

import Contract from '../../common/Contract';
import KeyValueTable from '../../components/KeyValueTable';

@observer
export default class Storage extends React.Component {
  static propTypes = {
    contract: PropTypes.instanceOf(Contract)
  };

  render () {
    return (
      <div>
        <KeyValueTable keyName='Key' valueName='Value' data={ this.props.contract.store } />
      </div>
    );
  }
}
