function getPeople(){
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showPeople(resp.list);
	}
	xhr.send(null);
}

function showPeople(people) {
	
	var tableContent = "<tr class='tableTitle' ><td>Image</td><td>Name </td><td>Title</td><td>Contract </td></tr>\n";
	for (var i = 0; i < people.length; ++i) {
		var person = people[i];
		if( person.imageId != undefined){
			var image = "https://unidirectory.auckland.ac.nz/people/imageraw/" +person.profileUrl[1] + "/" + person.imageId + "/small";
		}
		else{
			var image = 'Default.png';
		}
		
		if(person.extn != undefined){
			var telephone = "<a class = 'links' href = 'tel:+64 9 3737599, ext = " + person.extn + "'>&#x260E</a>";
		}
		else{
			var telephone = "<a class = 'links' href = 'tel:+64 9 3737599, ext = " + person.extn + "' onclick='return false;' style='cursor: default;'  id='disable' >&#x260E</a>";
		}
		
		if(person.emailAddresses[0] != undefined){
			var email = "<a class = 'links' href = 'mailto:" + person.emailAddresses[0] + "'>&#9993</a>";
		}
		else{
			var email = "<a class = 'links' href = 'mailto:" + email + "' onclick='return false;' style='cursor: default;'  id='disable' >&#9993</a>";
		}

		if(person.profileUrl[1] != undefined){
			var vcard =  "<a class = 'links' href = 'https://unidirectory.auckland.ac.nz/people/vcard/" + person.profileUrl[1] + "'>&#9998</a>";
		}
		else{
			var vcard = "<a class = 'links' href = 'https://unidirectory.auckland.ac.nz/people/vcard/" + person.profileUrl[1] + "' onclick='return false;' style='cursor: default;'  class='disable' >&#9998</a>";
		}
		
		if(person.jobtitles != undefined){
			var title =  person.jobtitles;
		}
		else{
			var title = "N/A";
		}

		tableContent += "<tr class='tableBody'>";
		tableContent += "<td> <img src = "+ image +" height='115' width='115'></img></td><td>" + person.names + "</td><td>"+ title +"</td><td><table class='table'><tr><td>" + vcard + "</td><td>"+ email +"</td><td>"+ telephone +"</td></tr></table></td></tr>\n";
	}
	document.getElementById("showTab").innerHTML = tableContent;
}

