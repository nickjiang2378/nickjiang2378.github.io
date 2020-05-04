document.onload = initialize();

var modal = document.getElementById("myModal");
    
        
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeWrapper")[0];

//document.getElementById("q1").addEventListener("click",()=> {return open(1);});

// When the user clicks on <span> (x), close the modal
span.onclick = close
var dd = document.getElementById("dd")
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        close();
    }
}

let titleType = -1; //1 = Quote, 2 = Custom
let allStories;

function open(id) {
    console.log("Open Modal")
    modal.style.display = "block";
    //console.log(data)
    console.log(allStories)
    let modalDiv = document.createElement("div");
    modalDiv.className = "modalCenter"
    modalDiv.innerHTML = `<div style="display: inline; position: absolute; bottom: 0; right: 0;">16<i class="fas fa-thumbs-up fa-w-16" style="color:#26b7a0;"></i>
    15<i class="fas fa-heart" style="color:#fb3958;"></i></div>` + allStories[id-1]["content"]
    document.getElementById("modalContent").appendChild(modalDiv);
    document.body.style.overflow = "hidden";
}

function close() {
    console.log("Close Modal")
    modal.style.display = "none";
    document.getElementById("modalContent").innerHTML = "";
    document.body.style.overflow = "scroll";
    //window.history.back();
}

function initialize() {
    console.log("Setting up Storyboard")
    makeStories();
    console.log(document.getElementById("newStoryBtn"))
    // Get the modal
}

function updateWithHighlight() {
    let textContent = document.getElementById("titleHighlight")
    document.getElementById("previewInner").innerHTML = textContent.value;
}

function updateWithCustom() {
    let textContent = document.getElementById("customTitle")
    document.getElementById("previewInner").innerHTML = textContent.value;
}

function openHighlight() {
    document.getElementById("highlight").style.display = "block";
    document.getElementById("ddText").innerHTML = "Pick a Quote";
    titleType = 1;

    let textContent = document.getElementById("titleHighlight")
    textContent.value = document.getElementById("storyContent").value
    document.getElementById("customTitle").style.display = "none";
    document.getElementById("previewInner").innerHTML = textContent.value;
    textContent.onkeyup = textContent.onkeypress = updateWithHighlight;
}

function openCustom() {
    document.getElementById("ddText").innerHTML = "Custom Title";
    document.getElementById("highlight").style.display = "none";
    document.getElementById("customTitle").style.display = "block";
    titleType = 2;

    textContent = document.getElementById("customTitle");
    document.getElementById("previewInner").innerHTML = textContent.value;
    textContent.onkeyup = textContent.onkeypress = updateWithCustom;
}

function createStory(title) {
    let htmlContent = `
    <div class="darken">
        <div class="storyCenter">
        16<i class="fas fa-thumbs-up fa-w-16" style="color:white;"></i>
        15<i class="fas fa-heart" style="color:white;"></i></div>
    </div>`+title
    return htmlContent;
}

