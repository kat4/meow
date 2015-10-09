var frontend = (function() {
    //I suggest you apply the 3-strikes rule:
    //if you repeat the code below(call to xmlhttprequest) the
    // third time you should refactor it into a function like
    // ajaxcall(method, url, data, callback)
    // you will also be able to use it in other projects
    function getMeows(callback) {
        var openGetReq = new XMLHttpRequest();
        openGetReq.onreadystatechange = function() {
            if (openGetReq.readyState == 4 && openGetReq.status == 200) {
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
        var growingBasket = "";
        for (var i = 0; i < parsedMeow.length; i++) {
            thisMeow = parsedMeow[i];
            growingBasket += meowBox(thisMeow.content, thisMeow.date.slice(0, 10) + ' ' + thisMeow.date.slice(11, 16), thisMeow.key);

        }

        catBasket[0].innerHTML = growingBasket;

        var deleteButtonArray = document.getElementsByClassName('delete-meow');

        for (var j = 0; j < deleteButtonArray.length; j++) {
            deleteButtonArray[j].addEventListener("click", function(){
                var _this = this;
                deleteMeow(getMeowsCallback, _this);
            });
        }

        function deleteMeow(callback, _this) {
            var thisKey = _this.parentNode.getElementsByClassName('meow-key')[0].textContent;
            _this.parentNode.parentNode.removeChild(_this.parentNode);
            var openDelReq = new XMLHttpRequest();
            openDelReq.onreadystatechange = function() {
                if (openDelReq.readyState == 4 && openDelReq.status == 200) {
                    callback(openDelReq.responseText);
                }
            };
            openDelReq.open("DELETE", "/"+thisKey+"", true);
            openDelReq.send();
        }
    }



function meowBox(content, date, key) {
    return "<div class = \"meowBoxes\"><span>" + date + "</span><p>" + content + "</p><input class=\"delete-meow\" type=\"button\" value=\"DeleteMeow\"><span class=\"meow-key hidden\" >" + key + "</span></div>";
}

getMeows(getMeowsCallback);

//post meows
var meowButton = document.getElementById('send-meow');

meowButton.addEventListener("click", function() {
    postMeow(getMeowsCallback);
});

function postMeow(callback) {
    var openPostReq = new XMLHttpRequest();
    var stringifiedMeow = collectMeow();

    openPostReq.onreadystatechange = function() {

        if (openPostReq.readyState == 4 && openPostReq.status == 200) {
            console.log('meow meowed');
            var data = JSON.parse(openPostReq.responseText);
            callback(openPostReq.responseText);
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
