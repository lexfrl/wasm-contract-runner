import './Editor.css';

import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/ext/searchbox';

import { BinaryReader, WasmDisassembler } from 'wasmparser';

import { Header } from 'semantic-ui-react';

import ContractsStore from '../../common/ContractsStore';

function toWast (buffer) {
  const reader = new BinaryReader();
  const dis = new WasmDisassembler();

  reader.setData(buffer, 0, buffer.byteLength);
  dis.disassembleChunk(reader);
  const result = dis.getResult();

  return result.lines.join('\n');
}

@observer
export default class Editor extends React.Component {
  store = this.context.store;

  static contextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };

  render () {
    const contract = this.context.store.selectedContract;

    if (!contract) {
      return (
        <div style={ { margin: 'auto' } }>
          <Header as='h2'>Select a contract</Header>
        </div>
      );
    }
    const wast = toWast(contract.code);

    return (
      <AceEditor
        width='100%'
        height='100%'
        mode='text'
        theme='github'
        name='wast'
        showPrintMargin={ false }
        editorProps={ { $blockScrolling: true } }
        value={ wast }
      />
    );
  }
}