function makeStories() {
    $.get("/getStories",(data, status) => {
        allStories = data;
        let placeStories = document.getElementById("allStories")
        console.log(data)
        let count = 0
        let newRow = document.createElement("div")
        newRow.className = "storyRow"
        for (var i = data.length; i >= 0;i--) {
            if (i == data.length) {
                let newStory = document.createElement("div");
                newStory.className = "addStory";
                newStory.innerHTML = 
                `<span id="newStoryBtn" class="tt-icon">
                <svg style = "max-width:20vh;max-height:20vh;margin-top:5vh;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.51 161.51" id="icon-create_new">
                    <circle cx="80.76" cy="80.76" r="80.76" fill="#3571b8"></circle>
                    <path d="M80.76 121.26c-2.49 0-4.5-2.01-4.5-4.5v-72a4.5 4.5 0 0 1 9 0v72c0 2.48-2.02 4.5-4.5 4.5z"></path>
                    <path d="M116.76 85.26h-72a4.5 4.5 0 0 1 0-9h72a4.5 4.5 0 0 1 0 9z"></path>
                </svg>
                </svg>
            </span>`;
                newRow.append(newStory);
                count += 1;
                continue;
            }
            console.log(i)
            if (count != 3) {
                let newStory = document.createElement("div")
                newStory.className = "storyTitle"
                let postId = data[i].postid
                newStory.id = "post" + postId
                console.log("Post" + postId)
                newStory.style.backgroundColor = data[i]["backgroundColor"]
                newStory.onclick = ()=>{return open(postId);}
                let newStoryInner = createStory(data[i].title)
                newStory.innerHTML = newStoryInner;
                newRow.appendChild(newStory);
                count += 1;
            }

            //WATCH THE PREVIEWINNER ID -> IT IS COMPROMISED

            if (count == 3) {
                placeStories.appendChild(newRow)
                console.log(newRow)
                count = 0
                newRow = document.createElement("div")
                newRow.className = "storyRow"
            }
        }
        if (count != 0) {
            console.log("Here's the count: " + count)
            for (let addOn = count+1;addOn<=3;addOn++) {
                let newStory = document.createElement("div");
                newStory.className = "storyTitle";
                newStory.style.opacity = 0;
                newRow.appendChild(newStory);
            }
            placeStories.appendChild(newRow)
            console.log(newRow)
        }
        document.getElementById("newStoryBtn").addEventListener("click",()=> {
            document.getElementById("modalContent").innerHTML = 
            `<div class="tt-wrapper-inner">
            <div id = "slide1" class="mySlides fadeSlide">
            <div class="stepCircle">1</div>
            <h1 class="title">Write your Story</h1>
            <form class="form-default form-create-topic" id = "postForm">
                <div class="subtitleText">This is where you can include your thoughts, feelings, and experiences from your stuttering journey.</div>
                <div class="pt-editor">
                    <h6 class="pt-title">Posted as lexd</h6>
                    <div class="pt-row">
                        <div class="col-left">
                            <ul class="pt-edit-btn">
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-quote"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-bold"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-italic"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-share_topic"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-blockquote"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-performatted"></use>
                                    </svg>
                                </button></li>
                                <li class="hr"></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-upload_files"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-bullet_list"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-heading"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-horizontal_line"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-emoticon"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-settings"></use>
                                    </svg>
                                </button></li>
                                <li><button type="button" class="btn-icon">
                                    <svg class="tt-icon">
                                      <use xlink:href="#icon-color_picker"></use>
                                    </svg>
                                </button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea name="message" class="form-control" rows="5" id = "storyContent" placeholder="We're an open community! Share your thoughts.">Hefwefe</textarea>
                    </div>
                    
                    <i onclick = "plusSlides(1)" class="fas fa-chevron-right right"></i>
                </div>
            </form>
          </div>
          <div id="slide2" class="mySlides fadeSlide">
            <div class="stepCircle">2</div>
            <h1 class="title">Design your Title Page</h1>
            <div class="subtitleText">This is what people will see first when they browse through Storyboard. Customize it how ever you'd like to fit with your story!</div>
            <div id = "text">
              <h2 class="subtitleTitle">Text</h2>
              <div>
                <span id="dd" class="wrapper-dropdown-5" style="width:35%; float:left; margin-right: 10px; z-index: 1;">
                  <span id="ddText">Choose an option</span> 
                  <ul class="dropdown">
                    <li><a href="#" onclick = "openHighlight()">Pick a Quote</a></li>
                    <li><a href="#" onclick = "openCustom()">Custom Title</a></li>
                  </ul>
                </span>
                <span style="width: 64%; margin-top: 15px;">
                  <div id = "highlight" style = "display: none;">
                    Keep the quoted section in the box and delete the rest.
                    <textarea style = "margin-bottom: 15px;" name="highlight" class="form-control" rows="5" id = "titleHighlight" ></textarea>
                  </div>
                  <input style = "display: none; margin-bottom: 15px;" id = "customTitle" type="text" name="name" class="form-control" placeholder="Type in your title here">
                </span>
              </div>
            </div>
            <div id = "background" style="margin-bottom: 15px; display: inline-block;">
              <h2 class="subtitleTitle">Background</h2>
              <div style = "background-color: #B7263D;" class="colorCircle"></div>
              <div style = "background-color: #FF6A6A;" class="colorCircle"></div>
              <div style = "background-color: #FFD700;" class="colorCircle"></div>
              <div style = "background-color: #86B726;" class="colorCircle"></div>
              <div style = "background-color: #2685B7;" class="colorCircle"></div>
              <div style = "background-color: #263DB7;" class="colorCircle"></div>
              <div style = "background-color: #A026B7;" class="colorCircle"></div>
              <div style = "background-color: #5826B7;" class="colorCircle"></div>
              <div style = "background-color: #B7A026;" class="colorCircle"></div>
            </div>
            <div id = "tags">
              <div class="form-group">
                <label for="inputTopicTags" class="subtitleTitle">Tags</label>
                <input type="text" name="name" style="border: 1px solid #eaeaea;" class="form-control" id="inputTopicTags" placeholder="Use comma to separate tags">
            </div>
            </div>
            <div id = "preview">
              <h2 class="subtitleTitle">Live Preview</h2>
              <div class="storyTitle" id="storyPreview">
                <div id="previewInner" class="innerStory"></div>
              </div>
            </div>
            <div class="btn btn-secondary btn-width-lg" style = "position:relative; width: 25%; right: -75%; margin-top: 15px;" id = "createPostButton" style="font-size:16px;" onclick = "createPost()">Create Post</div>
            <i onclick = "plusSlides(-1)" class="fas fa-chevron-left left"></i>
          </div>
          <div style="margin:auto; display: inline-block; margin-top: 20px;">
            <span class="dot"></span> 
            <span class="dot"></span> 
          </div>
        </div>`;
        showSlides(slideIndex); //slideIndex can be found in script in storyboard.html
        document.getElementById("myModal").style.display = "block";
        document.body.style.overflow = "hidden";
        document.getElementById("dd").addEventListener("click",()=>{
            console.log("click detected")
            document.getElementById("dd").classList.toggle("active");
        })
        var dd = document.getElementById("dd")
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                close();
            }
            if (event.target != dd) {
                console.log("Close choose option")
                if (dd.classList.contains("active")) {
                    dd.classList.toggle("active");
                }
            }
        }
        let collection = document.getElementsByClassName("colorCircle")
        console.log(collection)
        for (let i = 0; i<collection.length;i++) {
            let element = collection[i]
            element.addEventListener("click", ()=> {
                console.log("color clicked")
                document.getElementById("storyPreview").style.backgroundColor = element.style.backgroundColor;
                resetCollection(collection)
                element.style.border = "2px solid black";
            })
        }
    })
    })
}

function resetCollection(collection) {
    for (let x = 0; x<collection.length;x++) {
        console.log("reset")
        collection[x].style.border = "none";
    }
}

function createPost() {
	//let form = document.getElementById("postForm");
    console.log("Creating New Post")
    console.log(titleType)
    let title;
    let inner = document.getElementById("previewInner")
    if (inner != null) {
        inner.removeAttribute("id");
        if (titleType == 1 || titleType == 2) {
            title = document.getElementById("storyPreview").innerHTML;
        }
        let content = document.getElementById("storyContent").value;
        let color = document.getElementById("storyPreview").style.backgroundColor;

        let form = {"title":title,"color": color, "user":"lexd","content":content};
        console.log(form)
        $.post("/postNewStory",form, () => {
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
}