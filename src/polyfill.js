if (!ArrayBuffer.transfer) {
  ArrayBuffer.transfer = function (source, length) {
    source = Object(source);
    var dest = new ArrayBuffer(length);

    if (!(source instanceof ArrayBuffer) || !(dest instanceof ArrayBuffer)) {
      throw new TypeError(
        'Source and destination must be ArrayBuffer instances'
      );
    }
    if (dest.byteLength >= source.byteLength) {
      var nextOffset = 0;
      var leftBytes = source.byteLength;
      var wordSizes = [8, 4, 2, 1];

      wordSizes.forEach(function (_wordSize_) {
        if (leftBytes >= _wordSize_) {
          var done = transferWith(
            _wordSize_,
            source,
            dest,
            nextOffset,
            leftBytes
          );

          nextOffset = done.nextOffset;
          leftBytes = done.leftBytes;
        }
      });
    }
    return dest;
    function transferWith (wordSize, source, dest, nextOffset, leftBytes) {
      var ViewClass = Uint8Array;

      switch (wordSize) {
        case 8:
          ViewClass = Float64Array;
          break;
        case 4:
          ViewClass = Float32Array;
          break;
        case 2:
          ViewClass = Uint16Array;
          break;
        case 1:
          ViewClass = Uint8Array;
          break;
        default:
          ViewClass = Uint8Array;
          break;
      }
      var viewSource = new ViewClass(
        source,
        nextOffset,
        Math.trunc(leftBytes / wordSize)
      );
      var viewDest = new ViewClass(
        dest,
        nextOffset,
        Math.trunc(leftBytes / wordSize)
      );

      for (var i = 0; i < viewDest.length; i++) {
        viewDest[i] = viewSource[i];
      }
      return {
        nextOffset: viewSource.byteOffset + viewSource.byteLength,
        leftBytes:
          source.byteLength - (viewSource.byteOffset + viewSource.byteLength)
      };
    }
  };
}
