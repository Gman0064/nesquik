var fs = require('fs');

exports.header = function (prg, chr, map, mir) {
    var output = [
        ';HEADER',
        '\t.inesprg ' + prg, //Num of 16kb Prg banks
        '\t.ineschr ' + chr, //Num of 8kb Chr banks
        '\t.inesmap ' + map, //Type of NES mapper used
        '\t.inesmir ' + mir, //VRAM mirroring of banks
        '\n'
    ];
    return output.join('\n');
}

exports.reset = function () {
    var output = [
        ';RESET',
        '.bank 0, $C000, RESET:',
        '\tsei',
        '\tcld',
        '\tldx #$40',
        '\tstx $4017',
        '\tldx #$FF',
        '\ttxs',
        '\tinx',
        '\tstx $2000',
        '\tstx $2001',
        '\tstx $4010',
        '\n'
    ];
    return output.join('\n');
}

exports.clrmem = function() {
    output = [
        ';CLRMEM',
        'clrmem:',
        '\tlda #$00',
        '\tsta $0000, x',
        '\tsta $0100, x',
        '\tsta $0200, x',
        '\tsta $0400, x',
        '\tsta $0500, x',
        '\tsta $0600, x',
        '\tsta $0700, x',
        '\tlda #$FE',
        '\tsta $0300, x',
        '\tinx',
        '\tbne clrmem',
        '\n'
    ];
    return output.join('\n');
}

/**
 * @param {number} n, Bank Number
 * @param {number} loc, Address location in ROM
 * @param {string} chr, Character ROM Data
 * @description Add bank of number 'n' with location 'loc' and character data 'chr'.
 */
exports.bank = function (n, loc, chr) {
    var output = [
        ';BANK',
        '\t.bank ' + n,
        '\t.org ' + loc,
        '\t.incbin "' + chr + '"',
        '\n'
    ]
    return output.join('\n');
}

exports.compile = function (gameObj) {
    var output = "";
    for (i in gameObj) {
        var temp = gameObj[i].replace("\n", '\n');
        output = output + temp;
    } 
    fs.writeFileSync('output.s', output);
}