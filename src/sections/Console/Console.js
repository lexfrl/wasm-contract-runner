import './Console.css';

import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AceEditor from 'react-ace';
import 'brace/theme/github';

import { Header } from 'semantic-ui-react';

// import { View, StyleSheet } from 'react-primitives';

import ContractsStore from '../../common/ContractsStore';

@observer
export default class Console extends React.Component {
  store = this.context.store;
  editor = null;

  componentDidUpdate () {
    if (!this.editor) {
      return;
    }
    this.editor.gotoLine(this.store.logEntries.length + 1);
  }

  static contextTypes = {
    store: PropTypes.instanceOf(ContractsStore)
  };

  render () {
    const contract = this.context.store.selectedContract;

    return (
      <AceEditor
        ref={ reactAce => { this.editor = reactAce && reactAce.editor; } }
        readOnly
        width='100%'
        height='100%'
        mode='text'
        theme='github'
        name='wast'
        showGutter={ false }
        showPrintMargin={ false }
        value={ this.store.logEntries.join('\n') }
      />
    );
  }
}

// const styles = StyleSheet.create({
//   console: {}
// });
