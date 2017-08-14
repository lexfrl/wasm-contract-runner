import React from 'react';
import PropTypes from 'prop-types';
import './Runner.css';
import { observer } from 'mobx-react';

import { Header, Form, Button, Divider, Input } from 'semantic-ui-react';

import ContractsStore from '../../common/ContractsStore';
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

    return (
      <div className='Runner'>
        <Form>
          <Form.Input
            name='address'
            label='Address'
            onChange={ this.handleChange }
          />
          <Form.Input
            name='sender'
            label='Sender'
            onChange={ this.handleChange }
          />
          <Form.Input
            name='origin'
            label='Origin'
            onChange={ this.handleChange }
          />
          <Form.Button color='orange' fluid onClick={ this.run }>
            Run
          </Form.Button>
        </Form>
      </div>
    );
  }
}
