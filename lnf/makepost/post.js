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

    }else{
        form = new FormData;
        form.append("img",);
        form.append("title",title);
        form.append("description",description);
        form.append("poster",getUser(localStorage.getItem("token")));

        xml1 = new XMLHttpRequest;
        xml1.open("POST","https://us0.lnf.api.itsrelizc.net/api/posting");
        xml1.send(form);
    }

}
window.onload = () =>{
    document.getElementById("poster").value = getUser(localStorage.getItem("token"));
}