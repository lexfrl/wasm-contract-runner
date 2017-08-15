import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react';

@observer
export default class KeyValue extends React.Component {
  static propTypes = {
    keyName: PropTypes.string,
    valueName: PropTypes.string,
    data: PropTypes.object
  };

  static defaultProps = {
    data: new Map()
  };

  render () {
    const rows = Array.from(this.props.data).map(([key, value]) =>
      <Table.Row key={ key }>
        <Table.Cell>
          { key }
        </Table.Cell>
        <Table.Cell>
          { value }
        </Table.Cell>
      </Table.Row>
    );

    return (
      <Table size='small' celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={ 1 }>
              { this.props.keyName }
            </Table.HeaderCell>
            <Table.HeaderCell width={ 1 }>
              { this.props.valueName }
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    );
  }
}
