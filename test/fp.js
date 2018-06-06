var {
  compose, curry,
  either,
  inCaseOfEqual, inCaseOfNull, inCaseOfClass, inCaseOfNumber, inCaseOfObject, inCaseOfArray,
  otherwise,
} = require('../src/fp');

describe('Fp', function () {
  it('compose', function () {
			compose((x)=>x-8, (x)=>x+10, (x)=>x*10)(4).should.equal(42)
			compose((x)=>x+2, (x,y)=>x*y)(4,10).should.equal(42)
	});
  it('curry', function () {
			curry((x, y, z) => x + y + z)(1,2,3).should.equal(6)
			curry((x, y, z) => x + y + z)(1)(2,3).should.equal(6)
			curry((x, y, z) => x + y + z)(1,2)(3).should.equal(6)
			curry((x, y, z) => x + y + z)(1)(2)(3).should.equal(6)
	});
  it('inCaseOfObject', function () {
      either({}, inCaseOfObject((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal("{}");
      either([], inCaseOfObject((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal(false);
      either(null, inCaseOfObject((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal(false);
      either(undefined, inCaseOfObject((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal(false);
      either('', inCaseOfObject((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal(false);
      either(0, inCaseOfObject((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal(false);
	});
  it('inCaseOfNull', function () {
      either(null, inCaseOfNull((x)=>true), otherwise((x)=>false)).should.equal(true);
      either(undefined, inCaseOfNull((x)=>true), otherwise((x)=>false)).should.equal(true);
      either('', inCaseOfNull((x)=>true), otherwise((x)=>false)).should.equal(false);
      either(0, inCaseOfNull((x)=>true), otherwise((x)=>false)).should.equal(false);
	});
  it('inCaseOfArray', function () {
      either([], inCaseOfArray((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal("[]");
      either({}, inCaseOfArray((x)=>JSON.stringify(x)), otherwise((x)=>false)).should.equal(false);
	});
  it('inCaseOfClass', function () {
      either(new Number(1), inCaseOfClass(Number, (x)=>x+1), otherwise((x)=>x+2)).should.equal(2);
      either(new String("1"), inCaseOfClass(String, (x)=>x), otherwise((x)=>false)).should.equal("1");

      either(new String("1"), inCaseOfClass(Number, (x)=>x), otherwise((x)=>false)).should.equal(false);
      either(new Number(1), inCaseOfClass(String, (x)=>x+1), otherwise((x)=>false)).should.equal(false);
	});
  it('inCaseOfNumber', function () {
      either(new Number(1), inCaseOfNumber((x)=>x+1), otherwise((x)=>x+2)).should.equal(2);
      either(1, inCaseOfNumber((x)=>x+1), otherwise((x)=>x+2)).should.equal(2);
      either("1", inCaseOfNumber((x)=>x+1), otherwise((x)=>x+2)).should.equal(2);
      either('', inCaseOfNumber((x)=>x+1), otherwise((x)=>3)).should.equal(3);
	});
  it('otherwise', function () {
      var err = undefined;

      err = undefined;
			either(1, inCaseOfEqual(1, (x)=>x+1)).should.equal(2);
      (err === undefined).should.equal(true);

      err = undefined;
			try {
        either(1, inCaseOfEqual(2, (x)=>x+1));
      } catch (e) {
        err = e;
      }
      (err === undefined).should.equal(false);

      err = undefined;
			try {
        either(1, inCaseOfEqual(2, (x)=>x+1), otherwise((x)=>x+2)).should.equal(3);
      } catch (e) {
        err = e;
        console.log(e);
      }
      (err === undefined).should.equal(true);
	});
})
