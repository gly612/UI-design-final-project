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


var total = 0;
var search_data = function(search_words) {       
    $.ajax({
        type: "POST",
        url: "search_data",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(search_words),
        success: function(result){
            var all_data = result["searched_data"];
            display_search_data(all_data);

        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var save_record = function(record) {       
    $.ajax({
        type: "POST",
        url: "save_record",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(record),
        success: function(result){
            var all_record = result["records"];
            console.log(all_record)
            // alert("Your record is saved!")
            // pupopTip('200px','120px','Your record is saved!','https://raw.githubusercontent.com/wangqin273/king/master/pupopTip/img/pupClose.png','37px');
            var save_alert = "Great！Your record is saved!"
            $("#record-save-alert").append(save_alert)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var display = function(all_data) {
    
    //insert all new data
    $.each(all_data, function(i, datum){
        var ul_id = "list" + i;
        var id = datum["Id"];
        // var title = "<ul id=\"" + ul_id + "\"><h2>" + datum["Title"] + "</h2></ul>";
        var title = "<ul id=\"" + ul_id + "\"><h2>" + "<a href=\"http://127.0.0.1:5000/Item/" + id + "\">" + datum["Title"] + "</a>"+ "</h2></ul>";
        var poster = "<li>Poster: <a href=\"" + datum["Poster"] + "\">link to poster</a></li>";
        var stars = "<li>Stars: " + datum["Stars"] + "</li>";
        var score = "<li>Score: " + datum["Score"] + "</li>";
        $("#display").append(title);
        $("#"+ul_id).append(poster);
        $("#"+ul_id).append(stars);
        $("#"+ul_id).append(score);
    })
}

var display_search_data = function(data) {
    $("#display-search").empty();
    console.log(data)
    if (data.length === 0) {
        // pupopTip('300px','200px','Sorry, the food you searched is not in the database','https://raw.githubusercontent.com/wangqin273/king/master/pupopTip/img/pupClose.png','37px')
        var alerts = "Sorry, the food you searched is not in the database. Please try another one."
        $("#food-not-found-alert").append(alerts)
    } else {
        $("#food-not-found-alert").empty();
    }
    $.each(data, function(i, datum){
        var id = datum["Id"];
        var item = "<li id=\"" + id + "\">" + "<p class=\"name\">" + datum["name"] +"</p>"+ "--<img src=" +"\""+ datum["image"] + "\" height=\"60px\" width=\"80px\">"+ "--" + datum["calorie"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<input type=\"text\" size=\"11\"placeholder=\"Serving size\">" + "&nbsp;&nbsp;&nbsp;&nbsp;<i class=\"far fa-plus-square\"></i>" + "</li>"
        $("#display-search").append(item);
    })
}

$(document).ready(function() {
    var th = "<h5>The threshold you set is:</h5>&nbsp; <h2>" + threshold + "</h2> <h5>cals</h5>"
    // $("#threshold").html("The threshold you set is: " + threshold + " cals");
    $("#threshold").append(th)
    $("#search-button").click(function() {
        var search_words = $("#search").val();
        search_data(search_words);
    });
    $("#display-search").on("click", "i", function() {
        console.log($(this).parent())
        console.log($(this).parent()[0].innerHTML)
        var image_list=$(this).parent()[0].innerHTML.split("--")
        console.log(image_list)
        var image = image_list[1]
    	var amount = Number($(this).parent().find("input").val())
        var item_list = $(this).parent()[0].innerText.replace(/^\s+/, "").replace(/\s+$/, "").split("--");
        console.log(item_list)
        var food = item_list[0].replace(/^\s+/, "").replace(/\s+$/, "");
        var cal = item_list[2].split(" ")[0];
        // console.log(food)
        // console.log(cal)
        var cal_int = Number(cal) * amount;
        // var cal_int = 280
        var food_item = "<div class=\"row\"><div class=\"col-md-3\">" + food + "</div>" + "<div class=\"col-md-4\">" + image +"</div>" + "<div class=\"col-md-3\">" + cal_int + " cals" + "</div>" + "<div class=\"col-md-2\"><i class=\"fas fa-trash-alt\"></i></div>" + "</div><br>";
        $("#food-list").append(food_item);
        total += cal_int;
        $("#total").html(total);
        if (total > threshold && $("#exceed-alert")[0].innerHTML === "") {
        	var gif = "<img src=\"https://media.giphy.com/media/CjVjrzOsGN7q0/giphy.gif\" width=\"30%\">"
        	var words = "&nbsp;" + "<h3>Total calories EXCEED your threshold!!! Please remove some food or change your threshold!</h3>"
	    	$("#exceed-alert").append(gif)
	    	$("#exceed-alert").append(words)
	    } else if (total <= threshold) {
	    	$("#exceed-alert").empty()
	    }

	    if ($("#exceed-alert")[0].innerHTML !== "") {
	    	$("#record-save").prop("disabled", true)
	    } else {
	    	$("#record-save").prop("disabled", false)
	    }

    });
    $("#food-list").on("click", "i", function() {
        var item = $(this).parent().parent()[0].innerText.split(/\s+/);
        var cal_int = Number(item[1]);
        total = total - cal_int;
        $("#total").html(total);
        $(this).parent().parent().remove();
        if (total > threshold && $("#exceed-alert")[0].innerHTML === "") {
        	var gif = "<img src=\"https://media.giphy.com/media/CjVjrzOsGN7q0/giphy.gif\" width=\"30%\">"
        	var words = "&nbsp;" + "<h3>Total calories EXCEED your threshold!!! Please remove some food or change your threshold!</h3>"
	    	$("#exceed-alert").append(gif)
	    	$("#exceed-alert").append(words)
	    } else if (total <= threshold) {
	    	$("#exceed-alert").empty()
	    }
	    if ($("#exceed-alert")[0].innerHTML !== "") {
	    	$("#record-save").prop("disabled", true)
	    } else {
	    	$("#record-save").prop("disabled", false)
	    }
    })
    $("#record-save").click(function() {
        var name=prompt("Please input your information like: Alice(breakfast)","");
        // if (name!=null && name!="") {
        //     alert("Your name is: " + name);
            
        // }
    	var myDate = new Date();
    	var year = myDate.getFullYear()
    	var month = myDate.getMonth() + 1;
    	var day = myDate.getDate();
    	var record = {}
    	record["year"] = year
    	record["month"] = month
    	record["day"] = day
        record["name"] = name
    	var obj = $("#food-list").find("div")
    	console.log(obj)
    	var len = obj.length
        console.log(obj[1])
        console.log(obj[1].innerText)
    	for (var i = 0; i < len; i = i + 5) {
            var list=[]
            list.push(obj[i+2].innerHTML)
            list.push(obj[i+3].innerText)
            console.log(list)
            record[obj[i+1].innerText]=list
            // record[obj[i+1].innerText]["image"]=obj[i+2].innerHTML
            // record[obj[i+1].innerText]["calories"]=obj[i+3].innerText
            // console.log(obj[i+1])
    		// record[obj[i+1].innerText]=obj[i+3].innerText
    		// var list=[]
    		// console.log(obj[i+1].innerText)
    		// console.log(obj[i+2].innerHTML)
    		// 	// console.log(obj[i+1].innerText)
    		// list.push(obj[i+2].innerHTML)
    		
    		// list.push(obj[i+3].innerText)
    		// console.log(list)
    		// record[obj[i+1].innerText]=list
    			
    		
    		// record[obj[i+1].innerText]=obj[i+2].innerText
    		// console.log(obj[i+1].innerText)
    		// console.log(obj[i+2].innerText)
    	}
    	console.log(record)
    	save_record(record)
    })

});