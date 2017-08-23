import { BigInteger } from 'jsbn';

export default function parseArgs ({ address, sender, origin, value = 0, data }) {
  const target = new Uint8Array(92 + data.length / 2);

  // value = new BigInteger(value);

  target.set(hexToArrayBuffer(address, new Uint8Array(20)), 0);
  target.set(hexToArrayBuffer(sender, new Uint8Array(20)), 20);
  target.set(hexToArrayBuffer(origin, new Uint8Array(20)), 40);
  target.set(new Uint8Array(32), 60); // TODO: convert BigNumber to big-endian
  target.set(hexToArrayBuffer(data, new Uint8Array(data.length / 2)), 92);
  return target;
}

function toHexAddress (hex) {
  hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex;
  return hex;
}

function hexToArrayBuffer (hex, view) {
  hex = toHexAddress(hex);

  for (var i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return view;
}
