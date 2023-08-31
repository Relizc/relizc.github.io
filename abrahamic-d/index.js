let SEED = "d"
let LENGTH = 128
let SPACE = 0.7
let UPPERD = 0.5
let SPACING = [false, 0.001]

let DATA_114514 = [true, true, 0.1]
let ADD_E = [true, 0.08]
let DATA_SLASH = [true, 0.03]

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

    DATA_114514 = [
        document.getElementById("enb114").checked,
        document.getElementById("enb114star").checked,
        document.getElementById("114prob").valueAsNumber
    ]

    SPACING[1] = document.getElementById("dsprob").valueAsNumber

    ADD_E[1] = document.getElementById("esprob").valueAsNumber

    DATA_SLASH[1] = document.getElementById("slprob").valueAsNumber
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

function enb114(e) {
    if (e.checked) {
        document.getElementById("enb114star").disabled = null
        document.getElementById("114prob").disabled = null
    } else {
        document.getElementById("enb114star").disabled = !e.checked
        document.getElementById("114prob").disabled = !e.checked
    }
}

function enbds(e) {
    SPACING[0] = e.checked
    if (SPACING[0]) {
        document.getElementById("dsprob").disabled = null;
    } else {
        document.getElementById("dsprob").disabled = true;
    }
}

function enbes(e) {
    ADD_E[0] = e.checked
    if (ADD_E[0]) {
        document.getElementById("esprob").disabled = null;
    } else {
        document.getElementById("esprob").disabled = true;
    }
}

function enbsl(e) {
    DATA_SLASH[0] = e.checked
    if (DATA_SLASH[0]) {
        document.getElementById("slprob").disabled = null;
    } else {
        document.getElementById("slprob").disabled = true;
    }
}

function generate() {
    load()

    let cont = document.getElementById("content")

    for (let i = 0; i < LENGTH; i ++) {
        
    
        if (Math.random() > SPACE) {
            if (Math.random() < UPPERD) {
                cont.innerHTML += "d"
            } else {
                cont.innerHTML += "D"
            }

            if (ADD_E[0] && Math.random() < ADD_E[1]) {
                cont.innerHTML += "e"
            }
        } else {
            cont.innerHTML += " "
        }

        if (DATA_114514[0]) {
            if (Math.random() < DATA_114514[2]) {
                if (DATA_114514[1]) cont.innerHTML += "*114514*"
                else cont.innerHTML += "114514"
            }
        }

        if (DATA_SLASH[0]) {
            if (Math.random() < DATA_SLASH[1]) {
                cont.innerHTML += "/"
            }
        }

        if (SPACING[0]) {
            if (Math.random() < SPACING[1]) {
                for (let x = 0; x < (getRandomInt(16) + 32); x ++) {
                    cont.innerHTML += " "
                }
            }
        }
    }
}