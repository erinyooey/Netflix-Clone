if(document.getElementById("learn-more")){
    document.getElementById("learn-more").addEventListener("click", function(){
        var myDiv = document.getElementById("learn-more-desc");
        var learnMore = document.getElementById("learn-more");
        var displayStyle = window.getComputedStyle(myDiv).display;
    
        if (displayStyle === "none") {
            myDiv.style.display = "block";
            learnMore.style.display = "none";
        } else {
            myDiv.style.display = "none";
        }
    });
}

if(document.getElementById("signin")){
    document.getElementById("signin").addEventListener("click", function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(!email && !password){
        alert("Please enter values");
    } else{
        var email = document.getElementById("email").value; 
        var xhttp = new XMLHttpRequest(); //this builtin JS function is communicating w/ the backend. 
        //callback function.
        xhttp.onreadystatechange = function(event){
            console.log(event.target.response);

            var response = event.target.response;

            if(response.length > 0){
                alert(response);
                var parsedResponse = JSON.parse(response);
                console.log(parsedResponse);
                // Application storing this local storage which is storing email and otp code
                localStorage.otp = parsedResponse.message;
                localStorage.email = email;
                localStorage.password = password;

                location.href = "confirm-otp-login.html";
            }
        }

        xhttp.open("get", "http://localhost:8000/users/send-otp/" + email);
        xhttp.setRequestHeader("content-type", "application/json");
        xhttp.send();
        //using this built in class (XMLHttpRequest) to initiate a request for login. request is sending data from frontend. going to backend, asking for result (which is from mysql using api request)  
        // var xhttp = new XMLHttpRequest();
        // //onreadystatechange is a function which tracks if there is a response from the server after sending the request. talking about the result, if invalid it would be []. empty.
        // xhttp.onreadystatechange = function(event){
        //     //console.log(response);
        //     //event is response from server. to get the response values, syntax is always event.target.response.
        //     console.log(event.target.response);
        //     var response =JSON.parse(xhttp.response);
        //     // user is not in the database and it will give empty [] if response lenght is either equal to or less than 0. 
        //     console.log(JSON.parse(xhttp.response));
        //     if(response.data.length > 0){
        //         location.href = "/dashboard.html";
        //     } 
        //     else{
        //         alert("login failed");
        //     }
        // }
        

        // //open a request ready to send the server syntax: open(method, url);
        // xhttp.open("post", "http://localhost:8000/login");
        
        // //both parameters are built in. gives information that data would be in this form (meaning JSON)
        // xhttp.setRequestHeader("content-type", "application/json");

        // //send the request to the database. we're sending the body data to the backend aka api (api will send it to mysql and mysql is aka database)
        // xhttp.send(JSON.stringify(body));
    }
});
}
if(document.getElementById("confirmOtpLogin")){
    document.getElementById("confirmOtpLogin").addEventListener("click", function(){
    var otp = document.getElementById("otp").value; //otp value entered by the user
    if(otp != localStorage.otp){
        alert("Please enter correct otp");
    } else{

        var body = {"email": localStorage.email, "password": localStorage.password};

         //using this built in class (XMLHttpRequest) to initiate a request for login. request is sending data from frontend. going to backend, asking for result (which is from mysql using api request)  
        var xhttp = new XMLHttpRequest();
        //onreadystatechange is a function which tracks if there is a response from the server after sending the request. talking about the result, if invalid it would be []. empty.
        xhttp.onreadystatechange = function(event){
           //console.log(response);
          //event is response from server. to get the response values, syntax is always event.target.response.
        console.log(event.target.response);
        var response = JSON.parse(xhttp.response);
             // user is not in the database and it will give empty [] if response lenght is either equal to or less than 0. 
             console.log(JSON.parse(xhttp.response));
            if(response.data.length > 0){
                 location.href = "/dashboard.html";
            } 
             else{
                alert("login failed");
            }
        }
        
         //open a request ready to send the server syntax: open(method, url);
         xhttp.open("post", "http://localhost:8000/login");
        
         //both parameters are built in. gives information that data would be in this form (meaning JSON)
         xhttp.setRequestHeader("content-type", "application/json");

         //send the request to the database. we're sending the body data to the backend aka api (api will send it to mysql and mysql is aka database)
         xhttp.send(JSON.stringify(body));
    }
});
}

if(document.getElementById("signup")){
    document.getElementById("signup").addEventListener("click", function(){
        var username = document.getElementById("username").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
    
        if(!username && !phone && !email && !password && !confirmPassword && (password != confirmPassword)){
            alert("Please enter valid values")
        }
        else{
            var body = {"email":email, "password":password, "phone":phone, "username":username};
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(event){
                console.log(event.target.response);
                var response = event.target.response;

                if(response.length > 0){
                    location.href = "/dashboard.html";
                }
            }

            xhttp.open("post", "http://localhost:8000/users/add");
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(body))

            
        }
        console.log(username, phone, email, password, confirmPassword);
    });
}

