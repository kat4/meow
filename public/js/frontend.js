var frontend = (function() {

    // http request for meows
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

    // callback to run each time we want to fetch meows
    function getMeowsCallback(data) {
        var catBasket = document.getElementsByClassName('cat-basket');
        var parsedMeow = JSON.parse(data);
        var growingBasket = "";
        for (var i = 0; i < parsedMeow.length; i++) {
            thisMeow = parsedMeow[i];
            growingBasket += meowBox(thisMeow.content, thisMeow.date.slice(0, 10) + ' ' + thisMeow.date.slice(11, 16), thisMeow.key);

        }

        catBasket[0].innerHTML = growingBasket;

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
        openDelReq.open("DELETE", "/" + thisKey + "", true);
        openDelReq.send();
    }




    function meowBox(content, date, key) {
        return "<div class = \"meowBoxes\"><span>" + date + "</span><p>" + content + "</p><input class=\"delete-meow\" type=\"button\" value=\"DeleteMeow\"><span class=\"meow-key hidden\" >" + key + "</span></div>";
    }

    //post meows
    var meowButton = document.getElementById('send-meow');

    meowButton.addEventListener("click", function() {
        postMeow(getMeowsCallback);
    });

    var deleteButtonArray = document.getElementsByClassName('delete-meow');

    for (var j = 0; j < deleteButtonArray.length; j++) {
        deleteButtonArray[j].addEventListener("click", function() {
            var _this = this;
            deleteMeow(getMeowsCallback, _this);
        });
    }


    function postMeow(callback) {
        var openPostReq = new XMLHttpRequest();
        var stringifiedMeow = collectMeow();

        openPostReq.onreadystatechange = function() {

            if (openPostReq.readyState == 4 && openPostReq.status == 200) {
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

    // THIS SHOULD BE ON PAGE LOAD OR SOMETHING //
    getMeows(getMeowsCallback);

    return {
        getMeows: getMeows,
        postMeow: postMeow,
    };

}());
