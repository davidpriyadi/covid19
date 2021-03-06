document.addEventListener("DOMContentLoaded", function() {

  loadNav();
  // loadMenu();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".nav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".nav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {

              page = event.target.getAttribute("href").substr(1);
              active(page);
              document.getElementById(page).className ="nav__link nav__link--active";
              console.log(page);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#content-body");
        if (page === "home") {
          covid_ina();
          // globalliveCv19(); 
          cardCorona();
          // carosel();
        } else if (page === "nasional") {
          prov(); 
        }else if (page == "global") {
          covid();
          ytCorona();
          // newsApi();
        }else if (page == "chartnav") {
          console.log("Berhasil");
          chartCovid();
        }else if(page == "maps"){
          offline();
        }
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          // if (page =="home") {
          //   cardCorona()
          //   // carosel();
          // }
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

  function loadMenu() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
  
        // Muat daftar tautan menu
        document.querySelectorAll(".media").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
      }
    };
    xhttp.open("GET", "menu.html", true);
    xhttp.send();
  }
});


// carousel js
function carosel(){
  $('.owl-carousel').owlCarousel({
    loop:true,
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
        }
    }
  }) 
}



//===================================== active link =======================
function active(page) {
  if (page == "chartnav") {
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("home").className ="nav__link";
    document.getElementById("global").className ="nav__link ";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  }else if (page == "home") {
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("chartnav").className ="nav__link";
    document.getElementById("global").className ="nav__link";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  } else if (page == "nasional") {
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("home").className ="nav__link";
    document.getElementById("global").className ="nav__link";
    document.getElementById("chartnav").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  }else if(page == "maps"){
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("home").className ="nav__link";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("chartnav").className ="nav__link";
    document.getElementById("global").className ="nav__link";
  }else{
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("chartnav").className ="nav__link";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("home").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  }
  
//===============================================================================

}
