var frontend = (function () {
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

  //post meows
  var meowButton = document.getElementById('send-meow');

  meowButton.addEventListener("click", postMeow);

  function postMeow() {
    var openPostReq = new XMLHttpRequest();
    openPostReq.open("POST", "/", true);
    var meowContent = document.getElementById('meow-content').value;
    openPostReq.send(meowContent);
  }

  return {
    getMeows: getMeows,
    postMeow: postMeow
  };
  }());
