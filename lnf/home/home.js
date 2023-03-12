let hr = new Date().getHours()
let r = JSON.parse(localStorage.getItem("basic-profile-data"))

if (r == null) r = {given: null}
let q = r.given
if (q == null) q = "Stranger"

if (hr >= 0 && hr < 8) {
    document.getElementById("greet").innerHTML = `Greetings, ${q}! It's so early!`
} else if (hr >= 8 && hr < 10) {
    document.getElementById("greet").innerHTML = `Good Morning, ${q}!`
} else if (hr >= 10 && hr < 12) {
    document.getElementById("greet").innerHTML = `Have a nice lunch ${q}!`
} else if (hr >= 12 && hr < 6) {
    document.getElementById("greet").innerHTML = `Good Afternoon, ${q}!`
} else if (hr >= 6 && hr < 10) {
    document.getElementById("greet").innerHTML = `Good Evening, ${q}!`
} else {
    document.getElementById("greet").innerHTML = `Good Night, ${q}!`
}

function ge(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

COL = [
    "<em>\"Life is like a box of chocolates. You never know what you're going to get\" -Forrest Gump</em>",
    "Feeling Lucky Today?",
    "We've got fresh things for you! ✨",
    "<em>I could have wrote this in UTF-8</em>",
    "<strong>Fun fact:</strong> It is currently " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
    "<a href=\"https://moodle.basischina.com:8090/\">Moodle Time</a>",
    "Whhaaatss goin<a href=\"https://www.youtube.com/watch?v=ZZ5LpwO-An4\">'</a> on?",
    "Sometimes, we just need more inspiration to make some wonderful quotes."
]

document.getElementById("greet2").innerHTML = COL[ge(0, COL.length)]