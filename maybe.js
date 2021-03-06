class MaybeDef {
  constructor(ref) {
    this.ref = ref;
  }

  isNull() {
    return this.ref === undefined || this.ref === null;
  }
  isPresent() {
    return ! this.isNull();
  }

  or(ref) {
    return this.isPresent() ? this : new MaybeDef(ref);
  }
  letDo(fn) {
    if (this.isPresent()) {
      fn();
    }
  }

  then(fn) {
    return new MaybeDef(fn(this.ref));
  }
  bind(fn) {
    return this.then(fn);
  }
  map(fn) {
    return this.then(fn);
  }
  flatMap(fn) {
    return fn(this.unwrap());
  }
  of(ref) {
    var m = new MaybeDef(ref);
    return m;
  }
  just(ref) {
    return this.of(ref);
  }
  ap(fnM) {
    return fnM.chain(f => this.map(f));
  }
  chain(fn) {
    return this.flatMap(fn);
  }
  chainRec (f, i) {
    let result;
    let x = i;
    do {
      result = f((x) => {return {value: x, done: false}}, (x) => {return {value: x, done: true}}, x).unwrap();
      x = result.value;
    } while (!result.done);
    return this.of(result.value);
  }
  equals(m) {
    return m instanceof MaybeDef && m.unwrap() === this.ref;
  }

  unwrap() {
    return this.ref;
  }
}

var Maybe = new MaybeDef({});

module.exports = Maybe;
