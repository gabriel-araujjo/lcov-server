class Lazy {
    constructor(iterable, callback) {
        this.iter = iterable[Symbol.iterator]()
        this.cb = callback;
        this[Symbol.iterator] = () => this
    }
    
    filter(cb) { return new LazyFilter(this, cb) }
    map(cb) { return new LazyMap(this, cb) }
    next() { return this.iter.next() }
    take(n) {
        const values = [];
        while (n--) {
            const item = this.next()
            if (item.done) break;
            values.push(item.value)
        }
        return values;
    }
    collect() {return [...this]}
}

class LazyFilter extends Lazy {
    next() {
        while(true) {
            const item = this.iter.next()
            if(this.cb(item.value)) return item
        }
    }
}

class LazyMap extends Lazy {
    next() {
        const item = this.iter.next()
        if (!item.done) item.value = this.cb(item.value)
        return item
    }
}

function lazy(a) {return new Lazy(a)}
