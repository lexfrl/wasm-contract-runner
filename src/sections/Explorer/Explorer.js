import React from 'react';
import PropTypes from 'prop-types';
import './Explorer.css';
import { observer } from 'mobx-react';
import { Icon, Header, Divider, Button, List } from 'semantic-ui-react';

import ContractsStore from '../../common/ContractsStore';

import Dropzone from 'react-dropzone';

@observer
export default class Explorer extends React.Component {

  uploadWasmFiles = inputFiles => {
    const promises = inputFiles.map(
      file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = e => {
            resolve({ name: file.name, code: e.target.result });
          };
          reader.onerror = e => {
            reject(e);
          };
          reader.onabort = e => {
            reject(e);
          };
          reader.readAsArrayBuffer(file);
        })
    );

    Promise.all(promises).then(files => {
      this.context.store.addContracts(files);
    });
  };

  static contextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };

  renderFiles () {
    const { contracts, selected } = this.context.store;
    const list = Array.from(contracts.values()).map(file =>
      <List.Item
        active={ selected === file.name }
        onClick={ () => this.context.store.selectContract(file.name) }
        key={ file.name }
      >
        <List.Content>
          <List.Header>
            {file.name}
          </List.Header>
          <List.Description>
            {file.code.byteLength} bytes
          </List.Description>
        </List.Content>
      </List.Item>
    );

    return (
      <List celled selection verticalAlign='middle'>
        {list}
      </List>
    );
  }

  render () {
    return (
      <div>
        <Dropzone
          onDrop={ accepted => this.uploadWasmFiles(accepted) }
          ref={ dropzoneRef => (this.dropzoneRef = dropzoneRef) }
          style={ {} }
          disableClick
          disablePreview
        >
          <Header as='h3'>Uploaded contracts</Header>
          <Divider />
          <Button onClick={ () => this.dropzoneRef.open() } fluid color='grey'>
            <Icon name='plus' /> Upload WASM files
          </Button>

          {this.renderFiles()}
        </Dropzone>
      </div>
    );
  }
}
