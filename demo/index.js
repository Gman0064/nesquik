var nesquik = require('./lib/nesquik.js');
var maps = require('./maps.json');

var gamePalette = {
    bg: "$22,$29,$1A,$0F,$22,$36,$17,$0F,$22,$30,$21,$0F,$22,$27,$17,$0F",
    sprite: "$0F,$16,$27,$18,$22,$02,$38,$3C,$22,$1C,$15,$14,$22,$02,$38,$3C"
};

var playerSprite = [
    "$80, 118, $0, $80",
    "$80, 119, $0, $88",
    "$88, 120, $0, $80",
    "$88, 121, $0, $88",
];

console.log(maps.main)

var MyGame = {

    header: nesquik.header(1,1,0,1),
    reset: nesquik.reset(),
    vblwait1: nesquik.vblankWait(1),
    clrMem: nesquik.clrmem(),
    vblwait2: nesquik.vblankWait(2),

    palette: nesquik.palette(),
    loadSps: nesquik.loadSprites(),
    loadBgs: nesquik.loadBGs(),
    attributes: nesquik.loadAttribute(),
    
    gameloop: nesquik.gameloop(),

    joypadA: nesquik.gamepadReadA(),
    joypadB: nesquik.gamepadReadB(),
    joypadSel: nesquik.gamepadReadSel(),
    joypadStart: nesquik.gamepadReadStart(),

    joypadUp: nesquik.gamepadReadUp(),
    joypadDown: nesquik.gamepadReadDown(),
    joypadLeft: nesquik.gamepadReadLeft(),
    joypadRight: nesquik.gamepadReadRight(),

    rtiBank: nesquik.asm('\trti\n\t.bank 1\n\t.org $E000'),

    paletteData: nesquik.paletteData(gamePalette),
    spriteData: nesquik.spriteData(playerSprite),

    bgData: nesquik.setBG(maps.main),

    attribTable: nesquik.setAttributeTable(),
    FFFA: nesquik.asm('\t.org $FFFA'),
    vec: nesquik.vec(),

    chrBank: nesquik.bank(2, '0000', 'mario.chr')
};

console.log(MyGame);

nesquik.compile(MyGame);