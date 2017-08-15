import React from 'react';
import PropTypes from 'prop-types';
import './Runner.css';
import { observer } from 'mobx-react';

import { Header, Form, Accordion } from 'semantic-ui-react';

import Contract from '../../common/Contract';
import runWasm from '../../common/runWasm';
import parseArgs from '../../common/parseArgs';

@observer
export default class Runner extends React.Component {
  constructor (...args) {
    super(...args);
    this.state = {
      address: '',
      sender: '',
      origin: '',
      value: '',
      data: ''
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  run = () => {
    runWasm(this.props.contract, parseArgs(this.state));
  };

  static propTypes = {
    contract: PropTypes.instanceOf(Contract)
  };

  render () {
    return (
      <Form>
        <Form.Input
          name='address'
          label='Address'
          onChange={ this.handleChange }
        />
        <Form.Input name='sender' label='Sender' onChange={ this.handleChange } />
        <Form.Input name='origin' label='Origin' onChange={ this.handleChange } />
        <Form.Input name='origin' label='Gas' onChange={ this.handleChange } />
        <Form.Button color='orange' fluid onClick={ () => this.run() }>
          Call
        </Form.Button>
      </Form>
    );
  }
}