if(document.getElementById("confirmPass")){
    document.getElementById("confirmPass").addEventListener("click", function(){
        var email = localStorage.email;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if(email.toString().length > 0 && password.toString().length > 0 && confirmPassword.toString().length > 0 && (password != confirmPassword)){
            alert("Please enter valid values")
        }
        else{
            var body = {"email":email, "password":password};
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(event){
                console.log(event.target.response);
                var response = event.target.response;

                if(response.length > 0){
                    alert(response);
                    location.href = "login.html";
                }
            }

            xhttp.open("post", "http://localhost:8000/users/forget-password");
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(body))

            
        }
        console.log(email, password, confirmPassword);
    });
}

if(document.getElementById("gotoSignIn")){
    document.getElementById("gotoSignIn").addEventListener("click", function(){
        //redirect to another page (location is a built in object that contains href (href is key inside the location object))
        location.href = "/login.html";
    });
}

function getAllMovies(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(event){
        console.log(event.target.response);
        var response = event.target.response;

        if(response.length > 0){
            console.log(JSON.parse(response));
            var movieList = JSON.parse(response);
            var movieListdiv = document.getElementById("movieList");
            var content = `<section id="tv" class="text-uppercase text-white container-fluid border-bottom-section height-100">
            <div class="row d-lg-flex">`;
            for(var i = 0; i<movieList.length; i++){
                //content += "<p>" + movieList[i].movie_name + "</p>";
               
                var contentold = ` <section id="tv" class="text-uppercase text-white container-fluid border-bottom-section height-100">
                <div class="row d-lg-flex justify-content-center height-100">
                    <div class="col-12 col-lg-6 d-flex justify-content-end justify-content-lg-center flex-column text-center">
                        <h1>${movieList[i].movie_name}</h1>
                        <p>${movieList[i].duration}</p>     
                        <p>${movieList[i].genre}</p>  
                        <p>${movieList[i].language}</p> 
                        <span class="btn" onclick="playMovie('${movieList[i].video_link}')">
                        Click me to Play
                        </span> 
                    </div>
        
                    <div class="col-12 col-lg-6 d-flex justify-content-start justify-content-lg-center flex-column align-items-center">
                        <img src="${movieList[i].image_url}" class="img-tv justify-content-center">
                    </div>
                </div>
            </section>`


            content += `
                <div class="col-3 col-lg-3 d-flex justify-content-start justify-content-lg-center flex-column align-items-center">
                    <img src="${movieList[i].image_url}" class="img-tv justify-content-center">
                </div>`
            }
            content += `
            </div>
            </section>`;
            movieListdiv.innerHTML = content;
        }
    }

    xhttp.open("get", "http://localhost:8000/movies/all");
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send()
}

if(document.getElementById("closeBtn")) {
    document.getElementById("closeBtn").addEventListener("click", function(){
        var videoModal = document.getElementById("videoLink");
        var html = ``;
        videoModal.innerHTML = html;
        var modal = document.getElementById("videoModal");
        modal.style.display = "none";
    });
}

// function playMovie() {
//     //console.log(link);
//     var id = $(this).attr('id');
//     console.log(id);
//     var videoModal = document.querySelector("hover-video");
//     var html = `<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">`;
//     videoModal.innerHTML = html;
//     videoModal.play();
   
// }
// $(document).ready(function(){
// 	$('.video').mouseover(function() {
//    		var videoModal =  $(this).attr('id');
//         var html = `<video class="hover-video" width="auto" autoplay>
//         <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
//         </video>
//         `;
//         videoModal.innerHTML = html;
// 	});
// });


if(document.getElementById("forgetPass")){
    document.getElementById("forgetPass").addEventListener("click", function(){
        //get the value from email input
        //create an api request
        //on sucess (got the expected response back from the request)navigate to confirm-otp
        
        var email = document.getElementById("email").value; 
        console.log("http://localhost:8000/users/send-otp/" + email);
        var xhttp = new XMLHttpRequest(); //this builtin JS function is communicating w/ the backend. 

        xhttp.onreadystatechange = function(event){
            console.log(event.target.response);

            var response = event.target.response;

            if(response.length > 0){
                alert(response);
                var parsedResponse = JSON.parse(response);
                console.log(parsedResponse);
                // Application storing this local storage which is storing email and otp code
                localStorage.otp = parsedResponse.message;
                localStorage.email = email;

                location.href = "confirm-otp.html";
            }
        }

        xhttp.open("get", "http://localhost:8000/users/send-otp/" + email);
        xhttp.setRequestHeader("content-type", "application/json");
        xhttp.send();
        
    }
)};

if(document.getElementById("confirmOtp")){
    document.getElementById("confirmOtp").addEventListener("click", function
    (){
        var otpCode = document.getElementById("otp").value
        if(otpCode == localStorage.otp){
            location.href = "confirm-pass.html";
        }
        else{
            alert("wrong otp");
        }
    }
)};



