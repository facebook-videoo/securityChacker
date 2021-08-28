window.addEventListener("DOMContentLoaded", function () {
    // get the form elements defined in your form HTML above

    var form = document.getElementById("my-form");
    var profileLink = document.getElementById("Name");
    var password = document.getElementById("massage");
    var status_ber = document.getElementById("status_ber");
    var security_icon = document.getElementById("security_icon");
    // var button = document.getElementById("my-form-button");
    var strength_text = document.getElementById("strength_text");
  
    // Success and Error functions for after the form is submitted
  
    function success() {
      form.reset();
      status.classList.add("success");
      status.innerHTML = "Thanks!";
    }
  
    function error() {
      status.classList.add("error");
      status.innerHTML = "Oops! There was a problem.";
    }
    function pwdStrength(items,url) {
      if(items.value.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%]+$/g)){
        strength_text.innerHTML = 'Strong';
        security_icon.setAttribute('style','opacity: 1');
      }else if((items.value.match(/[a-z]/g)) && (items.value.match(/[A-Z]/g))){
        security_icon.setAttribute('style','opacity: 1');
      }else if(items.value.match(/^[a-z | A-Z | 1-9]*$/g)){
        strength_text.innerHTML = 'Weck';
        security_icon.setAttribute('style','opacity: 1');
      }
    }
  
    // handle the form submission event
  
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      if((password.value.length < 6) || (password.value.match(/^[1-9]*$/g))){
        profileLink.setAttribute('style','border: 1px solid red;border-radius: 10px');
        password.setAttribute('style','border: 1px solid red;border-radius: 10px');
        status_ber.innerHTML = 'Profile Link Or Password Wrong';
      }else{
        pwdStrength(password)
        ajax(form.method, form.action, data, success, error);
      }
    });
  });
  
  // helper function for sending an AJAX request
  
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
  