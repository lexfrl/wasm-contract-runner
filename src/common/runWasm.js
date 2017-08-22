import createEnv from './wasm/createEnv';
import deadSymbols from './wasm/deadSymbols';
import Runtime from './wasm/Runtime';

export default async function runContract (contract, args, log) {
  const imports = createEnv(deadSymbols());
  const env = imports.env;
  const { code } = contract;
  const runtime = new Runtime(env, contract);

  env.gas = runtime.gas;
  env._malloc = runtime.malloc;
  env._free = runtime.free;
  env.abort = () => {
    throw new Error('Abort');
  };

  window.WebAssembly
    .instantiate(code, imports)
    .then(module => {
      log(`RUN: ${contract.name}`);
      runtime.call(module.instance, args);
    })
    .catch(e => {
      log(`ERROR ${e.message}`);
      throw e;
    });
}
