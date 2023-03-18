const fileTypes = [
    "image/png"
  ];
  
  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

function postmcdd(){
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    img = document.getElementById("img")
    curFile = img.files;
    if(curFile.length == 0){
        whoops("ERROR","NO FILE!");
        window.location.href = "lnf/makepost/"
    }else{
        xml = new XMLHttpRequest;
        xml.open("POST","https://us0.lnf.api.itsrelizc.net/api/otherPosts");
        xml.setRequestHeader("title",title);
        xml.setRequestHeader("description",description);
        xml.setRequestHeader("poster",getUser(localStorage.getItem("token")));
        xml.setRequestHeader("id",document.getElementById("id").value);
        xml.send()
    }

}
window.onload = () =>{
    d = getUser(localStorage.getItem("token"));
    
    document.getElementById("id").value = uuidv4();
    document.getElementById("curURL").value = window.location.href;
    document.getElementById("poster").value = d;

}