const lno_symbol = Symbol('lno')
const hit_symbol = Symbol('hit')
const bct_symbol = Symbol('bct')
const bex_symbol = Symbol('bex')
const sln_symbol = Symbol('sln')
const eln_symbol = Symbol('eln')
const fna_symbol = Symbol('fna')

class Line {

    constructor(source) { Object.assign(this, source) }

    get hit() { return this[hit_symbol] || 0 }
    set hit(hits) { this[hit_symbol] = Number(hits) }

    get lno() { return typeof this[lno_symbol] === 'number' ? this[lno_symbol] : null }
    set lno(line) { this[lno_symbol] = line - 1 }

    get bct() { return this[bct_symbol] || 1 }
    set bct(count) { this[bct_symbol] = count || 1 }

    get bex() { return this[bex_symbol] || Number(this.hit > 0) }
    set bex(executed) { this[bex_symbol] = executed }

    addExecutedBranch() {
        this[bct_symbol] = (this[bct_symbol] || 0) + 1
        this[bex_symbol] = (this[bex_symbol] || 0) + 1
    }

    addSkippedBranch() {
        this[bct_symbol] = (this[bct_symbol] || 0) + 1
    }

    addBranch(executed) {
        if (Number(executed)) this.addExecutedBranch()
        else this.addSkippedBranch()
    }

    toJSON() { return [this.lno, this.hit, this.bct, this.bex] }
}

class Func {

    constructor(source) { Object.assign(this, source) }

    get hit() { return this[hit_symbol] || 0 }
    set hit(hits) { this[hit_symbol] = Number(hits) }

    get sln() { return typeof this[sln_symbol] === 'number' ? this[sln_symbol] : null }
    set sln(line) { this[sln_symbol] = line - 1 }

    get eln() { return typeof this[eln_symbol] === 'number' ? this[eln_symbol] : null }
    set eln(line) { this[eln_symbol] = line - 1 }

    get fna() { return this[fna_symbol] || null }
    set fna(name) { this[fna_symbol] = name.trim() }

    get bct() { return this[bct_symbol] || 1 }
    set bct(count) { this[bct_symbol] = Number(count) }

    get bex() { return this[bex_symbol] || Number(this.hit > 1) }
    set bex(executed) { this[bex_symbol] = Number(executed) }

    toJSON() {
        return [this.sln, this.eln, this.fna, this.hit, this.bct, this.bex]
    }
}

function objectFillingWith(stuff) {
    return new Proxy({}, {
        get: function(o, prop) {
            if (!(prop in o)) { o[prop] = new stuff }
            return o[prop]
        }
    })
}

module.exports = {Func, Line, objectFillingWith}
