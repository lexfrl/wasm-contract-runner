import { observable, computed, action } from 'mobx';
import ContractsDB from './ContractsDB';
import Contract from './Contract';

class ContractsStore {
  @observable contracts = new Map();
  @observable loading = true;
  @observable selected = '';

  constructor () {
    this.loadContracts();
  }

  @computed get selectedContract () {
    return this.contracts.get(this.selected);
  }

  @action selectContract (name) {
    this.selected = name;
  }

  async loadContracts () {
    this.loading = true;
    ContractsDB.loadContracts().then((contracts) => {
      this.contracts = contracts;
      this.loading = false;
    });
  }

  async saveContracts () {
    this.loading = true;
    ContractsDB.saveContracts(this.contracts).then(() => {
      this.loading = false;
    });
  }

  /*
   * Updates contracts code
   */
  @action addContracts (files) {
    for (let { name, code } of files) {
      let existing = this.contracts.get(name);

      if (!existing) {
        this.contracts.set(name, new Contract({ name, code }));
      } else {
        existing.code = code;
      }
    }
    this.saveContracts();
  }
}

export default ContractsStore;
