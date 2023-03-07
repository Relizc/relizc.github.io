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