var Maybe = require('../maybe');

describe('Maybe', function () {
  it('New', function () {
			var m = Maybe.just(1);
	});
  it('map', function () {
			var m = Maybe.just(1).map((a)=>a+2).map((a)=>a+3);
      m.unwrap().should.equal(6)
	});
  it('isPresent', function () {
			var m;

      m = Maybe.just(1);
      m.isPresent().should.equal(true)
      m.isNull().should.equal(false)
      m = Maybe.just(null);
      m.isPresent().should.equal(false)
      m.isNull().should.equal(true)
      m = Maybe.just(undefined);
      m.isPresent().should.equal(false)
      m.isNull().should.equal(true)
	});
  it('or', function () {
			var m;

      m = Maybe.just(1);
      m.or(3).unwrap().should.equal(1)
      m.or(4).unwrap().should.equal(1)
      m = Maybe.just(null);
      m.or(3).unwrap().should.equal(3)
      m.or(4).unwrap().should.equal(4)
      m = Maybe.just(undefined);
      m.or(3).unwrap().should.equal(3)
      m.or(4).unwrap().should.equal(4)
	});
  it('letDo', function () {
			var m;
      var v;

      m = Maybe.just(1);
      v = 0;
      m.letDo(function () {
        v = 1;
      });
      v.should.equal(1)
      m = Maybe.just(null);
      v = 0;
      m.letDo(function () {
        v = 1;
      });
      v.should.equal(0)
      m = Maybe.just(undefined);
      v = 0;
      m.letDo(function () {
        v = 1;
      });
      v.should.equal(0)
	});
  it('map', function () {
			var m;

      m = Maybe.just(1).map((x)=>x+2).map((x)=>x+3);
      m.unwrap().should.equal(6);
	});
})