/*
interpretador brainfuck para ser executado em um ambiente node.js
- desenvolvido por w4li
- github:https://github.com/w4li
*/

const {readFile} = require("fs")

let np = process.argv[2]

function interpretar(programa) {
  let tape       = Array(100).fill(0);
  let ptr        = 0;
  let isLooping  = false;
  let loopStack  = [];
  let innerLoops = 0;

  for( i = 0; i < programa.length; i++ ) {

  const char = programa[i];

    if(isLooping) {
      if(char === "[") innerLoops++;
        if(char === "]") {
          if(innerLoops === 0) isLooping = false;
          else innerLoops--;
        }
      continue;
    }

    switch(char){
      case '+':
        tape[ptr]++;
        break;
      case '-':
        tape[ptr]--;
        break;
      case ',':
        tape[ptr] = prompt()[0].charCodeAt()
        break;
      case '.':
        console.log(String.fromCharCode(tape[ptr]));
        break;
      case '>':
        ptr++;
        tape[ptr] = tape[ptr] || 0;
        break;
      case '<':
        ptr--;
        tape[ptr] = tape[ptr] || 0;
        break;
      case '[':
        tape[ptr] === 0
          ? isLooping = true
          : loopStack.push(i);
        break;
      case ']':
        tape[ptr] !== 0
          ? i = loopStack[loopStack.length-1]
          : loopStack.pop();
        break;
      default:
        break;
      }
    }
}

readFile(np,"utf-8", function(err, data){
    if(err) throw err;
    let codigo = data;
    console.log(interpretar(codigo));
})