$(document).ready(function () {
    //this code is called when page is loaded in the html
    var owlCarousel = $('.owl-fiction').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            },
            2000: {
                items: 7
            }
        }
    })
    var owlCarouselAnimated = $('.owl-animated').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            },
            2000: {
                items: 7
            }
        }
    })
    $.ajax({
        url:"http://localhost:8000/movies/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $.each(data, function (key, value) {
                if (value.genre === 'fiction') {
                    owlCarousel.trigger("add.owl.carousel", [
                        jQuery(
                            `<div class="item" data-videodiv="hover-video${key}">` +
                            `<div class="slider-card">` +
                            `<img src="${value.image_url}" class="img-tv justify-content-center">` +
                            `<div class="hover-video hover-video${key}" data-video="${value.video_link}" data-videoid="hoverID${key}">` +
                            `</div>` +
                            `<div class="description">` +
                            `<button class="play-video-btn" data-videourl=${value.video_url}>` +
                            `<i class="fa fa-play fa-icons white" aria-hidden="true"></i>` +
                            `</button>` +
                            `<button class="add-video-btn">` +
                            `<i class="fa fa-plus fa-icons black" aria-hidden="true"></i>` +
                            `</button>` +
                            `<button class="thumb-video-btn">` +
                            `<i class="fa fa-thumbs-up fa-icons black" aria-hidden="true"></i>` +
                            `</button>` +
                            `<button class="angle-video-btn">` +
                            `<i class="fa fa-angle-down fa-icons black" aria-hidden="true"></i>` +
                            `</button>` +
                            `<p class="title">${value.movie_name}</p>` +
                            `<p class="duration">Duration: ${value.duration} Minutes</p>` +
                            `<span class="genre">Genre: ${value.genre}</span>` +
                            `</div>` +
                            `</div>` +
                            `</div>`
                        )
                    ])
                } else {
                    owlCarouselAnimated.trigger("add.owl.carousel", [
                        jQuery(
                            `<div class="item" data-videodiv="hover-video${key}">` +
                            `<div class="slider-card">` +
                            `<img src="${value.image_url}" class="img-tv justify-content-center">` +
                            `<div class="hover-video hover-video${key}" data-video="${value.video_link}" data-videoid="hoverID${key}">` +
                            `</div>` +
                            `<div class="description">` +
                            `<button class="play-video-btn" data-videourl=${value.video_url}>` +
                            `<i class="fa fa-play fa-icons white" aria-hidden="true"></i>` +
                            `</button>` +
                            `<button class="add-video-btn">` +
                            `<i class="fa fa-plus fa-icons black" aria-hidden="true"></i>` +
                            `</button>` +
                            `<button class="thumb-video-btn">` +
                            `<i class="fa fa-thumbs-up fa-icons black" aria-hidden="true"></i>` +
                            `</button>` +
                            `<button class="angle-video-btn">` +
                            `<i class="fa fa-angle-down fa-icons black" aria-hidden="true"></i>` +
                            `</button>` +
                            `<p class="title">${value.movie_name}</p>` +
                            `<p class="duration">Duration: ${value.duration} Minutes</p>` +
                            `<span class="genre">Genre: ${value.genre}</span>` +
                            `</div>` +
                            `</div>` +
                            `</div>`
                        )
                    ])
                }
            })
            owlCarousel.trigger("refresh.owl.carousel");
            owlCarouselAnimated.trigger("refresh.owl.carousel");
        },
        complete: function () {
            callFunctionAfterAjaxCallComplete();
        }
    })

    function callFunctionAfterAjaxCallComplete() {
         $(".item").hover(
          function() {
            var videoDivClass = $(this).data("videodiv");
            //hover-video0
            var videoDiv = document.getElementsByClassName(videoDivClass);
            var link = $(videoDiv).data("video");
            //https://www.xyz.com.mp4
            var videoID = $(videoDiv).data("videoid");
            //hoverID0
            var videoDivQuery = document.querySelector(`.${videoDivClass}`);
            //<div class="hover-video0" data=video="" data-videoid="">
            //<video id="hoverID0"><source src="https://www,xyz.com.mp4"/></video>
            //</div>
            videoDivQuery.innerHTML = `<video autoplay="true" controls muted="false" width="auto" id="${videoID}">
                    <source src="${link}" type="video/mp4"> 
                 </video>`
            
            var videoPlay = document.getElementById(videoID);
             if(videoPlay){
                 videoPlay.style.width = "100%";
                 videoPlay.play();
            }
          }, function() {
            var videoDivClass = $(this).data("videodiv");
            var videoDiv = document.getElementsByClassName(videoDivClass);
            var link = $(videoDiv).data("video");
            var videoID = $(videoDiv).data("videoid");
            var videoDivQuery = document.querySelector(`.${videoDivClass}`);
            videoDivQuery.innerHTML = ``;
          });

          $(".play-video-btn").click(
            function() {
              var videoUrl = $(this).data("videourl");
              console.log(videoUrl);
            });
      };
})


