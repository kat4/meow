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

var meowButton = document.getElementById('send-meow');

meowButton.onclick = function postMeow() {
  console.log('meow works');
};
