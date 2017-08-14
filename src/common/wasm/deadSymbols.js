export default function deadSymbols (imports = {}) {
  let { env } = imports;

  env = env || {};

  // dead symbols in rust wasm32-unknown-emscripten target
  // todo: strip/raise issue in rust compiler
  env.invoke_vi = function () {
    throw new Error('invoke_vi: unreachable!');
  };
  env.invoke_v = function () {
    throw new Error('invoke_v: unreachable!');
  };
  env.alignfault = function () {
    throw new Error('alignfault!');
  };
  env.abortStackOverflow = function () {
    throw new Error('abortStackOverflow!');
  };
  env.segfault = function () {
    throw new Error('segfault!');
  };
  env.ftfault = function () {
    throw new Error('ftfault!');
  };

  // todo: also test unwind about those two
  env._rust_begin_unwind = function () {
    throw new Error('_rust_begin_unwind: unreachable!');
  };
  env._llvm_trap = function () {
    throw new Error('_llvm_trap: unreachable!');
  };

  env._emscripten_memcpy_big = function () {
    throw new Error('_emscripten_memcpy_big: unreachable!');
  };
  env.___gxx_personality_v0 = function () {
    throw new Error('___gxx_personality_v0: unreachable!');
  };
  env.___resumeException = function () {
    throw new Error('___resumeException: unreachable!');
  };
  env.___cxa_find_matching_catch_2 = function () {
    throw new Error('___cxa_find_matching_catch_2: unreachable!');
  };
  env.___syscall6 = function () {
    throw new Error('___syscall6: unreachable!');
  };
  env.___syscall140 = function () {
    throw new Error('___syscall140: unreachable!');
  };
  env.___syscall54 = function () {
    throw new Error('___syscall54: unreachable!');
  };
  env._llvm_trap = function () {
    throw new Error('_llvm_trap: unreachable!');
  };
  env.___syscall146 = function () {
    throw new Error('___syscall146: unreachable!');
  };
  return imports;
}
