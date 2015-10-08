var frontend = (function () {
  //I suggest you apply the 3-strikes rule:
  //if you repeat the code below(call to xmlhttprequest) the
  // third time you should refactor it into a function like
  // ajaxcall(method, url, data, callback)
  // you will also be able to use it in other projects
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
    var stringifiedMeow = collectMeow();
    console.log(stringifiedMeow);

    openPostReq.onreadystatechange = function()
    {
       if (openPostReq.readyState == 4 && openPostReq.status == 200)
       {
         console.log('meow meowed');
       }
     };
    openPostReq.open("POST", "/", true);
    openPostReq.send(stringifiedMeow);
    //consider that this should have a callback in case posting fails
    //something should be shown to the user
  }

  function collectMeow() {
    var meowContent = document.getElementById('meow-content').value;
    var meowDate = new Date();
    var cookie = '';
    var meowObject = {
      cookie: cookie,
      date: meowDate,
      content: meowContent
    };
    return JSON.stringify(meowObject);
    //create js object for date, cookie and content and stringify->send
  }


  return {
    getMeows: getMeows,
    postMeow: postMeow
  };
  }());
