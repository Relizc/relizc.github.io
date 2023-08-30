let SEED = "d"
let LENGTH = 128
let SPACE = 0.7
let UPPERD = 0.5

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function ran(seed) {
    // Create cyrb128 state:
    var seed = cyrb128(seed);
    // Four 32-bit component hashes provide the seed for sfc32.
    var rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

    return rand()
}

function random() {
    return ran(SEED)
}

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

window.onload = () => {
    document.getElementById("seedinp").value = makeid(64)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function load() {
    document.getElementById("seedinp").value = makeid(64)
    SEED = document.getElementById("seedinp").value
    LENGTH = document.getElementById("leninp").valueAsNumber
    SPACE = document.getElementById("spaceinp").valueAsNumber
    UPPERD = document.getElementById("ldinp").valueAsNumber
}

function copy(e) {
    e.value = "Copied!"
    setTimeout(() => {
        e.value = "Copy"
    }, 1000)

    let cp = document.getElementById("content")

    cp.select();
    document.execCommand('copy');
}

function dinp(which) {
    if (which == 0) {
        document.getElementById("ldinp").value = 1 - document.getElementById("udinp").value
    } else {
        document.getElementById("udinp").value = 1 - document.getElementById("ldinp").value
    }
}

function erase(e) {
    e.value = "Cleared!"
    setTimeout(() => {
        e.value = "Clear"
    }, 1000)

    let cp = document.getElementById("content")
    cp.innerHTML = "";
}

function generate() {
    load()

    let cont = document.getElementById("content")

    if (Math.random() < UPPERD) {
        cont.innerHTML += "d"
    } else {
        cont.innerHTML += "D"
    } // First character must be D

    for (let i = 0; i < LENGTH; i ++) {
        
    
        if (Math.random() > SPACE) {
            if (Math.random() < UPPERD) {
                cont.innerHTML += "d"
            } else {
                cont.innerHTML += "D"
            }
        } else {
            cont.innerHTML += " "
        }
    }
}