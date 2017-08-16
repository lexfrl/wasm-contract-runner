import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

export default function Address (props) {
  return (<Input name='address' label='Address:' value={ '0x' + this.state.address } onChange={ this.handleChange } /> )
}

Address.propTypes = Input.propTypes;
