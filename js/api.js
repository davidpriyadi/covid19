const global = "https://api.kawalcorona.com/";
const gbpositif = "https://api.kawalcorona.com/positif/";
const gbsembuh = "https://api.kawalcorona.com/sembuh/";
const gbmeninggal = "https://api.kawalcorona.com/meninggal/";
var base_url = "https://readerapi.codepolitan.com/articles";
var prov_ina = "https://api.kawalcorona.com/indonesia/provinsi/";
var ina = "https://api.kawalcorona.com/indonesia/";
var chart = "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
var maps ="https://opendata.arcgis.com/datasets/0c0f4558f1e548b68a1c82112744bad3_0.geojson";
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
                  viewHtml +=
                  `                
                  <div class="card rounded-lg">
                  <div class="card-body rounded-sm">
                    <div id="float-card">
                      <div>
                        <h6>${no++}.</h6>
                      </div>
                      <div>
                        <h6>${params.attributes.Country_Region}</h6>
                      </div>
                      <div class="">
                        <span id="ina-box text-danger">
                          <i class="material-icons text-danger" id="icon-ina">highlight_off</i>
                          <span id="txt-ina">${params.attributes.Deaths}</span>
                        </span>
                        <span id="ina-box text-warning">
                          <i class="material-icons text-warning" id="icon-ina">check_circle_outline</i>
                          <span id="txt-ina">${params.attributes.Confirmed}</span>
                        </span>
                        <span id="ina-box text-success">
                        <i class="material-icons text-success" id="icon-ina">add_circle_outline</i>
                        <span id="txt-ina">${params.attributes.Recovered}</span>
                        </span>
                      </div>
                    </div>
                  </div>
              </div>
                  `;
                  console.log(params.attributes.Country_Region);
                });
                document.getElementById("menu3").innerHTML = viewHtml; 
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
          viewHtml +=
          `                
          <div class="card rounded-lg">
          <div class="card-body rounded-sm">
            <div id="float-card">
              <div>
                <h6>${no++}.</h6>
              </div>
              <div>
                <h6>${params.attributes.Country_Region}</h6>
              </div>
              <div class="">
                <span id="ina-box text-danger">
                  <i class="material-icons text-danger" id="icon-ina">highlight_off</i>
                  <span id="txt-ina">${params.attributes.Deaths}</span>
                </span>
                <span id="ina-box text-warning">
                  <i class="material-icons text-warning" id="icon-ina">check_circle_outline</i>
                  <span id="txt-ina">${params.attributes.Confirmed}</span>
                </span>
                <span id="ina-box text-success">
                <i class="material-icons text-success" id="icon-ina">add_circle_outline</i>
                <span id="txt-ina">${params.attributes.Recovered}</span>
                </span>
              </div>
            </div>
          </div>
      </div>
          `;

        });
        document.getElementById("menu3").innerHTML = viewHtml; 
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

//==========================Percobaan ============================


function offline() {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(maps).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // data.features.forEach(function (params) {
            //   console.log(params)
            // });
            // console.log(data)
            maps_covid(data);
            resolve(data);
          });
        }
      });
    }

    fetch(maps)
      .then(status)
      .then(json)
      .then(function (data) {
        // data.features.forEach(function (params) {
        //   console.log(params.properties.Provinsi)
        // });
        maps_covid(data);
        console.log(data)
        resolve(data);
      })
      .catch(error);
  });
}

function chartCovid() {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(chart).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // data.features.forEach(function (params) {
            //   console.log(params.attributes.Hari_ke);
            // });
            chart19(data);
            resolve(data);
          });
        }
      });
    }

    fetch(chart)
      .then(status)
      .then(json)
      .then(function (data) {
        // data.features.forEach(function (params) {
        //   console.log(params.attributes.Hari_ke);
        // });
        // // console.log(data.attributes);
        chart19(data);
        resolve(data);
      })
      .catch(error);
  });
}

function chart19(data) {
  var dataLebel = [];
  var dataSet = [];
  var sembuh = [];
  var meninggal = [];
  data.features.forEach(function (params) {
    if (params.attributes.Jumlah_Kasus_Kumulatif != null) {

      // convert date json
      var jsonDate = "\/Date("+params.attributes.Tanggal+")\/";
      var date = new Date(parseInt(jsonDate.substr(6)));
      var tgl = date.format("dd mmm");

      dataLebel.push(tgl);
      sembuh.push(params.attributes.Jumlah_Pasien_Sembuh);  
      dataSet.push(params.attributes.Jumlah_Kasus_Kumulatif);  
      meninggal.push(params.attributes.Jumlah_Pasien_Meninggal);   
    }
  })


  let myChart = document.getElementById('myChart').getContext('2d');

  // Global Options

  let massPopChart = new Chart(myChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:dataLebel,
      datasets:[{
        label:'Terkonfirmasi',
        data:dataSet,
        borderColor: "#3e95cd",
        fill: false
      },{
        label:'Sembuh',
        data:sembuh,
        borderColor: "#8e5ea2",
        fill: false
      },{
        label:'Meninggal',
        data:meninggal,
        borderColor: "#3cba9f",
        fill: false
      }]
    },
    options:{
      title:{
        display:true,
        text:'Grafik Perkembangan Covid Indonesia',
        fontSize:25
      },
      legend:{
        display:true,
        position:'right',
        labels:{
          fontColor:'#FFFF'
        }
      },
      layout:{
        padding:{
          left:50,
          right:0,
          bottom:0,
          top:0
        }
      },
      tooltips:{
        enabled:true
      }
    }
  });
}

//=====================================Maps========================
function maps_covid(data) {
  var mymap = L.map('mapid').setView([-2.46, 117.86], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {

  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/dark-v10',
}).addTo(mymap);


  // $.getJSON("https://opendata.arcgis.com/datasets/0c0f4558f1e548b68a1c82112744bad3_0.geojson",function(data){
  // add GeoJSON layer to the map once the file is loaded
  L.geoJSON(data).bindPopup(function (layer) {
    var content = "<div class='card'>" +
    "<div class='card-header alert-success text-center p-1'><strong>Provinsi<br>" + layer.feature.properties.Provinsi + "</strong></div>" +
    "<div class='card-body p-0'>" +
      "<table class='table table-responsive-sm m-0'>" +
        "<tr class='text-warning'><th><i class='far fa-sad-tear'></i> Kasus Positif</th><th>" + layer.feature.properties.Kasus_Posi + "</th></tr>" +
        "<tr class='text-success'><th><i class='far fa-smile'></i> Kasus Sembuh</th><th>" + layer.feature.properties.Kasus_Semb + "</th></tr>" +
        "<tr class='text-danger'><th><i class='far fa-frown'></i> Kasus Meninggal</th><th>" + layer.feature.properties.Kasus_Meni + "</th></tr>" +
      "</table>" +
    "</div>";
    return content;
}).addTo(mymap);

// });
}