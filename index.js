var nesquik = require('./lib/nesquik.js');

var MyGame = {
    header: ""
};

MyGame.header = nesquik.header(1,1,1,0);
MyGame.reset = nesquik.reset();
MyGame.clrMem = nesquik.clrmem();

console.log(MyGame);

nesquik.compile(MyGame);