document.addEventListener("DOMContentLoaded", function() {

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
  if (page == "") page = "global";
  loadPage(page);

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#content-body");
        if (page === "global") {
          covid_ina();
          globalliveCv19();
        } else if (page === "nasional") {
          prov(); 
          var v = "An" + 0;
          console.log(v);
        }else if (page == "doa") {
          covid();
        }else if (page == "about") {
          console.log("Berhasil");
          chartCovid();
        }else if(page == "maps"){
          offline();
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




//===================================== active link =======================
function active(page) {
  if (page == "about") {
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("doa").className ="nav__link";
    document.getElementById("global").className ="nav__link ";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  }else if (page == "doa") {
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("about").className ="nav__link";
    document.getElementById("global").className ="nav__link";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  } else if (page == "nasional") {
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("about").className ="nav__link";
    document.getElementById("global").className ="nav__link";
    document.getElementById("doa").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  }else if(page == "maps"){
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("about").className ="nav__link";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("doa").className ="nav__link";
    document.getElementById("global").className ="nav__link";
  }else{
    document.getElementById(page).className ="nav__link nav__link--active";
    document.getElementById("about").className ="nav__link";
    document.getElementById("nasional").className ="nav__link";
    document.getElementById("doa").className ="nav__link";
    document.getElementById("maps").className ="nav__link";
  }  
}