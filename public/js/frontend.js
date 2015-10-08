var frontend = (function () {
  //I suggest you apply the 3-strikes rule:
  //if you repeat the code below(call to xmlhttprequest) the
  // third time you should refactor it into a function like
  // ajaxcall(method, url, data, callback)
  // you will also be able to use it in other projects
  function getMeows(callback){
    var openGetReq = new XMLHttpRequest();
    openGetReq.onreadystatechange = function(){
         if (openGetReq.readyState == 4 && openGetReq.status == 200){
             callback(openGetReq.responseText);
         }
    };
    openGetReq.open("GET", "/meows", true);
    openGetReq.send();
  }

  function getMeowsCallback(data) {
    console.log(data);
    var catBasket = document.getElementsByClassName('cat-basket');
    var parsedMeow = JSON.parse(data);
    console.log(parsedMeow);
    var growingBasket = "";
    for (var i = 0; i < parsedMeow.length; i++) {
        thisMeow = parsedMeow[i];
        growingBasket += meowBox(thisMeow.content, thisMeow.date.slice(0,10)+' '+thisMeow.date.slice(11,16));

    }

    console.log(growingBasket);
    catBasket[0].innerHTML = growingBasket;

    var deleteButtonArray = document.getElementsByClassName('delete-meow');
    console.log(deleteButtonArray);

    for (var j = 0; j < deleteButtonArray.length; j++) {
      deleteButtonArray[j].addEventListener("click", deleteMeow);
    }

    function deleteMeow() {
      this.parentNode.parentNode.removeChild(this.parentNode);
      console.log('delete clicked eeeeeeeeeeeep');
    }
  }



  //delete meow
  // function deleteMeow () {
  //   //this.parentNode.removeChild(this);
  //   console.log('delete btn clicked');
  // }

  function meowBox(content, date) {
    return "<div class = \"meowBoxes\"><span>" + date + "</span><p>" + content + "</p><input class=\"delete-meow\" type=\"button\" value=\"DeleteMeow\"></div>";
    // var deleteButton = document.getElementsByClassName('delete-meow');
    // console.log(deleteButton);
    // deleteButton[].addEventListener("click", deleteMeow);
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
         var data = JSON.parse(openPostReq.responseText);
         console.log(data + "datas");
       }
     };
    openPostReq.open("POST", "/", true);
    openPostReq.send(stringifiedMeow);

    //consider that this should have a callback in case posting fails
    //something should be shown to the user
  }

  //create js object for date, cookie and content and stringify->send to backend
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

  }

  return {
    getMeows: getMeows,
    postMeow: postMeow,

    //deleteMeow: deleteMeow
  };
  }());
