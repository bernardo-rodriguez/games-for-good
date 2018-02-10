//oGPAXQNdxoidsD9A0kAHz4zCYRe8eEUH-d-BJXaej7pryWc7sf5ym04GwLK


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

    jQuery.ajax({
        url : '   ://www.paypal.com/cgi-bin/webscr',
        type : "POST",
        data: {'cmd':'_notify-synch','tx':'1H29010526585762R','at':'oGPAXQNdxoidsD9A0kAHz4zCYRe8eEUH-d-BJXaej7pryWc7sf5ym04GwLK'},
        //data : $("#myForm").serialize() + "&tx=" + $.urlParam('tx') + "&at=oGPAXQNdxoidsD9A0kAHz4zCYRe8eEUH-d-BJXaej7pryWc7sf5ym04GwLK",
        // success : function(data) {
        //     console.log(data);
        // }
    });
console.log($.urlParam('tx'));