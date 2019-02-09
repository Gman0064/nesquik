function bank(n, loc, chr) {
    var output = [];
    output.push('\t.bank ' + n);
    output.push('\t.org ' + loc);
    output.push('\t.incbin "' + chr + '"');
    return output.join('\n');
}

module.exports = bank;