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
        var deleteButtonArray = document.getElementsByClassName('delete-meow');

        for (var i = 0; i < parsedMeow.length; i++) {
            thisMeow = parsedMeow[i];
            growingBasket += meowBox(thisMeow.content, thisMeow.date.slice(0, 10) + ' ' + thisMeow.date.slice(11, 16));

        }

        catBasket[0].innerHTML = growingBasket;
        
        for (var j = 0; j < deleteButtonArray.length; j++) {
            deleteButtonArray[j].addEventListener("click", deleteMeow);
        }

        function deleteMeow() {
            this.parentNode.parentNode.removeChild(this.parentNode);
        }
    }

    // Defining the html for our meows
    function meowBox(content, date) {
        return "<div class = \"meowBoxes\"><span>" + date + "</span><p>" + content + "</p><input class=\"delete-meow\" type=\"button\" value=\"DeleteMeow\"></div>";
    }

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
                var data = JSON.parse(openPostReq.responseText);
                callback(openPostReq.responseText);
            }
        };
        openPostReq.open("POST", "/", true);
        openPostReq.send(stringifiedMeow);
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

        //deleteMeow: deleteMeow
    };
}());
