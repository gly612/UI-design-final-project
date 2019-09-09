

$(document).ready(function() {
	var len = records.length
	for (var i = 0; i < len; i++) {
		var year = records[i]["year"]
		var month = records[i]["month"]
		var day = records[i]["day"]
		var name = records[i]["name"]
		var date = month + "/" + day + "/" + year
		var ul_id = "list" + i
		var ul = "<ul id=\"" + ul_id + "\">" + "</ul>";
		$("#list").append(ul)
		var title = "<h3>" + date + "---" + name + "</h3>"
		$("#" + ul_id).append(title)
		var keys = Object.keys(records[i])
		keys.splice(keys.indexOf("year"), 1)
		keys.splice(keys.indexOf("month"), 1)
		keys.splice(keys.indexOf("day"), 1)
		keys.splice(keys.indexOf("name"), 1)
		for (var j = 0; j < keys.length; j++) {
			var food = keys[j]
			var img = records[i][food][0]
			var cal = records[i][food][1]
			var item = "<li " + "class=\"toggle\"" + " style=\"display:none\">" + food + "&nbsp;&nbsp;&nbsp;" + img + "&nbsp;&nbsp;&nbsp;"+ cal + "</li><br>"
			$("#" + ul_id).append(item)
		}
	}
	$("ul h3").click(function(){
	    $(this).parent().find("li").slideToggle("slow");
	  });
    
});