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
        '\t.bank 0',
        '\t.org $C000',
        'RESET:',
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

exports.vblankWait = function(n) {
    output = [
        ';CLRMEM',
        'vblankwait' + n + ':',
        '\tbit $2002',
        '\tbpl vblankwait' + n,
        '\n'
    ];
    return output.join('\n');
}

exports.palette = function() {
    output = [
        '\tlda $2002',
        '\tlda #$3F',
        '\tsta $2006',
        '\tlda #$00',
        '\tsta $2006',
        '\tldx #$00',
        'LoadPalettesLoop:',
        '\tlda PaletteData, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$20',
        '\tbne LoadPalettesLoop',
        '\n'
    ];
    return output.join('\n');
}

exports.loadSprites = function() {
    output = [
        'LoadSprites:',
        '\tldx #$00',
        'LoadSpritesLoop:',
        '\tlda sprites, x',
        '\tsta $0200, x',
        '\tinx',
        '\tcpx #$10',
        '\tbne LoadSpritesLoop',
        '\n'
    ];
    return output.join('\n');
}

exports.loadBGs = function() {
    output = [
        'LoadBackgrounds:',
        '\tlda $2002',
        '\tlda #$20',
        '\tsta $2006',
        '\tlda #$00',
        '\tsta $2006',
        '\tldx #$00',
        'LoadBackground1:',
        '\tlda background1, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground1',
        'LoadBackground2:',
        '\tlda background2, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground2',
        'LoadBackground3:',
        '\tlda background3, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground3',
        'LoadBackground4:',
        '\tlda background4, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground4',
        '\n'
    ];
    return output.join('\n');
}

exports.loadAttribute = function() {
    output = [
        'LoadAttribute:',
        '\tlda $2002',
        '\tlda #$23',
        '\tsta $2006',
        '\tlda #$C0',
        '\tsta $2006',
        '\tldx #$00',
        'LoadAttributeLoop:',
        '\tlda attribute, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$40',
        '\tbne LoadAttributeLoop',
        '\n'
    ];
    return output.join('\n');
}

exports.gameloop = function() {
    output = [
        '\tlda #%10010000',
        '\tsta $2000',
        '\tlda #%00011110',
        '\tsta $2001',
        'Forever:',
        '\tjmp Forever',
        'NMI:',
        '\tlda #$00',   //SetLowHighBytes
        '\tsta $2003',
        '\tlda #$02',   
        '\tsta $4014',
        '\tlda #$01',   //Joypad Init
        '\tsta $4016',
        '\tlda #$00',
        '\tsta $4016',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadA = function(){
    output = [
        'ReadA:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadADone',
        'ReadADone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadB = function(){
    output = [
        'ReadB:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadBDone',
        'ReadBDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadSel = function(){
    output = [
        'ReadSel:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadSelDone',
        'ReadSelDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadStart = function(){
    output = [
        'ReadStrt:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadStrtDone',
        'ReadStrtDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadStart = function(){
    output = [
        'ReadStrt:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadStrtDone',
        'ReadStrtDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadUp = function(){
    output = [
        'ReadUp:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadUpDone',
        '\tlda $0200',
        '\tsec',
        '\tsbc #$01',
        '\tsta $0200',
        '\tlda $0204',
        '\tsec',
        '\tsbc #$01',
        '\tsta $0204',
        '\tlda $0208',
        '\tsec',
        '\tsbc #$01',
        '\tsta $0208',
        '\tlda $020C',
        '\tsec',
        '\tsbc #$01',
        '\tsta $020C',
        'ReadUpDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadDown = function(){
    output = [
        'ReadDown:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadDownDone',
        '\tlda $0200',
        '\tclc',
        '\tadc #$01',
        '\tsta $0200',
        '\tlda $0204',
        '\tclc',
        '\tadc #$01',
        '\tsta $0204',
        '\tlda $0208',
        '\tclc',
        '\tadc #$01',
        '\tsta $0208',
        '\tlda $020C',
        '\tclc',
        '\tadc #$01',
        '\tsta $020C',
        'ReadDownDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadLeft = function(){
    output = [
        'ReadLeft:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadLeftDone',
        '\tlda $0203',
        '\tsec',
        '\tsbc #$01',
        '\tsta $0203',
        '\tlda $0207',
        '\tsec',
        '\tsbc #$01',
        '\tsta $0207',
        '\tlda $020B',
        '\tsec',
        '\tsbc #$01',
        '\tsta $020B',
        '\tlda $020F',
        '\tsec',
        '\tsbc #$01',
        '\tsta $020F',
        'ReadLeftDone:',
        '\n'
    ];
    return output.join('\n');
}

exports.gamepadReadRight = function(){
    output = [
        'ReadRight:',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq ReadRightDone',
        '\tlda $0203',
        '\tclc',
        '\tadc #$01',
        '\tsta $0203',
        '\tlda $0207',
        '\tclc',
        '\tadc #$01',
        '\tsta $0207',
        '\tlda $020B',
        '\tclc',
        '\tadc #$01',
        '\tsta $020B',
        '\tlda $020F',
        '\tclc',
        '\tadc #$01',
        '\tsta $020F',
        'ReadRightDone:',
        '\tlda #%10010000',
        '\tsta $2000',
        '\tlda #%00011110',
        '\tsta $2001',
        '\tlda #$00',
        '\tsta $2005',
        '\tsta $2005',
        '\n'
    ];
    return output.join('\n');
}

exports.enableBG = function () {
    var output = [
        '\tlda #%10010000',
        '\tsta $2000',
        '\tlda #%00011110',
        '\tsta $2001',
        '\tlda #$00',
        '\tsta $2005',
        '\tsta $2005',
        '\n'
    ]
    return output.join('\n');
}

exports.paletteData = function (obj) {
    var output = [
        'PaletteData:',
        '\t.db ' + obj.bg,
        '\t.db ' + obj.sprite,
        '\n'
    ]
    return output.join('\n');
}

exports.spriteData = function (a) {
    var output = [
        'sprites:'
    ]
    for (var x = 0; x < a.length; x++) {
        output.push('\t.db ' + a[x])
    }
    output.push('\n');
    return output.join('\n');
}

exports.setBG = function (bgObj) {
    var output = [
        'background1:',
        '\t.db '+ bgObj.slice(0,15).join('\n\t.db '),
        'background2:',
        '\t.db '+ bgObj.slice(16,31).join('\n\t.db '),
        'background3:',
        '\t.db '+ bgObj.slice(32,47).join('\n\t.db '),
        'background4:',
        '\t.db '+ bgObj.slice(48,63).join('\n\t.db '),
        '\n'
    ]
    return output.join('\n');
}

exports.setAttributeTable = function () {
    var output = [
        'attribute:',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\n'
    ]
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
        '\t.org $' + loc,
        '\t.incbin "' + chr + '"',
        '\n'
    ]
    return output.join('\n');
}

exports.vec = function () {
    var output = [
        '\t.dw NMI',
        '\t.dw RESET',
        '\t.dw 0',
        '\n'
    ]
    return output.join('\n');
}

exports.asm = function (s) {
    return s + '\n\n';
}

exports.compile = function (gameObj) {
    var output = "";
    for (i in gameObj) {
        var temp = gameObj[i].replace("\n", '\n');
        output = output + temp;
    } 
    fs.writeFileSync('output.s', output);
}