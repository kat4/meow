function getMeows(callback){
  var openGetReq = new XMLHttpRequest();
  openGetReq.addEventListener("load", callback);
  openGetReq.open("GET", "/meows", true);
  openGetReq.send();
}

function getMeowsCallback(data) {
  console.log(data);
}

getMeows(getMeowsCallback);
