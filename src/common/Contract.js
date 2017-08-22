import { observable, computed, action } from 'mobx';
import { bytesToHex, hexToBytes } from './utils';

export default class Contract {
  name = null;
  code = null;
  calls = [];
  @observable store = new Map();

  constructor ({ name, code, store = new Map() }) {
    this.name = name;
    this.code = code;
    this.store = store;
  }

  @action storeSet (key, value) {
    this.store.set(bytesToHex(key), bytesToHex(value));
  }

  storeGet (key) {
    return hexToBytes(this.store.get(bytesToHex(key)));
  }

}
