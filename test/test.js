var Writer = require('../');

describe('buffer-write', function () {
  var writer;

  beforeEach(function () {
    writer = new Writer();
  });

  describe('writeUInt8(value)', function () {
    it('should write values', function () {
      writer.writeUInt8(0x00);
      writer.writeUInt8(0x18);
      writer.writeUInt8(0x8d);
      writer.writeUInt8(0xff);

      expect(writer.toBuffer().toString('hex')).to.equal('00' + '18' + '8d' + 'ff');
      expect(writer.length).to.equal(4);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt8(-0x01); }).to.throw();
      expect(function () { writer.writeUInt8(0x100); }).to.throw();
    });
  });

  describe('writeUInt16BE(value)', function () {
    it('should write values', function () {
      writer.writeUInt16BE(0x0000);
      writer.writeUInt16BE(0x0001);
      writer.writeUInt16BE(0x0100);
      writer.writeUInt16BE(0xffff);

      expect(writer.toBuffer().toString('hex')).to.equal('0000' + '0001' + '0100' + 'ffff');
      expect(writer.length).to.equal(8);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt16BE(-0x01); }).to.throw();
      expect(function () { writer.writeUInt16BE(0x10000); }).to.throw();
    });
  });

  describe('writeUInt16LE(value)', function () {
    it('should write values', function () {
      writer.writeUInt16LE(0x0000);
      writer.writeUInt16LE(0x0001);
      writer.writeUInt16LE(0x0100);
      writer.writeUInt16LE(0xffff);

      expect(writer.toBuffer().toString('hex')).to.equal('0000' + '0100' + '0001' + 'ffff');
      expect(writer.length).to.equal(8);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt16LE(-0x01); }).to.throw();
      expect(function () { writer.writeUInt16LE(0x10000); }).to.throw();
    });
  });

  describe('writeUInt32BE(value)', function () {
    it('should write values', function () {
      writer.writeUInt32BE(0x00000000);
      writer.writeUInt32BE(0x00000001);
      writer.writeUInt32BE(0x00010000);
      writer.writeUInt32BE(0xffffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('00000000' + '00000001' + '00010000' + 'ffffffff');
      expect(writer.length).to.equal(16);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt32BE(-0x01); }).to.throw();
      expect(function () { writer.writeUInt32BE(0x100000000); }).to.throw();
    });
  });

  describe('writeUInt32LE(value)', function () {
    it('should write values', function () {
      writer.writeUInt32LE(0x00000000);
      writer.writeUInt32LE(0x00000001);
      writer.writeUInt32LE(0x00010000);
      writer.writeUInt32LE(0xffffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('00000000' + '01000000' + '00000100' + 'ffffffff');
      expect(writer.length).to.equal(16);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt32LE(-0x01); }).to.throw();
      expect(function () { writer.writeUInt32LE(0x100000000); }).to.throw();
    });
  });

  describe('writeUInt64BE(value)', function () {
    it('should write values', function () {
      writer.writeUInt64BE(0x0000000000000000);
      writer.writeUInt64BE(0x0000000000000001);
      writer.writeUInt64BE(0x0000000100000000);
      writer.writeUInt64BE(0x001fffffffffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('0000000000000000' + '0000000000000001' + '0000000100000000' + '001fffffffffffff');
      expect(writer.length).to.equal(32);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt64BE(-0x01); }).to.throw();
      expect(function () { writer.writeUInt64BE(0x0020000000000000); }).to.throw();
    });
  });

  describe('writeUInt64LE(value)', function () {
    it('should write values', function () {
      writer.writeUInt64LE(0x0000000000000000);
      writer.writeUInt64LE(0x0000000000000001);
      writer.writeUInt64LE(0x0000000100000000);
      writer.writeUInt64LE(0x001fffffffffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('0000000000000000' + '0100000000000000' + '0000000001000000' + 'ffffffffffff1f00');
      expect(writer.length).to.equal(32);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeUInt64LE(-0x01); }).to.throw();
      expect(function () { writer.writeUInt64LE(0x0020000000000000); }).to.throw();
    });
  });


  describe('writeInt8(value)', function () {
    it('should write values', function () {
      writer.writeInt8(-0x80);
      writer.writeInt8(-0x01);
      writer.writeInt8(0x00);
      writer.writeInt8(0x18);
      writer.writeInt8(0x7f);

      expect(writer.toBuffer().toString('hex')).to.equal('80' + 'ff' + '00' + '18' + '7f');
      expect(writer.length).to.equal(5);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt8(-0x81); }).to.throw();
      expect(function () { writer.writeInt8(0x80); }).to.throw();
    });
  });

  describe('writeInt16BE(value)', function () {
    it('should write values', function () {
      writer.writeInt16BE(-0x8000);
      writer.writeInt16BE(-0x0001);
      writer.writeInt16BE(0x0000);
      writer.writeInt16BE(0x0100);
      writer.writeInt16BE(0x7fff);

      expect(writer.toBuffer().toString('hex')).to.equal('8000' + 'ffff' + '0000' + '0100' + '7fff');
      expect(writer.length).to.equal(10);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt16BE(-0x8001); }).to.throw();
      expect(function () { writer.writeInt16BE(0x8000); }).to.throw();
    });
  });

  describe('writeInt16LE(value)', function () {
    it('should write values', function () {
      writer.writeInt16LE(-0x8000);
      writer.writeInt16LE(-0x0001);
      writer.writeInt16LE(0x0000);
      writer.writeInt16LE(0x0100);
      writer.writeInt16LE(0x7fff);

      expect(writer.toBuffer().toString('hex')).to.equal('0080' + 'ffff' + '0000' + '0001' + 'ff7f');
      expect(writer.length).to.equal(10);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt16LE(-0x8001); }).to.throw();
      expect(function () { writer.writeInt16LE(0x8000); }).to.throw();
    });
  });

  describe('writeInt32BE(value)', function () {
    it('should write values', function () {
      writer.writeInt32BE(-0x80000000);
      writer.writeInt32BE(-0x00000001);
      writer.writeInt32BE(0x00000000);
      writer.writeInt32BE(0x00010000);
      writer.writeInt32BE(0x7fffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('80000000' + 'ffffffff' + '00000000' + '00010000' + '7fffffff');
      expect(writer.length).to.equal(20);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt32BE(-0x80000001); }).to.throw();
      expect(function () { writer.writeInt32BE(0x80000000); }).to.throw();
    });
  });

  describe('writeInt32LE(value)', function () {
    it('should write values', function () {
      writer.writeInt32LE(-0x80000000);
      writer.writeInt32LE(-0x00000001);
      writer.writeInt32LE(0x00000000);
      writer.writeInt32LE(0x00010000);
      writer.writeInt32LE(0x7fffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('00000080' + 'ffffffff' + '00000000' + '00000100' + 'ffffff7f');
      expect(writer.length).to.equal(20);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt32LE(-0x80000001); }).to.throw();
      expect(function () { writer.writeInt32LE(0x80000000); }).to.throw();
    });
  });

  describe('writeInt64BE(value)', function () {
    it('should write values', function () {
      writer.writeInt64BE(-0x001fffffffffffff);
      writer.writeInt64BE(-0x0000000000000001);
      writer.writeInt64BE(0x0000000000000000);
      writer.writeInt64BE(0x0000000100000000);
      writer.writeInt64BE(0x001fffffffffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('ffe0000000000001' + 'ffffffffffffffff' + '0000000000000000' + '0000000100000000' + '001fffffffffffff');
      expect(writer.length).to.equal(40);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt64BE(-0x0020000000000000); }).to.throw();
      expect(function () { writer.writeInt64BE(0x0020000000000000); }).to.throw();
    });
  });

  describe('writeInt64LE(value)', function () {
    it('should write values', function () {
      writer.writeInt64LE(-0x001fffffffffffff);
      writer.writeInt64LE(-0x0000000000000001);
      writer.writeInt64LE(0x0000000000000000);
      writer.writeInt64LE(0x0000000100000000);
      writer.writeInt64LE(0x001fffffffffffff);

      expect(writer.toBuffer().toString('hex')).to.equal('010000000000e0ff' + 'ffffffffffffffff' + '0000000000000000' + '0000000001000000' + 'ffffffffffff1f00');
      expect(writer.length).to.equal(40);
    });

    it('throw out of range', function () {
      expect(function () { writer.writeInt64LE(-0x0020000000000000); }).to.throw();
      expect(function () { writer.writeInt64LE(0x0020000000000000); }).to.throw();
    });
  });

  describe('writeFloatBE(value)', function () {
    it('should write values', function () {
      writer.writeFloatBE(0);
      writer.writeFloatBE(0.1);
      writer.writeFloatBE(19.6);

      expect(writer.toBuffer().toString('hex')).to.equal('00000000' + '3dcccccd' + '419ccccd');
      expect(writer.length).to.equal(12);
    });
  });

  describe('writeFloatLE(value)', function () {
    it('should write values', function () {
      writer.writeFloatLE(0);
      writer.writeFloatLE(0.1);
      writer.writeFloatLE(19.6);

      expect(writer.toBuffer().toString('hex')).to.equal('00000000' + 'cdcccc3d' + 'cdcc9c41');
      expect(writer.length).to.equal(12);
    });
  });

  describe('writeDoubleBE(value)', function () {
    it('should write values', function () {
      writer.writeDoubleBE(0);
      writer.writeDoubleBE(0.1);
      writer.writeDoubleBE(19.6);
      writer.writeDoubleBE(1.1234567e50);

      expect(writer.toBuffer().toString('hex')).to.equal('0000000000000000' + '3fb999999999999a' + '403399999999999a' + '4a5337ae84cd3731');
      expect(writer.length).to.equal(32);
    });
  });

  describe('writeDoubleLE(value)', function () {
    it('should write values', function () {
      writer.writeDoubleLE(0);
      writer.writeDoubleLE(0.1);
      writer.writeDoubleLE(19.6);
      writer.writeDoubleLE(1.1234567e50);

      expect(writer.toBuffer().toString('hex')).to.equal('0000000000000000' + '9a9999999999b93f' + '9a99999999993340' + '3137cd84ae37534a');
      expect(writer.length).to.equal(32);
    });
  });

  describe('write(buffer, [start], [end])', function () {
    it('should write values', function () {
      writer.write(new Buffer('ab', 'ascii'));
      writer.write(new Buffer('c', 'ascii'));
      writer.write(new Buffer('def', 'ascii'));
      writer.write(new Buffer('12345', 'ascii'), 0, 2);
      writer.write(new Buffer('123456', 'ascii'), 4, 6);
      expect(writer.toBuffer().toString()).to.equal('abcdef1256');
      expect(writer.length).to.equal(10);
    });
  });

  describe('write(string, [length], [encoding])', function () {
    it('should write values', function () {
      writer.write('ab');
      writer.write('c');
      writer.write('def');
      writer.write('12345', 2);
      writer.write('123456', 2, 'hex');
      writer.write('abef', 'hex');
      expect(writer.toBuffer().toString('hex')).to.equal('61626364656631321234abef');
      expect(writer.length).to.equal(12);
    });
  });

  describe('fill(value, length)', function () {
    it('should fill with value', function () {
      writer.fill(0, 3);
      writer.fill(0x64, 4);
      writer.fill('Q', 2);
      expect(writer.toBuffer().toString('hex')).to.equal('000000' + '64646464' + '5151');
      expect(writer.length).to.equal(9);
    });
  });

  describe('copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd]', function () {
    it('should copy values', function () {
      writer.fill(7, 3);
      writer.writeUInt32BE(0x01020304);
      writer.write('hello');
      var buf = new Buffer(9);
      buf.fill(0);
      writer.copy(buf);
      expect(buf.toString('hex')).to.equal('070707' + '01020304' + '6865');
      buf.fill(0);
      writer.copy(buf, 3);
      expect(buf.toString('hex')).to.equal('000000' + '070707' + '010203');
      buf.fill(0);
      writer.copy(buf, 3, 6);
      expect(buf.toString('hex')).to.equal('000000' + '0468656c6c6f');
      buf.fill(0);
      writer.copy(buf, 3, 6, 8);
      expect(buf.toString('hex')).to.equal('000000' + '0468' + '00000000');
    });
  });

  it('all', function () {
    writer.write('a');
    writer.writeUInt64LE(0x001a1b1c1d1e1f10);
    writer.fill(0, 3);
    writer.writeUInt8(0x77);
    writer.write(new Buffer('00ffddbb', 'hex'), 1, 3);
    writer.writeUInt16BE(0xc8c7);
    writer.writeUInt32LE(0x0001f3f4);
    writer.write(new Buffer('0123456789abcdef', 'hex'), 2);
    writer.writeUInt32BE(0xf8f7f6f5);
    expect(writer.toBuffer().toString('hex')).to.equal('61' + '101f1e1d1c1b1a00' + '000000' + '77' + 'ffdd' + 'c8c7' + 'f4f30100' + '456789abcdef' + 'f8f7f6f5');
    expect(writer.length).to.equal(1 + 8 + 3 + 1 + 2 + 2 + 4 + 6 + 4);
  });

  it('should allow chaining', function () {
    writer
      .write('a')
      .fill(1, 3)
      .writeInt8(0x72);
    expect(writer.toBuffer().toString('hex')).to.equal('6101010172');
  });

  it('should allow non-new contruction', function () {
    var writer = Writer();
    writer.write('hello');
    expect(writer.toBuffer().toString()).to.equal('hello');
  });
});
