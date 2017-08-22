export default function createEnv (imports = { }) {
  imports.env = imports.env || {};
  const env = imports.env;

  env.memoryBase = imports.env.memoryBase || 1024;
  env.tableBase = imports.env.tableBase || 0;

  env.STACKTOP = env.STACKTOP || 0;
  env.STACK_MAX = env.STACK_MAX || 5 * 1024 * 1024;
  env.DYNAMICTOP_PTR = env.STACK_MAX;
  env.enlargeMemory =
        env.enlargeMemory ||
        function () {
          return 1;
        };
  env.getTotalMemory =
        env.getTotalMemory ||
        function () {
          return 16 * 1024 * 1024;
        };

  env.memoryBase = env.memoryBase || 0;
  env.tableBase = env.tableBase || 0;
  if (!imports.env.table) {
    imports.env.table = new window.WebAssembly.Table({
      initial: 3,
      maximum: 3,
      element: 'anyfunc'
    });
  }
  return imports;
}
