document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav



    loadNav();
   
    function loadNav() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status != 200) return;
   
          // Muat daftar tautan menu
          document.querySelectorAll(".nav").forEach(function(elm) {
            elm.innerHTML = xhttp.responseText;
          });

          document.querySelectorAll(".nav a").forEach(function(elm) {
            elm.addEventListener("click", function(event) {

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              if (page == "about") {
                document.getElementById(page).className ="nav__link nav__link--active";
                document.getElementById("doa").className ="nav__link";
                document.getElementById("global").className ="nav__link ";
                document.getElementById("nasional").className ="nav__link";
              }else if (page == "doa") {
                document.getElementById(page).className ="nav__link nav__link--active";
                document.getElementById("about").className ="nav__link";
                document.getElementById("global").className ="nav__link";
                document.getElementById("nasional").className ="nav__link";
              } else if (page == "nasional") {
                document.getElementById(page).className ="nav__link nav__link--active";
                document.getElementById("about").className ="nav__link";
                document.getElementById("global").className ="nav__link";
                document.getElementById("doa").className ="nav__link";
              }else{
                document.getElementById(page).className ="nav__link nav__link--active";
                document.getElementById("about").className ="nav__link";
                document.getElementById("nasional").className ="nav__link";
                document.getElementById("doa").className ="nav__link";
              }
              document.getElementById(page).className ="nav__link nav__link--active";
              console.log(page);
              loadPage(page);
            });
          });
        }
      };
      xhttp.open("GET", "navbottom.html", true);
      xhttp.send();
    }

    var page = window.location.hash.substr(1);
    if(page == "") page = "global";
    loadPage(page);
    
    function loadPage(page) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          var content = document.querySelector("#body-content");
          
          if (page == "global") {
            covid_ina();
            globalliveCv19();
          }else if (page  == "nasional") {
            prov();
          }
          
          if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
          } else if (this.status == 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
          } else {
            content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
          }
        }
      };
      xhttp.open("GET", "pages/" + page + ".html", true);
      xhttp.send();
    }
  });