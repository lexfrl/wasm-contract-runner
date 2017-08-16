import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Form, Input } from 'semantic-ui-react';

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
    let { name, value } = target;

    if (name === 'value') {
      value = value.substring(0, 1) === '-' ? value.substring(1) : value;
    }

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
        <Form.Input>
          <Input
            name='address'
            label='Address'
            value={ this.state.address }
            onChange={ this.handleChange }
          />
        </Form.Input>
        <Form.Input>
          <Input
            name='sender'
            label='Sender'
            value={ this.state.sender }
            onChange={ this.handleChange }
          />
        </Form.Input>
        <Form.Input>
          <Input
            name='origin'
            label='Origin'
            value={ this.state.origin }
            onChange={ this.handleChange }
          />
        </Form.Input>
        <Form.Input>
          <Input
            name='value'
            type='number'
            label='Value'
            value={ this.state.value }
            onChange={ this.handleChange }
          />
        </Form.Input>
        <Form.Input>
          <Input
            name='data'
            label='Data'
            value={ this.state.data }
            onChange={ this.handleChange }
          />
        </Form.Input>
        <Form.Button color='orange' fluid onClick={ () => this.run() }>
          Call
        </Form.Button>
      </Form>
    );
  }
}
