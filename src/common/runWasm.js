import { BinaryReader, BinaryReaderState, ExternalKind } from 'wasmparser';

import createEnv from './wasm/createEnv';
import deadSymbols from './wasm/deadSymbols';
import Runtime from './wasm/Runtime';

export default async function runContract (contract, args, log) {
  const imports = createEnv(deadSymbols());
  console.log(imports);
  const env = imports.env;
  const { code } = contract;
  const runtime = new Runtime(env, contract, log);

  const { limits: { initial, maximum } } = readTableType(contract.code);

  imports.env.table = new window.WebAssembly.Table({
    initial,
    maximum,
    element: 'anyfunc'
  });

  window.WebAssembly
    .instantiate(code, imports)
    .then(module => {
      log(`RUN: ${contract.name}`);
      runtime.setInstance(module.instance);
      runtime.call(args);
    })
    .catch(e => {
      log(`ERROR: ${e.message}`);
      throw e;
    });
}

function readTableType (code) {
  const reader = new BinaryReader();

  reader.setData(code, 0, code.byteLength);
  while (reader.read()) {
    if (BinaryReaderState.IMPORT_SECTION_ENTRY === reader.state) {
      let imprt = reader.result;

      if (ExternalKind.Table === imprt.kind) {
        return reader.result.type;
      }
    }
  }
}
