function pupopTip(pupW,pupH,pupText,pupClose,pupCloseH,btnText) {
    var popup = $('<div  class="pupopBox" style="display:none;position: fixed;top:0;left: 0;width: 100%;height: 100%;background-color:rgba(0,0,0,0.6); "><div  class="pupopContent" style="position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);display:flex;flex-direction:column;justify-content:center;align-items:center;width:'+pupW+';height: '+pupH+';background-color: #fff;border-radius: 10px;padding: 20px">' +
        '<img class="pupClose" src="'+pupClose+'" style="position: absolute;height:'+pupCloseH+'; top:-'+pupCloseH+';right:0; cursor: pointer " />' +
        '<div style="font-size: 16px;">'+pupText+' </div>' +
         '</div></div>');
    $("body").append(popup);
    if(btnText){
        $('.pupopContent').append($('<a style="display:; background-color:rgba(0,0,0,0.9);border-radius: 5px;margin-top:10px;padding:5px 20px;color: #fff; text-decoration: none;font-size: 14px; " id="pup_btn" href="javascript:;">'+btnText+'</a>'));

    }
    $('.pupopBox').fadeIn();
    $('body').on('click','.pupClose',function() {
        $('.pupopBox').fadeOut(500,function () {$(this).remove()})
    })
}

var save_threshold = function(threshold) {       
    $.ajax({
        type: "POST",
        url: "save_threshold",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(threshold),
        success: function(result){
            threshold=result["threshold"];
            console.log(result["threshold"]);
            // var all_data = result["searched_data"];
            // display(all_data);

        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

// var display = function(all_data) {
    
//     //insert all new data
//     $.each(all_data, function(i, datum){
//         var ul_id = "list" + i;
//         var id = datum["Id"];
//         // var title = "<ul id=\"" + ul_id + "\"><h2>" + datum["Title"] + "</h2></ul>";
//         var title = "<ul id=\"" + ul_id + "\"><h2>" + "<a href=\"http://127.0.0.1:5000/Item/" + id + "\">" + datum["Title"] + "</a>"+ "</h2></ul>";
//         var poster = "<li>Poster: <a href=\"" + datum["Poster"] + "\">link to poster</a></li>";
//         var stars = "<li>Stars: " + datum["Stars"] + "</li>";
//         var score = "<li>Score: " + datum["Score"] + "</li>";
//         $("#display").append(title);
//         $("#"+ul_id).append(poster);
//         $("#"+ul_id).append(stars);
//         $("#"+ul_id).append(score);
//     })
// }

$(document).ready(function() {
    $("button").click(function() {
        var threshold = $("#auto").val();
        save_threshold(threshold);
        $("#auto").val("");
        // pupopTip('200px','120px','Great！Your threshold is set successfully!','https://raw.githubusercontent.com/wangqin273/king/master/pupopTip/img/pupClose.png','37px');
        var words = "Great！Your threshold is set successfully!"
        $("#threshold-save-alert").append(words)
    });
});