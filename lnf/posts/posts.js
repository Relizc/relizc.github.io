window.onload = () =>{

    e = document.getElementById("posts")

    load = document.createElement("p");
    load.innerHTML = "Loading posts, please wait...";

    e.appendChild(load);
    xml = new XMLHttpRequest;
    xml.onreadystatechange = () =>{
        d = JSON.parse(xml.responseText);
        if(xml.status == 500){
            whoops("Failed to Authenticate","Your session expired! Please log in again!");
            window.location.href = "/lnf/login";

        }else if (xml.status == 200){
            orders = d["posts"];
            posts = document.getElementById("posts");
            if(orders.length == 0){
                load.innerHTML = "No posts!";
                return;
            }
            load.remove();
            
            for(i = 0;i < orders.length;i++){
                document.body.insertAdjacentHTML("beforeend",`
                <div style = "width: 100%; margin: auto 25%;" id="order@${orders[i]["id"]} class="order" onmouseover = "renderPreview(${orders[i]["id"]}">
                <h2> ${orders[i]["title"]}</h3>
                <h4>${orders[i]["poster"]}</h4>
                <img style = "justify-content: center; width: 720px; height: 480px; background-resize: cover;" src="https://us0.lnf.api.itsrelizc.net/api/getImage/${orders[i]["id"]}">
                <p> ${orders[i]["description"]}</p>
                </div>`)
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
