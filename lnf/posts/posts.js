window.onload = () =>{

    e = document.getElementById("posts")

    load = document.createElement("p");
    load.innerHTML = "Loading posts, please wait...";

    e.appendChild(load);
    xml = new XMLHttpRequest;
    xml.onreadystatechange = () =>{
        d = JSON.parse(xml.responseText);

        if (xml.readyState != 4) return;


        if(xml.status == 500){
            whoops("Unable to load posts!", d.message);
            // setTimeout(() => {window.location.href = "/lnf/login";}, 1000)

        } else if (xml.status == 200){
            //return

            orders = d["posts"];
            posts = document.getElementById("posts");
            if(orders.length == 0){
                load.innerHTML = "No posts!";
                return;
            }
            load.remove();
            
            for(i = 0; i < Math.max(Math.floor(orders.length / 2), Math.floor(orders.length / 2) * 2); i += 2){
                console.log(orders[i], orders[i + 1])

                let firstWdth = Math.floor(Math.random() * 25) + 10;
                let scndwdth = 40 - firstWdth;

                let title1 = orders[i]["title"]

                let difftime1 = getUTC() - orders[i]["strtime"]
                var d1 = Math.floor(difftime1 / (3600*24));
                var h1 = Math.floor(difftime1 % (3600*24) / 3600);
                var m1 = Math.floor(difftime1 % 3600 / 60);
                let q1 = ""
                if (m1 != 0 && h1 == 0 && d1 == 0) q1 = "Just Now"
                else if (h1 != 0 && d1 == 0) q1 = `${h1} Hour${h1 > 1 ? 's' : ''} Ago`
                else if (d1 <= 7) q1 = `${d1} Day${d1 > 1 ? 's' : ''} Ago`
                else q1 = new Date(orders[i]["strtime"]).toISOString().split("T")[0];

                let difftime2 = getUTC() - orders[i + 1]["strtime"]
                var d2 = Math.floor(difftime2 / (3600*24));
                var h2 = Math.floor(difftime2 % (3600*24) / 3600);
                var m2 = Math.floor(difftime2 % 3600 / 60);
                let q2 = ""
                if (m2 != 0 && h2 == 0 && d2 == 0) q2 = "Just Now"
                else if (h2 != 0 && d2 == 0) q2 = `${h2} Hour${h2 > 1 ? 's' : ''} Ago`
                else if (d2 <= 7) q2 = `${d2} Day${d2 > 1 ? 's' : ''} Ago`
                else q2 = new Date(orders[i + 1]["strtime"] * 1000).toISOString().split("T")[0];   

                console.log(difftime1, d1, h1, m1, q1, difftime2, d2, h2, m2, q2)

                document.getElementById("posts").insertAdjacentHTML("beforeend",`
                <div class="postgroup" id="postgroup@${orders[i].id}#${orders[i + 1].id}">
                    <div style="width: ${firstWdth}vw;" id="order@${orders[i]["id"]}" class="order" onmouseover = "renderPreview(${orders[i]["id"]}">
                        <h2> ${title1}</h3>
                        <div class="userhandler">
                            <div class="avatar" style="background-image: url('https://us0.lnf.api.itsrelizc.net/api/avatar/${orders[i]["poster"]["user"]}');"></div>
                            <p>${orders[i]["poster"]["display"]} <b>&centerdot;</b> ${q1}</p>
                        </div>
                        <img class="postimg" src="https://us0.lnf.api.itsrelizc.net/api/getImage/${orders[i]["id"]}">
                        <div class="cont">${orders[i]["content"]}</div>
                    </div>
                    <div style="width: ${scndwdth}vw;" id="order@${orders[i + 1]["id"]}" class="order" onmouseover = "renderPreview(${orders[i + 1]["id"]}">
                        <h2> ${orders[i + 1]["title"]}</h3>
                        <div class="userhandler">
                            <div class="avatar" style="background-image: url('https://us0.lnf.api.itsrelizc.net/api/avatar/${orders[i + 1]["poster"]["user"]}');"></div>
                            <p>${orders[i + 1]["poster"]["display"]} <b>&centerdot;</b> ${q2}</p>
                        </div>
                        <img class="postimg" src="https://us0.lnf.api.itsrelizc.net/api/getImage/${orders[i + 1]["id"]}">
                        <div class="cont">${orders[i + 1]["content"]}</div>
                    </div>
                </div>
                `)

                

                document.getElementById(`order@${orders[i].id}`).setAttribute("onclick", `a('${btoa(orders[i].id)}')`)
                document.getElementById(`order@${orders[i + 1].id}`).setAttribute("onclick", `a('${btoa(orders[i + 1].id)}')`)
            }
        }
    }
    xml.open("POST","https://us0.lnf.api.itsrelizc.net/api/auth",);
    xml.setRequestHeader("authorization",localStorage.getItem("token"))
    xml.send();
}
function renderPreview(id){
    console.log("HOVERED")
}

function a(q) {window.location.href = "/lnf/posts/viewpost?id=" + q}

document.getElementById("avatar").style = "background-image: url(\"" + "https://us0.lnf.api.itsrelizc.net/api/avatar/" + localStorage.getItem("me") + "\")"
