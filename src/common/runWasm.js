import createEnv from './wasm/createEnv';
import deadSymbols from './wasm/deadSymbols';
import Runtime from './wasm/Runtime';

export default async function runContract (contract, args) {
  const imports = createEnv(deadSymbols());
  const env = imports.env;
  const { code } = contract;
  const runtime = new Runtime(env, contract);

  env.gas = runtime.gas;
  env._malloc = runtime.malloc;
  env._free = runtime.free;
  env._debug = function (ptr, len) {
    let arr = new Uint8Array(env.memory.buffer);
    let str = '';

    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(arr[ptr + i]);
    }
    console.log('DEBUG', str);
  };
  env.abort = () => {
    throw new Error('Abort');
  };

  return window.WebAssembly.instantiate(code, imports)
    .then((module) => {
      runtime.call(module.instance, args);
    });
}
