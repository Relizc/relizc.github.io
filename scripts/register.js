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
                    return
                }
    
                if (xml.status == 200){
                    localStorage.setItem("basic-profile-data", JSON.stringify(d.data))
                    document.getElementById("subtitle").innerHTML = "Welcome back, <strong>" + d.data.given + "</strong>!<br>Enter your password to continue."
                    CURRENT_LOCATION = document.getElementById("username").value
                    document.getElementById("username").value = "";
                    document.getElementById("username").type = "password";
                }
    
                document.getElementById("logger").innerHTML = `Continue`
                document.getElementById("logger").disabled = null;
                document.getElementById("username").disabled = null;
                
            }
            
            xml.open("POST","https://lostnfoundapi.ericpooman.repl.co/api/preview-info");

            xml.send(JSON.stringify({
                "username": document.getElementById("username").value
            }))
        } else if (CURRENT_LOCATION == "username") {
            xml.onreadystatechange = () =>{
                if (xml.readyState != 4) return;
    
                forceCloseWhoops()
    
                d = JSON.parse(xml.responseText)

                if (xml.status != 200) {
                    whoops("Failed to register!", d.message)
                    document.getElementById("username").classList.add("login-input-error")
                    return
                }
    
                if (xml.status == 200){
                    localStorage.setItem("expire", d.expires)
                    localStorage.setItem("token", d.token)
                    CURRENT_LOCATION = "done"
                    window.location.href = "/"
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