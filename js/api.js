const global = "https://api.kawalcorona.com/";
const gbpositif = "https://api.kawalcorona.com/positif/";
const gbsembuh = "https://api.kawalcorona.com/sembuh/";
const gbmeninggal = "https://api.kawalcorona.com/meninggal/";
var base_url = "https://readerapi.codepolitan.com/articles";
var prov_ina = "https://api.kawalcorona.com/indonesia/provinsi/";
var ina = "https://api.kawalcorona.com/indonesia/";

//Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}


function covid() {
    if ("caches" in window) {
        caches.match(global).then(function(response) {
          if (response) {
              response.json().then(function (data) {
                  var viewHtml ="";
                  var no = 1;
                data.forEach(function (params) {
                    viewHtml += `
                    <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            ${no++} | ${params.attributes.Country_Region}
                        </div>
                      </div>
                    </div>
                    `
                    console.log(params);
                });
                document.getElementById("menu1").innerHTML = viewHtml;
              });
            }
        });
      }
    fetch(global)
      .then(status)
      .then(json)
      .then(function(data) {
          var viewHtml ="";
          var no = 1;
        data.forEach(function (params) {
            viewHtml += `
            <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    ${no++} | ${params.attributes.Country_Region}
                </div>
              </div>
            </div>
            `;      
            // console.log(params.attributes.Country_Region);
        });
        document.getElementById("menu1").innerHTML = viewHtml;
      });
  }

  function prov() {
    if ("caches" in window) {
        caches.match(prov_ina).then(function(response) {
          if (response) {
              response.json().then(function (data) {
                var viewHtml = "";
                var no = 1;
                data.forEach(function (params) {
                    console.log(params);
                viewHtml +=
                `                
                <div class="card rounded-lg">
                <div class="card-body rounded-sm">
                  <div id="float-card">
                    <div>
                      <h6>${no++}.</h6>
                    </div>
                    <div>
                      <h6>${params.attributes.Provinsi}</h6>
                    </div>
                    <div class="">
                      <span id="ina-box text-danger">
                        <i class="material-icons text-danger" id="icon-ina">highlight_off</i>
                        <span id="txt-ina">${params.attributes.Kasus_Meni}</span>
                      </span>
                      <span id="ina-box text-warning">
                        <i class="material-icons text-warning" id="icon-ina">check_circle_outline</i>
                        <span id="txt-ina">${params.attributes.Kasus_Posi}</span>
                      </span>
                      <span id="ina-box text-success">
                      <i class="material-icons text-success" id="icon-ina">add_circle_outline</i>
                      <span id="txt-ina">${params.attributes.Kasus_Semb}</span>
                      </span>
                    </div>
                  </div>
                </div>
            </div>
                `;
                });
                document.getElementById("menu2").innerHTML = viewHtml; 
              });
            }
        });
      }
    fetch(prov_ina)
      .then(status)
      .then(json)
      .then(function(data) {
        var viewHtml = "";
        var no = 1;
        data.forEach(function (params) {  
            console.log(params);
            viewHtml +=
            `                
            <div class="card rounded-lg">
            <div class="card-body rounded-sm">
              <div id="float-card">
                <div>
                  <h6>${no++}.</h6>
                </div>
                <div>
                  <h6>${params.attributes.Provinsi}</h6>
                </div>
                <div class="">
                <span id="ina-box text-danger">
                  <i class="material-icons text-danger" id="icon-ina">highlight_off</i>
                  <span id="txt-ina">${params.attributes.Kasus_Meni}</span>
                </span>
                <span id="ina-box text-warning">
                  <i class="material-icons text-warning" id="icon-ina">check_circle_outline</i>
                  <span id="txt-ina">${params.attributes.Kasus_Posi}</span>
                </span>
                <span id="ina-box text-success">
                <i class="material-icons text-success" id="icon-ina">add_circle_outline</i>
                  <span id="txt-ina">${params.attributes.Kasus_Semb}</span>
                </span>
              </div>
              </div>
            </div>
        </div>
            `;
        });
        document.getElementById("menu2").innerHTML = viewHtml; 
      });
  }

  function globalliveCv19() {
    if ("caches" in window) {
      caches.match(gbpositif).then(function(response) {
        if (response) {
            response.json().then(function (data) {
              var viewHtml = " ";
              // data.forEach(function (params) {
              //     console.log(params);
              // });
              viewHtml =`
                <div class="card" id="card-global">
                    <div class="card-body" id="card-body-gb">
                        <div id="gb-tl-1">${data.value}</div>
                        <span id="gb-tl-2" class="text-warning">Positif</span>
                    </div>
                </div>
              `;
              document.getElementById("gb-po").innerHTML = viewHtml;
            }); 
          }
      });
    }
  fetch(gbpositif)
    .then(status)
    .then(json)
    .then(function(data) {
      var viewHtml = " ";
      // data.forEach(function (params) {
      //     console.log(params);
      // });
      viewHtml =`
        <div class="card" id="card-global">
            <div class="card-body" id="card-body-gb">
                <div id="gb-tl-1">${data.value}</div>
                <span id="gb-tl-2" class="text-warning">Positif</span>
            </div>
        </div>
      `;
      document.getElementById("gb-po").innerHTML = viewHtml;
      console.log(data);
    });

    if ("caches" in window) {
      caches.match(gbsembuh).then(function(response) {
        if (response) {
            response.json().then(function (data) {
              // data.forEach(function (params) {
              //     console.log(params);
              // });
              var viewHtml  = "";
              viewHtml =`
              <div id="gb-tl-n1" class="value-sm">${data.value}</div>
              `;
              document.getElementById("value-sm").innerHTML = viewHtml;
            });
          }
      });
    }
  fetch(gbsembuh)
    .then(status)
    .then(json)
    .then(function(data) {
      // data.forEach(function (params) {  
      //     console.log(params);
      // });
      var viewHtml  = "";
      viewHtml =`
      <div id="gb-tl-n1" class="value-sm">${data.value}</div>
      `;
      document.getElementById("value-sm").innerHTML = viewHtml;
    });

    if ("caches" in window) {
      caches.match(gbmeninggal).then(function(response) {
        if (response) {
            response.json().then(function (data) {
              // data.forEach(function (params) {
              //     console.log(params);
              // });
              var viewHtml  = "";
              viewHtml =`
              <div id="gb-tl-n1" class="value-sm">${data.value}</div>
              `;
              document.getElementById("value-mn").innerHTML = viewHtml;
            });
          }
      });
    }
  fetch(gbmeninggal)
    .then(status)
    .then(json)
    .then(function(data) {
      // data.forEach(function (params) {  
      //     console.log(params);
      // });
      console.log(data);
      var viewHtml  = "";
      viewHtml =`
      <div id="gb-tl-n1" class="value-sm">${data.value}</div>
      `;
      document.getElementById("value-mn").innerHTML = viewHtml;
    });
  }

  // covid live data indonesia
  function covid_ina() {
    if ("caches" in window) {
        caches.match(ina).then(function(response) {
          if (response) {
              response.json().then(function (data) {
                var liveDataCV19 =""
                data.forEach(function (params) {
                    console.log(params.name);
                              liveDataCV19 = `
                          <div class="row text-center">
                              <div class="col col-md-12 mt-1">
                                  <div class="card" id="card-global">
                                      <div class="card-body" id="card-body-gb">
                                          <div id="gb-tl-1">${params.positif}</div>
                                          <span id="gb-tl-2" class="text-warning">Positif</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="row text-center">
                              <div class="col">
                                  <div class="card" id="card-global" style="width: 100%;">
                                      <div class="card-body" id="card-body-gb">
                                          <div id="gb-tl-n1">${params.sembuh}</div>
                                          <span id="gb-tl-n2" class="text-success">Sembuh</span>
                                      </div>
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="card" id="card-global" style="width: 100%;">
                                      <div class="card-body" id="card-body-gb">
                                          <div id="gb-tl-n1">${params.meninggal}</div>
                                          <span id="gb-tl-n2" class="text-danger">Meninggal</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                              `;
                });
                document.getElementById("menu-ina").innerHTML = liveDataCV19;
              });
            }
        });
      }
    fetch(ina)
      .then(status)
      .then(json)
      .then(function(data) {
        var liveDataCV19 = "";
        data.forEach(function (params) {  
            console.log(params.name);
            liveDataCV19 = `
            <div class="row text-center">
                <div class="col col-md-12 mt-1">
                    <div class="card" id="card-global">
                        <div class="card-body" id="card-body-gb">
                            <div id="gb-tl-1">${params.positif}</div>
                            <span id="gb-tl-2" class="text-warning">Positif</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <div class="card" id="card-global" style="width: 100%;">
                        <div class="card-body" id="card-body-gb">
                            <div id="gb-tl-n1">${params.sembuh}</div>
                            <span id="gb-tl-n2" class="text-success">Sembuh</span>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" id="card-global" style="width: 100%;">
                        <div class="card-body" id="card-body-gb">
                            <div id="gb-tl-n1">${params.meninggal}</div>
                            <span id="gb-tl-n2" class="text-danger">Meninggal</span>
                        </div>
                    </div>
                </div>
            </div>
                `;
        });
        document.getElementById("menu-ina").innerHTML = liveDataCV19;
      });
  }

