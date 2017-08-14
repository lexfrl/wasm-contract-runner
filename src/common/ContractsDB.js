import Dexie from 'dexie';
import Contract from './Contract';

class ContractsDB {
  db = new Dexie('wasmContracts');
  constructor () {
    this.db.version(1).stores({ files: 'name, code, store' });
  }

  async loadContracts () {
    const data = await this.db.files.toArray();
    const contracts = new Map();

    for (let row of data) {
      contracts.set(row.name, new Contract({ name: row.name, code: row.code, store: new Map(Object.entries(row.store)) }));
    }

    return contracts;
  }
  async saveContracts (contracts) {
    return this.db.files.bulkPut(Array.from(contracts.values()
      .map(({ name, code, store }) => ({ name, code, store: store.toJS() }))));
  }
}

export default new ContractsDB();
