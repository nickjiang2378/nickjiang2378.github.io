let username = null;
document.onload = initialize(); //calls initialize function as soon as document is loaded


function initialize() {
	console.log("Document Loaded");
	//document.getElementById()
  	makePosts();
  	checkLogin();
}

function createTopic(title, id, category, likes, replies, views, activity) {
  //is basic HTML for each topic
	let htmlContent = 
	`
	<div class="tt-col-avatar">
		<svg class="tt-icon">
		  <use xlink:href="#icon-ava-c"></use>
		</svg>
	</div>
	<div class="tt-col-description">
		<h6 class="tt-title"><a id = "post` + id + `" href="">` + title + `
		</a></h6>
		<div class="row align-items-center no-gutters"> 
			<div class="col-1 ml-auto show-mobile"> 
				<div class="tt-value">1d</div>
			</div>
		</div>
	</div>
	<div class="tt-col-category">
		<span class="tt-color01 tt-badge">` + category + `</span>
	</div>
	<div class="tt-col-value hide-mobile">` + likes + `</div>
	<div class="tt-col-value tt-color-select  hide-mobile">` + replies + `</div>
	<div class="tt-col-value hide-mobile">` + views + `</div>
	<div class="tt-col-value hide-mobile">` + activity + `</div>`
   	return htmlContent
}

function redirectPost(id) {
  //Used when a topic is clicked
	//document.getElementById("mainPost")
	$.get("/getPost?id=" + id, function(data, status) {
		console.log(data);
		window.location.assign("expand.html?id=" + id);
	})
}

function makePosts() {
  //GET request to make all topics from database
  $.get("/getTables", function(data, status) {
    console.log(data);
    data.forEach((element) => {
      let topicInner = createTopic(element.title,element.postId, element.category, element.likes, element.replies, element.views, element.activity)
      let topicHTML = document.createElement("div");
      topicHTML.className = "tt-item"
      topicHTML.innerHTML = topicInner;
	  document.getElementById("allPosts").appendChild(topicHTML);
      document.getElementById("post" + element.postId).href = "forum/expand.html?id=" + element.postId
    })
  })
}

function checkLogin() {
  $.get("/getLogin", function(data,status) {
    console.log(data);
    if (data) {
      username = data
      document.getElementById("userid").innerHTML = username;
    }
  })
}

function createPost() {
	//let form = document.getElementById("postForm");
	console.log("Creating New Post")
	let title = document.getElementById("inputTopicTitle").value;
	let post = document.getElementById("post").value;
	let category = document.getElementById("chooseCategory").value;
	let form = {"title":title,"post":post, "category":category};
	$.post("/postNewTopic",form, () => {
		console.log("Client-side changes started")
		document.getElementById("myModal").style.display = "none";
		/*let topicInner = createTopic(title,postId, category, 0, 0, 0, "0d")
		let topicHTML = document.createElement("div");
		topicHTML.className = "tt-item"
		topicHTML.innerHTML = topicInner;
		document.getElementById("allPosts").appendChild(topicHTML);
		document.getElementById("post" + element.postId).href = "forum/expand.html?id=" + element.postId*/
		location.reload();
	})
}