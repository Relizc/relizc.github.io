document.addEventListener("load", (el) => {
    let e = document.getElementById("account")
    let ok = false;
    if (localStorage.getItem("token") != null) {
        if (localStorage.getItem("expires") >= getUTC()) {
            let x = JSON.parse(localStorage.getItem("basic-profile-data")).given
            e.innerHTML = `<i class="fa-solid fa-user"></i>
            <p>Welcome, ${x}!</p>`
            ok = true;
        }
    } 
    if (!ok) {
        e.innerHTML = `<i class="fa-solid fa-user-xmark"></i>
            <p>Log In or Register</p>`
    }
    console.log(this)
}, true) 

function getUTC() {
    return new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);
}

function whoops(msg = "We got a problem here!", message = "Sorry, this page encountered an error!") {
    document.body.insertAdjacentHTML("afterbegin", `<div id="whoops" class="whoops whoops-open">
    <i class="whoops-icon fa-solid fa-triangle-exclamation"></i>    
    <div class="msgarea">
        <p class="title">${msg}</p>
        <p>${message}</p>
    </div>
    <a class="closemsg" id="closemsg"><i class="fa-solid fa-xmark"></i></a>
    
</div>`)
    document.getElementById("closemsg").onclick = () => {
        document.getElementById("whoops").className = "whoops whoops-close"
        setTimeout(() => {
            document.getElementById("whoops").remove()
        }, 1000)
    }
}

function clearWhoops() {
    if (document.getElementById("whoops") == null) return;
    document.getElementById("whoops").className = "whoops whoops-quickclose"
        setTimeout(() => {
            document.getElementById("whoops").remove()
    }, 250)
}

function forceCloseWhoops() {
    if (document.getElementById("whoops") == null) return;
    document.getElementById("whoops").remove()
}