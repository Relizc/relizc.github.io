
let state = [0, 0]; // 0: Team A, 1: Team B; 0; Ban Action, 1: Pick Action
let picked = false;
let r = 0;

const options = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1]
]

const teammates = [
    ["D", "A"],
    ["E", "L"]
]

let t1 = []
let t2 = []

let t = document.getElementById("tmsg")
let bb = document.getElementById("select")
let timer = document.getElementById("timeleft")
let q = document.getElementById("msg")

let f = document.getElementById("p1");
let g = document.getElementById("p2");

let n = document.getElementById("drop");

let sb = document.getElementById("event")

var time = 15;

Object.defineProperty(window, 'skip', {
    get: function() {
        console.log("Skipped process!")

        time = 1

        return null
    }
})

function timertick() {
    setTimeout(() => {
        time --;

        timer.innerHTML = time;

        if (time == 0) {
            if (!picked) q.innerHTML = d(0) + " did not pick a character"
            if (state[1] == 0) {
                if (!picked) q.innerHTML = d(0) + " did not pick a character to ban"
            }
            if (!picked) nooption(state[0], state[1])
            picked = true;

            n.disabled = true;
            

            timer.classList.add("done")

            for (let i of bb.children) {
                i.classList.remove("ok")
                i.classList.add("notok")
            }

            setTimeout(() => {
                changestate()
                newround()
            }, 3000);

            return;
        }

        timertick();
    }, 1000);
}

function p() {
    if (n.value == "p1") return f.innerHTML.split(" ")[2]
    return g.innerHTML.split(" ")[2]
}

function d(n) {
    if (state[0] == n) return "Team A"
    return "Team B"
}

function ban(side, src, who) {

    let f = ["t2", "t1"][side]

    if (side == 0) {
        t2.push({action: 0, item: src, who: who})
    } else {
        t1.push({action: 0, item: src, who: who})
    }

    for (let el of document.getElementById(f).children) {
        if (el.tagName == "IMG" && el.src == "" && !el.classList.contains("gg")) {
            el.src = src
            return;
        }
    }
}

function done() {
    document.getElementById("ffs").classList.remove("hide")
    document.body.classList.add("finish")

    let data = [null, null, null, null]

    for (let i of t1) {
        if (i.action == 1) {
            if (i.who == "D") {
                data[0] = i.item
            } else {
                data[1] = i.item
            }
        }
    }

    for (let i of t2) {
        if (i.action == 1) {
            if (i.who == "E") {
                data[2] = i.item
            } else {
                data[3] = i.item
            }
        }
    }

    document.getElementById("t1s").innerHTML += "D can only use " + data[0].split("/").slice(-1)[0].split(".")[0] + "<br>"
    document.getElementById("t1s").innerHTML += "A can only use " + data[1].split("/").slice(-1)[0].split(".")[0] + "<br>"

    document.getElementById("t2s").innerHTML += "E can only use " + data[2].split("/").slice(-1)[0].split(".")[0] + "<br>"
    document.getElementById("t2s").innerHTML += "L can only use " + data[3].split("/").slice(-1)[0].split(".")[0] + "<br>"
}

function nooption(side, option) {
    let k = ["t1", "t2"]
    if (option == 0) k = ["t2", "t1"]
    let f = k[side]

    if (option == 0) {
        for (let el of document.getElementById(f).children) {
            if (el.tagName == "IMG" && el.src == "" && !el.classList.contains("gg")) {
                el.src = "None.gif"
                return;
            }
        }

        return;
    }

    for (let el of document.getElementById(f).children) {
        if (el.tagName == "IMG" && el.src == "" && el.classList.contains("gg")) {
            el.src = "None.gif"
            return;
        }
    }
}

function pick(side, src, who) {
    let f = ["t1", "t2"][side]

    if (side == 0) {
        t1.push({action: 1, item: src, who: who})
    } else {
        t2.push({action: 1, item: src, who: who})
    }

    for (let el of document.getElementById(f).children) {
        if (el.tagName == "IMG" && el.src == "" && el.classList.contains("gg")) {
            el.src = src
            return;
        }
    }
}

function change(cur) {
    let f = n.children[cur.value.at(1) - 1].innerHTML.split(" ")[2]

    let r = [t1, t2];
    if (state[1] == 0) r = [t2, t1]

    console.log(r)

    if (state[0] == 0) {
        for (let i of r[0]) {
            if (i.action == state[1] && i.who == f) {
                for (let el of bb.children) {
                    if (el.src == i.item) {
                        el.classList.add("banned")
                    }
                }
            }
        }
    } else {
        for (let i of r[1]) {
            if (i.action == state[1] && i.who == f) {
                for (let el of bb.children) {
                    if (el.src == i.item) {
                        el.classList.add("banned")
                    }
                }
            }
        }
    }


}

function action(e) {

    n.disabled = true;

    if (picked) {
        return;
    }

    picked= true;

    e.classList.add("banned")

    if (state[1] == 0) ban(state[0], e.src, p())
    else pick(state[0], e.src, p())

    for (let i of bb.children) {
        i.classList.remove("ok")
        i.classList.add("notok")
    }



    q.innerHTML = e.src.split("/").slice(-1)[0].split(".")[0] + " is banned for " + p()
}

function changestate() {
    sb.children[r].classList.remove("y")
    r ++;
    sb.children[r].classList.add("y")
    state = options[r];
}

function newround() {

    

    timer.classList.remove("done")
    for (let i of bb.children) {
        i.classList.remove("notok")
        i.classList.add("ok")
        i.classList.remove("banned")
    }

    time = 15;
    timer.innerHTML = time;
    picked = false;
    if (state[1] == 0) {
        q.innerHTML = d(0) + " select a character to ban and who to ban for"
    } else {
        q.innerHTML = d(0) + " select a character to pick and who to pick for"
    }
    n.disabled = null;

    change(n)

    timertick()

    t.innerHTML = "Pick Action (" + d(0) + "'s choice)"
    if (state[1] == 0) {
        t.innerHTML = "Ban Action (" + d(0) + "'s choice)"
    }

    if (state[1] == 0) {
        f.innerHTML = "BAN FOR D"
        g.innerHTML = "BAN FOR A"
        if (state[0] == 0) {
            f.innerHTML = "BAN FOR E"
            g.innerHTML = "BAN FOR L"
        }
    } else {
        f.innerHTML = "PICK FOR E"
        g.innerHTML = "PICK FOR L"
        if (state[0] == 0) {
            f.innerHTML = "PICK FOR D"
            g.innerHTML = "PICK FOR A"
        }
    }
}

newround()