export function bytesToHex (bytes) {
  if (!bytes) {
    return '';
  }
  return bytes.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export function hexToBytes (hex) {
  if (!hex) {
    return [];
  }
  let len = hex.length;
  let res = [];

  for (let i = 0; i < len; i += 2) {
    let byte = parseInt(hex.slice(i, i + 2), 16);

    res.push(byte);
  }
  return res;
}