/*<------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/
function getCourses(){
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showCourses(resp.courses.coursePaperSection);
	}
	xhr.send(null);
}

function showCourses(courses) {
	var tableContent = "<tr class='tableTitle' ><td>CourseID </td><td>Title </td><td>Description </td><td>Points </td><td>Prerequisite </td></tr>\n";
	for (var i = 0; i < courses.length; ++i) {
		var course = courses[i];
		if(course.prerequisite != undefined){
			var prereq = course.prerequisite;
			}
		else{
			var prereq = "";
			}
		tableContent += "<tr class='tableBody'>";
		tableContent += "<td>"+ exists(course.subject.courseA) +"</td><td>"+ exists(course.title) +"</td><td>"+ exists(course.description) +"</td><td>"+ exists(course.subject.points.split(" ")[0]) +"</td><td>"+ exists(prereq) +"</td></tr>";
	}
	document.getElementById("showTab2").innerHTML = tableContent;
}

function exists(value){
	if(value != "" && value != "undefined"){
		return value;
	}
	else{
		return "N/A";
	}
}
/*<------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/
function getNews(){
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/news";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader('Accept', 'application/json, text/javascript');
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showNews(resp);
	}
	xhr.send(null);
}

function showNews(news_feed) {
	var tableContent = "<tr class='tableTitle' ><td> News </td></tr>\n";
	for (var i = 0; i < news_feed.length; ++i) {
		var news = news_feed[i];
		if((i%2)==0){
			tableContent += "<tr class='tableBody'>";
		}
		else{
			tableContent += "<tr class='tableBody2'>";
		}

		tableContent += "<td><table class='table'><tr class = 'newstitle'><td><a class = 'newslink' href = '" + news.linkField+ "'>" + news.titleField + "</a>";
		tableContent +=  "<div id ='date'>" +news.pubDateField + "</div></td></tr>";
		tableContent += "<tr><td id ='newsbody'>"+ news.descriptionField +"</td></tr></table></td></tr>";
	}
	document.getElementById("showTab3").innerHTML = tableContent;
}

/*<------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/
function getNotices(){
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/notices";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader('Accept', 'application/json, text/javascript');
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showNotices(resp);
	}
	xhr.send(null);
}

function showNotices(notices_feed) {
	var tableContent = "<tr class='tableTitle' ><td> Notices </td></tr>\n";
	for (var i = 0; i < notices_feed.length; ++i) {
		var notice = notices_feed[i];
		if((i%2)==0){
			tableContent += "<tr class='tableBody'>";
		}
		else{
			tableContent += "<tr class='tableBody2'>";
		}

		tableContent += "<td><table class='table'><tr class = 'newstitle'><td><a class = 'newslink' href = '" + notice.linkField+ "'>" + notice.titleField + "</a>";
		tableContent +=  "<div id ='date'>" +notice.pubDateField + "</div></td></tr>";
		tableContent += "<tr><td id ='newsbody'>"+ notice.descriptionField +"</td></tr></table></td></tr>";
	}
	document.getElementById("showTab4").innerHTML = tableContent;
}

/*<------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/
function getComments(){
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		document.getElementById("htmlcomments").innerHTML = xhr.responseText;
	}
	xhr.send(null);
}

function submitComment(){
	var comment = document.getElementById('commentText').value;
	var name = document.getElementById("username").value;
	
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onload = function () {
		getComments();
	}
	xhr.send(JSON.stringify(comment));
	}

/*<------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->*/

var currentTab = "";

function showHomeTab(id){
	 if (currentTab != "homeTab") {
		currentTab = "homeTab";
		showNoTabs();
		changeActive(id);
		document.getElementById("homeTab").style.display = "inline";
	 }
}	

function showPeopleTab(id){
	 if (currentTab != "peopleTab") {
		getPeople();
		currentTab = "peopleTab";
		showNoTabs();
		changeActive(id);
		document.getElementById("peopleTab").style.display = "inline";
	 }
}

function showCourseTab(id){
	 if (currentTab != "courseTab") {
		getCourses();
		currentTab = "courseTab";
		showNoTabs();
		changeActive(id);
		document.getElementById("courseTab").style.display = "inline";
	 }
}

function showNewsTab(id){
	 if (currentTab != "newsTab") {
		getNews();
		currentTab = "newsTab";
		showNoTabs();
		changeActive(id);
		document.getElementById("newsTab").style.display = "inline";
	 }
}	

function showNoticesTab(id){
	 if (currentTab != "noticesTab") {
		getNotices();
		currentTab = "noticesTab";
		showNoTabs();
		changeActive(id);
		document.getElementById("noticesTab").style.display = "inline";
	 }
}	

function showCommentsTab(id){
	 if (currentTab != "commentsTab") {
		currentTab = "commentsTab";
		showNoTabs();
		getComments();
		changeActive(id);
		document.getElementById("commentsTab").style.display = "inline";
	 }
}

function showNoTabs() {
	document.getElementById("peopleTab").style.display = "none";
	document.getElementById("homeTab").style.display = "none";
	document.getElementById("courseTab").style.display = "none";
	document.getElementById("newsTab").style.display = "none";
	document.getElementById("noticesTab").style.display = "none";
	document.getElementById("commentsTab").style.display = "none";
}

function barFunction() {
    var x = document.getElementById("navBar");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}

function changeActive(id){
    var x = document.getElementById(id);
	for(var i = 1; i <= 6; ++i){
		document.getElementById(i).className = "";
	}
	x.className = "active";
}

window.onload = function () {
	 showHomeTab('1');
  }