const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

const NUMBER = 0;
const BUFFER = 1;
const STRING = 2;
const FILL = 3;

function Writer() {
  if (!(this instanceof Writer)) {
    return new Writer();
  }
  this._parts = [];
  this.length = 0;
}

Writer.prototype._push = function (part) {
  this._parts.push(part);
  this.length += part.length;
};

function assertInt(value, min, max) {
  if (min > value || value > max) {
    throw new RangeError('value is out of bounds');
  }
}


Writer.prototype.writeUInt8 = function (value) {
  assertInt(value, 0, 0xff);
  this._push({ type: NUMBER, method: 'writeUInt8', length: 1, value: value });
  return this;
};

Writer.prototype.writeUInt16BE = function (value) {
  assertInt(value, 0, 0xffff);
  this._push({ type: NUMBER, method: 'writeUInt16BE', length: 2, value: value });
  return this;
};

Writer.prototype.writeUInt16LE = function (value) {
  assertInt(value, 0, 0xffff);
  this._push({ type: NUMBER, method: 'writeUInt16LE', length: 2, value: value });
  return this;
};

Writer.prototype.writeUInt32BE = function (value) {
  assertInt(value, 0, 0xffffffff);
  this._push({ type: NUMBER, method: 'writeUInt32BE', length: 4, value: value });
  return this;
};

Writer.prototype.writeUInt32LE = function (value) {
  assertInt(value, 0, 0xffffffff);
  this._push({ type: NUMBER, method: 'writeUInt32LE', length: 4, value: value });
  return this;
};

Writer.prototype.writeUInt64BE = function (value) {
  assertInt(value, 0, MAX_SAFE_INTEGER);
  this.writeUInt32BE((value / Math.pow(2, 32)) >> 0);
  this.writeUInt32BE(value >>> 0);
  return this;
};

Writer.prototype.writeUInt64LE = function (value) {
  assertInt(value, 0, MAX_SAFE_INTEGER);
  this.writeUInt32LE(value >>> 0);
  this.writeUInt32LE((value / Math.pow(2, 32)) >> 0);
  return this;
};


Writer.prototype.writeInt8 = function (value) {
  assertInt(value, -0x80, 0x7f);
  this._push({ type: NUMBER, method: 'writeInt8', length: 1, value: value });
  return this;
};

Writer.prototype.writeInt16BE = function (value) {
  assertInt(value, -0x8000, 0x7fff);
  this._push({ type: NUMBER, method: 'writeInt16BE', length: 2, value: value });
  return this;
};

Writer.prototype.writeInt16LE = function (value) {
  assertInt(value, -0x8000, 0x7fff);
  this._push({ type: NUMBER, method: 'writeInt16LE', length: 2, value: value });
  return this;
};

Writer.prototype.writeInt32BE = function (value) {
  assertInt(value, -0x80000000, 0x7fffffff);
  this._push({ type: NUMBER, method: 'writeInt32BE', length: 4, value: value });
  return this;
};

Writer.prototype.writeInt32LE = function (value) {
  assertInt(value, -0x80000000, 0x7fffffff);
  this._push({ type: NUMBER, method: 'writeInt32LE', length: 4, value: value });
  return this;
};

Writer.prototype.writeInt64BE = function (value) {
  assertInt(value, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
  this.writeInt32BE(Math.floor(value / Math.pow(2, 32)));
  this.writeUInt32BE(value >>> 0);
  return this;
};

Writer.prototype.writeInt64LE = function (value) {
  assertInt(value, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
  this.writeUInt32LE(value >>> 0);
  this.writeInt32LE(Math.floor(value / Math.pow(2, 32)));
  return this;
};

Writer.prototype.writeFloatBE = function (value) {
  this._push({ type: NUMBER, method: 'writeFloatBE', length: 4, value: value });
  return this;
};

Writer.prototype.writeFloatLE = function (value) {
  this._push({ type: NUMBER, method: 'writeFloatLE', length: 4, value: value });
  return this;
};

Writer.prototype.writeDoubleBE = function (value) {
  this._push({ type: NUMBER, method: 'writeDoubleBE', length: 8, value: value });
  return this;
};

Writer.prototype.writeDoubleLE = function (value) {
  this._push({ type: NUMBER, method: 'writeDoubleLE', length: 8, value: value });
  return this;
};

Writer.prototype._writeString = function (string, length, encoding) {
  if (typeof length === 'string') {
    encoding = length;
    length = null;
  }
  this._push({ type: STRING, length: length || Buffer.byteLength(string, encoding), encoding: encoding, value: string });
};

Writer.prototype._writeBuffer = function (buffer, start, end) {
  start = start || 0;
  end = end || buffer.length;
  this._push({ type: BUFFER, length: end - start, start: start, end: end, value: buffer });
};

Writer.prototype.write = function (value) {
  if (typeof value === 'string') {
    this._writeString.apply(this, arguments);
    return this;
  }
  if (Buffer.isBuffer(value)) {
    this._writeBuffer.apply(this, arguments);
    return this;
  }
  throw new TypeError('value is not a string or buffer');
};

Writer.prototype.copy = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
  // TODO: avoid creating a new buffer
  this.toBuffer().copy(targetBuffer, targetStart, sourceStart, sourceEnd);
};

Writer.prototype.fill = function (value, length) {
  this._push({ type: FILL, length: length, value: value });
  return this;
};

Writer.prototype.toBuffer = function () {
  var buffer = new Buffer(this.length);
  var offset = 0;
  for (var i = 0; i < this._parts.length; i++) {
    var part = this._parts[i];
    switch (part.type) {
      case NUMBER:
        buffer[part.method](part.value, offset);
        break;
      case STRING:
        buffer.write(part.value, offset, part.length, part.encoding);
        break;
      case BUFFER:
        part.value.copy(buffer, offset, part.start, part.end);
        break;
      case FILL:
        buffer.fill(part.value, offset, offset + part.length);
        break;
    }
    offset += part.length;
  }
  return buffer;
};

module.exports = Writer;
