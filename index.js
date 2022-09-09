get = document.getElementById("fetch")
username = document.getElementById("username")
stats = document.getElementById("stats")
listing = document.getElementById("list")

get.onclick = () => {
    let value = username.value;
    username.disabled = true
    get.disabled = true

    stats.innerHTML = "Fetching your accomplishments..."

    xml = new XMLHttpRequest();
    xml.open("GET", "https://api.saltyfishstudios.net/v0/get_network_contributors/" + value)

    xml.onreadystatechange = () => {
        console.log("readystate " + xml.readyState)
        if (xml.readyState == 4) {
            console.log("readystate 4 correct")
            if (xml.status == 404) {
                console.log("return 404")
                stats.innerHTML = `We couldn't find a user with name ${value}. Please try again.`
                username.disabled = null
                get.disabled = null
            } else if (xml.status == 200) {
                console.log("return 200")
                points = 0
                data = JSON.parse(xml.responseText)
                maxresults = [2, 2, 5, 2, 5, 4]
                names = ["Hardware Contribution", "Software Contribution", "Server Planning", "Donation", "Map Creation", "Server Design"]

                for (i = 0; i < names.length; i ++) {
                    element = document.createElement("li")
                    element.innerHTML = names[i] + ": " + data[i] + "/" + maxresults[i] + " tokens."
                    listing.appendChild(element)

                    points += data[i]
                }

                nick = null
                if (points >= 0 && points <= 3) {
                    nick = null
                } else if (points >= 4 && points <= 6) {
                    nick = "[HELPER]"
                } else if (points >= 7 && points <= 10) {
                    nick = "[MODERATOR]"
                } else if (points >= 11 && points <= 15) {
                    nick = "[JR ADMIN]"
                } else if (points >= 16) {
                    nick = "[ADMIN]"
                }

                add = ""

                if (nick != null) {
                    add = " As a result, you are given a " + nick + " rank in the server."
                } else {
                    add = " You were not given any ranks with these token."
                }

                if (data[6].length > 0) {
                    add += " You are also associated with the following rank(s): " + data[6].join(", ")
                }

                stats.innerHTML = "We have found your result, in a total score of " + points + " tokens." + add
            }
        }
    }

    xml.send()
}