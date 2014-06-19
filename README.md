# buffer-write

[![Build Status](https://img.shields.io/travis/coinative/buffer-write.svg)](https://travis-ci.org/coinative/buffer-write) [![Coverage Status](https://img.shields.io/coveralls/coinative/buffer-write.svg)](https://coveralls.io/r/coinative/buffer-write?branch=master)

Write to a buffer without maintaining an offset or knowing its length.

* This module tries to mirror Buffer methods for simplicity.
* Supports writing 64-bit values at 52-bit precision (JavaScript safe integer maximum).

## Install

```
npm install buffer-write
```

## Usage

```js
var Writer = require('buffer-write');

// Normal method
var writer = new Writer()
writer.write('a')
writer.fill(1, 3)
writer.writeInt8(0x72)
writer.toBuffer(); // <Buffer 61 01 01 01 72>

// Chain method
Writer()
  .writeUInt16BE(0x7623)
  .write(new Buffer([1, 2, 3, 4]), 2)
  .writeUInt16LE(0x1800)
  .toBuffer(); // <Buffer 76 23 01 02 00 18>
```

## API

NOTE: There is no concept of offset when using this module as values are effectively appended to each other.

### write[U]Int8(value), write[U]{16,32,64}{BE,LE}(value)

Write an integer of the specified size and endian format. A RangeError will be thrown for any out of range values. 64-bit integer methods will only accept 52-bit integer values.

### writeFloat{BE,LE}(value), writeDouble{BE,LE}(value)

Write a floating point number of the specified size and endian format.

### write(string, [length], [encoding])

Write a string of specified length and encoding.

### write(buffer, [start], [end])

Write a buffer or part of a buffer.

### fill(value, length)

Fill with length repetitions of the specified value.

### length

The number of bytes currently written.

### copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])

Write our values into an existing buffer.

### toBuffer()

Create a new buffer and write our values.

## License

MIT
