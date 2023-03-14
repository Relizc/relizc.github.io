window.onload = () =>{
    load = document.createElement("p");
    load.innerHTML = "Loading posts, please wait...";
    document.body.appendChild(load);
    xml = new XMLHttpRequest;
    xml.onreadystatechange = () =>{
        d = JSON.parse(xml.responseText);
        if(xml.status == 504){
            whoops("Failed to Authenticate","Please log in again");
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
                <div id="order@${orders[i]["id"]} class="order" onmouseover = "renderPreview(${orders[i]["id"]}">
                <h2> ${orders[i]["title"]}</h3>
                <h4>${orders[i]["poster"]}</h4>
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