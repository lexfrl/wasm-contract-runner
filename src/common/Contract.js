import { observable, computed, action } from 'mobx';

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
    console.log(key, value);
    this.store.set(bytesToHex(key), bytesToHex(value));
  }

  storeGet (key) {
    return hexToBytes(this.store.get(bytesToHex(key)));
  }

}

function bytesToHex (bytes) {
  return bytes.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

function hexToBytes (hex) {
  let len = hex.length;
  let res = [];

  for (let i = 0; i < len; i += 2) {
    let byte = parseInt(hex.slice(i, i + 2), 16);

    res.push(byte);
  }
  return res;
}
