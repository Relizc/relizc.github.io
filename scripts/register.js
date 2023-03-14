function getFile(filepath){
    fetch("/users.json").then(response => response.json()).then(data =>{
        return data;
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function loadVerifies() {
    document.getElementById("vfemail").onclick = () => {
        document.getElementById("log").innerHTML = `<p class="title">Register a Lost 'n Found Account!</p>
        <br>
        <p id="subtitle">Enter your verification email!<br>Sending the code might take some time.</p>
        <input class="login-input" id="email-enter" type="text">
        <br>
        <br>
        <button id="logger" class="login-button login-button-nosize">
            Send Verification Code
        </button>`
        document.getElementById("logger").onclick = () => {
            loadEmailVerify()
        }
    }
}

function finalverify() {
    document.getElementById("logger").innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i>`
    document.getElementById("logger").disabled = true;
    document.getElementById("email-code").disabled = true;
    document.getElementById("email-code").classList.remove("login-input-error")

    xml = new XMLHttpRequest()

    xml.onreadystatechange = () => {

        clearWhoops()

        if (xml.readyState != 4) return;

        d = JSON.parse(xml.response)

        if (xml.status != 200) {
            whoops("Failed to register!", "The verification code is not correct! Please check if you had typed the verification code correctly!")
            document.getElementById("email-code").classList.add("login-input-error")

            document.getElementById("logger").disabled = null;
            document.getElementById("email-code").disabled = null;
            document.getElementById("email-code").classList.add("login-input-error")

        } else {
            document.getElementById("log").innerHTML = `<p class="title">Register a Lost 'n Found Account!</p>
            <br>
            <br>
            <p id="subtitle">Thank you for joining us! You may now log into the Lost 'n Found Platform with your account!<br>Click <a href="/lnf/login">here</a> to login!</p>
            <br>
            <br>
            <br>`
        }
    }

    xml.open("POST", "https://us0.lnf.api.itsrelizc.net/api/verify/email/submit")

    xml.setRequestHeader("RS-Registering-Username", localStorage.getItem("registery-username"))
    xml.setRequestHeader("RS-Registering-Email", localStorage.getItem("registery-submitted-email"))
    xml.setRequestHeader("RS-Registering-Code", document.getElementById("email-code").value)

    xml.send()
}

function acquireLoginToken() {

    xml = new XMLHttpRequest()

    xml.onreadystatechange = () => {

        clearWhoops()

        if (xml.readyState != 4) return;

        d = JSON.parse(xml.response)

        if (xml.status != 200) {
            whoops("Failed to register!", "0xA03D7F15: Login Process Error. Please contact the server admins.")
            document.getElementById("email-code").classList.add("login-input-error")
        } else {
            xml.open("POST","https://lostnfoundapi.ericpooman.repl.co/api/login");

            xml.setRequestHeader("password", )

            xml.send(JSON.stringify({
                "username": localStorage.getItem("registery-username"),
            }))
        }
    }




    document.getElementById("email-code").disabled = null
    document.getElementById("logger").disabled = null;
    document.getElementById("logger").innerHTML = "Continue";
}

function loadEmailVerify(resend = false) {
    document.getElementById("logger").innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i>`
    document.getElementById("logger").disabled = true;
    if (!resend) {
        localStorage.setItem("registery-submitted-email", document.getElementById("email-enter").value)
        document.getElementById("email-enter").disabled = true;
        document.getElementById("email-enter").classList.remove("login-input-error")
    }

    xml = new XMLHttpRequest();

    xml.onreadystatechange = () => {

        clearWhoops()
        
        if (xml.readyState != 4) return;

        d = JSON.parse(xml.responseText)

        if (xml.status != 200) {
            whoops("Failed to register!", d.message)
            document.getElementById("email-enter").classList.add("login-input-error")
        } else {
            d = ""
            if (resend) d = " again"
            document.getElementById("log").innerHTML = `<p class="title">Register a Lost 'n Found Account!</p>
            <br>
            <p id="subtitle">We had just sent the code to your email${d}! Please enter it here.<br>If you could not find the verification code, check your junk mail or click <a href="javascript:void(0)" id="resend">here</a> to resend${d}!</p>
            <input class="login-input login-input-vf" id="email-code" type="text" maxlength="6">
            <br>
            <button id="logger" class="login-button">
                Continue
            </button>`
            document.getElementById("resend").onclick = () => {document.getElementById("resend").onclick = null; loadEmailVerify(true)}
            document.getElementById("logger").onclick = () => {finalverify()}
        }

        document.getElementById("logger").disabled = null;
        document.getElementById("logger").innerHTML = "Continue"
        if (!resend) document.getElementById("email-enter").disabled = null;
    }

    xml.open("POST", "https://us0.lnf.api.itsrelizc.net/api/verify/email")

    xml.setRequestHeader("RS-Registering-Username", localStorage.getItem("registery-username"))
    if (resend) {
        a = localStorage.getItem("registery-submitted-email")
    } else {
        a = document.getElementById("email-enter").value
    }
    xml.setRequestHeader("RS-Registering-Email", a)

    xml.send()
}



function buttonClicker(formtype) {
    
}



document.addEventListener("load", () => {
    CURRENT_LOCATION = "username"
    document.body.style = "background-image: url(\"/assets/wp" + getRandomInt(0, 2) + ".jpg\"); background-size: cover; background-repeat: no-repeat;"
    document.getElementById("logger").onclick = () => {
        document.getElementById("logger").innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i>`
        document.getElementById("logger").disabled = true;
        document.getElementById("username").disabled = true;
        document.getElementById("username").classList.remove("login-input-error")

        clearWhoops()

        xml = new XMLHttpRequest;
        

        if (CURRENT_LOCATION == "pswd") {
            xml.onreadystatechange = () =>{
                if (xml.readyState != 4) return;
    
                forceCloseWhoops()
    
                d = JSON.parse(xml.responseText)
    
                if (xml.status != 200) {
                    whoops("Failed to register!", d.message)
                    document.getElementById("username").classList.add("login-input-error")
                }
    
                if (xml.status == 200){
                    document.getElementById("subtitle").innerHTML = "Real account?<br>Select a verification method to check your account!"
                    CURRENT_LOCATION = "verify0"
                    document.getElementById("username").remove()
                    document.getElementById("log").innerHTML = `<p class="title">Register a Lost 'n Found Account!</p>
                    <br>
                    <p id="subtitle">Wait a min... Is your account real?<br>Please pick a verification method to verify your account!</p>
                    <br>
                    <br>
                    <button id="vfteams" class="login-button login-button-nosize">
                        Teams Message
                    </button>
                    <button id="vfemail" class="login-button login-button-nosize">
                        E-Mail
                    </button>`
                    loadVerifies()
                }

                document.getElementById("logger").innerHTML = `Continue`
                document.getElementById("logger").disabled = null;
                document.getElementById("username").disabled = null;
                
            }
            
            xml.open("POST","https://us0.lnf.api.itsrelizc.net/api/register/password");

            xml.setRequestHeader("RS-Registering-Username", localStorage.getItem("registery-username"))
            xml.setRequestHeader("RS-Registering-Password", document.getElementById("username").value)

            xml.send()
        } else if (CURRENT_LOCATION == "username") {
            xml.onreadystatechange = () =>{
                if (xml.readyState != 4) return;
    
                forceCloseWhoops()
    
                d = JSON.parse(xml.responseText)

                if (xml.status != 200) {
                    whoops("Failed to register!", d.message)
                    document.getElementById("username").classList.add("login-input-error")
                }
    
                if (xml.status == 200){
                    CURRENT_LOCATION = "pswd"
                    localStorage.setItem("registery-username", document.getElementById("username").value)
                    document.getElementById("subtitle").innerHTML = "Hello, <strong>" + document.getElementById("username").value + "</strong>!<br>You should probably set yourself a safe password."
                    document.getElementById("username").value = "";
                    document.getElementById("username").type = "password";
                }
    
                document.getElementById("logger").innerHTML = `Continue`
                document.getElementById("logger").disabled = null;
                document.getElementById("username").disabled = null;
            }

            xml.open("POST","https://us0.lnf.api.itsrelizc.net/api/register/username");

            xml.setRequestHeader("RS-Registering-Username", document.getElementById("username").value)

            xml.send()
        }
    }

    document.getElementById("username").oninput = () => {
        document.getElementById("username").classList.remove("login-input-error")
    }

    console.log(this)
}, true)