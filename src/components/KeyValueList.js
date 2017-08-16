import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';
import { observer } from 'mobx-react';

@observer
export default class KeyValueList extends React.Component {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: new Map()
  };

  render () {
    const panels = Array.from(this.props.data).map(([key, value]) => ({
      key: key,
      title: key,
      content: value
    }));

    return <Accordion styled={ false } fluid panels={ panels } />;
  }
}
