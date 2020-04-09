const global = "https://api.kawalcorona.com/";
const gbpositif = "https://api.kawalcorona.com/positif/";
const gbsembuh = "https://api.kawalcorona.com/sembuh/";
const gbmeninggal = "https://api.kawalcorona.com/meninggal/";
var prov_ina = "https://api.kawalcorona.com/indonesia/provinsi/";
var chart = "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
var maps ="https://opendata.arcgis.com/datasets/0c0f4558f1e548b68a1c82112744bad3_0.geojson";
var news = "https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=46ecb833db2f4b9584a1dc370a8986a7";


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


// =============================== GLOBAL COVID API =============================================
function covid() {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
        caches.match(global).then(function(response) {
          if (response) {
              response.json().then(function (data) {
                  var viewHtml ="";
                  var no = 1;
                data.forEach(function (params) {
                  viewHtml +=
                  `                
                  <div class="card rounded-lg" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                  <div class="card-body rounded-sm">
                    <ul class="list-unstyled">
                        <li class="media">
                          <h2>${no++}</h2>
                          <div class="media-body">
                            <h5 class="mt-0 mb-1">${params.attributes.Country_Region}</h5>
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
                        </li>
                    </ul>
                  </div>
              </div>
                  `;
                  console.log(params.attributes.Country_Region);
                });
                resolve(data);
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
          <div class="card rounded-lg " uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
          <div class="card-body rounded-sm mb-0">
            <ul class="list-unstyled mb-0">
                <li class="media mb-0">
                  <h3 class="align-self-center">${no++}</h3> 
                  <div class="media-body mb-0" style="margin-left:10px">
                    <h6 class="mt-0 mb-1">${params.attributes.Country_Region}</h6>
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
                </li>
            </ul>
          </div>
      </div>
          `;

        });
        resolve(data);
        document.getElementById("menu3").innerHTML = viewHtml; 
      })
      .catch(error);
  });
  }

// =============================== END GLOBAL COVID API =============================================

  function prov() {
    return new Promise(function (resolve, reject) {
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
                <div class="card rounded-lg " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                <div class="card-body rounded-sm mb-0">
                  <ul class="list-unstyled mb-0">
                      <li class="media mb-0">
                        <h3 class="align-self-center">${no++}</h3> 
                        <div class="media-body mb-0" style="margin-left:10px">
                          <h6 class="mt-0 mb-1">${params.attributes.Provinsi}</h6>
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
                      </li>
                  </ul>
                </div>
            </div>
                `;
                });
                resolve(data);
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
            <div class="card rounded-lg" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
            <div class="card-body rounded-sm mb-0">
              <ul class="list-unstyled mb-0">
                  <li class="media mb-0">
                    <h3 class="align-self-center">${no++}</h3>
                    <div class="media-body mb-0" style="margin-left:10px">
                      <h6 class="mt-0 mb-1">${params.attributes.Provinsi}</h6>
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
                  </li>
              </ul>
            </div>
        </div>
            `; 
        });
        document.getElementById("menu2").innerHTML = viewHtml; 
      }).catch(error);
    });
  }

  function globalliveCv19() {
    return new Promise(function (resolve, reject) {
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
                        <span id="gb-tl-2" >Positif</span>
                    </div>
                </div>
              `;

              resolve(data);
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
                <span id="gb-tl-2">Positif</span>
            </div>
        </div>
      `;
      resolve(data);
      document.getElementById("gb-po").innerHTML = viewHtml;
      console.log(data);
    }).catch(error);

    if ("caches" in window) {
      caches.match(gbsembuh).then(function(response) {
        if (response) {
            response.json().then(function (data) {
              // data.forEach(function (params) {
              //     console.log(params);
              // });
              var viewHtml  = "";
              viewHtml =`
              <div id="gb-tl-n1" class="value-mm">${data.value}</div>
              `;
              resolve(data);
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
      <div id="gb-tl-n1" class="value-mm">${data.value}</div>
      `;
      resolve(data);
      document.getElementById("value-sm").innerHTML = viewHtml;
    }).catch(error);

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
              resolve(data);
              document.getElementById("value-mn").innerHTML = viewHtml;
            });
          }
      })
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
      resolve(data);
      document.getElementById("value-mn").innerHTML = viewHtml;
    }).catch(error);
  })
  }

  // ======================= covid live data indonesia ===========================
  function covid_ina() {
    return new Promise(function (resolve, reject) {
    if ("caches" in window) {
        caches.match(global + "indonesia/").then(function(response) {
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
                                          <span id="gb-tl-2">Positif</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="row text-center">
                              <div class="col">
                                  <div class="card" id="card-global" style="width: 100%;">
                                      <div class="card-body" id="card-body-gb">
                                          <div id="gb-tl-n1" class="value-sm">${params.sembuh}</div>
                                          <span id="gb-tl-n2">Sembuh</span>
                                      </div>
                                  </div>
                              </div>
                              <div class="col">
                                  <div class="card" id="card-global" style="width: 100%;">
                                      <div class="card-body" id="card-body-gb">
                                          <div id="gb-tl-n1" class="value-mm">${params.meninggal}</div>
                                          <span id="gb-tl-n2">Meninggal</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                              `;
                });
                resolve(data);
                document.getElementById("menu-ina").innerHTML = liveDataCV19;
              });
            }
        });
      }
    fetch(global +"indonesia/")
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
                            <span id="gb-tl-2">Positif</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <div class="card" id="card-global" style="width: 100%;">
                        <div class="card-body" id="card-body-gb">
                            <div id="gb-tl-n1" class="value-sm">${params.sembuh}</div>
                            <span id="gb-tl-n2">Sembuh</span>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" id="card-global" style="width: 100%;">
                        <div class="card-body" id="card-body-gb">
                            <div id="gb-tl-n1" class="value-mm">${params.meninggal}</div>
                            <span id="gb-tl-n2">Meninggal</span>
                        </div>
                    </div>
                </div>
            </div>
                `;
        });
        resolve(data);
        document.getElementById("menu-ina").innerHTML = liveDataCV19;
      }).catch(error);
    });
  }


// =============================== MAPS API =============================================
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

// =============================== END MAPS API =============================================

// =============================== CHART LINE API =============================================
function chartCovid() {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(chart).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // data.features.forEach(function (params) {
            //   console.log(params.attributes.Hari_ke);
            // });
            // chart19(data);
            chartPerhari(data);
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
        // chart19(data);
        chartPerhari(data);
        resolve(data);
      })
      .catch(error);
  });
}
// =============================== END CHART LINE API =============================================

// AIzaSyAKA06eqVlySx2Q4W-iGAAArBp1lIv-uqo youtube

//================================== API YOUTUBE ===================================================
const yt = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAKA06eqVlySx2Q4W-iGAAArBp1lIv-uqo&order=viewCount&type=video&maxResults=10&q=edukasi corona&part=snippet";

function ytCorona() {
  return new Promise(function (resolve, reject) {
  if ('caches' in window) {
    caches.match(yt).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var viewHtml = ""
          data.items.forEach(function (params) {
            viewHtml +=`       
            <div class="col mb-4">
              <div class="card">
                <img src="${params.snippet.thumbnails.high.url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${params.snippet.title}</h5>
                  <p>${params.snippet.channelTitle}</p>
                  <p class="card-text">${params.snippet.description}</p>
                  <a href="https://www.youtube.com/watch?v=${params.id.videoId}" class="card-link">Selengkapnya</a>
                </div>
              </div>
            </div>  
          ` 
            console.log(params)
          })
          resolve(data);
          document.getElementById("yt-id").innerHTML = viewHtml;
        });
      }
    });
  }

  fetch(yt)
    .then(status)
    .then(json)
    .then(function (data) {
      var viewHtml = ""
      data.items.forEach(function (params) {
        viewHtml +=`       
        <div class="col mb-4">
          <div class="card">
            <img src="${params.snippet.thumbnails.high.url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${params.snippet.title}</h5>
              <p>${params.snippet.channelTitle}</p>
              <p class="card-text">${params.snippet.description}</p>
              <a href="https://www.youtube.com/watch?v=${params.id.videoId}" class="card-link">Selengkapnya</a>
            </div>
          </div>
        </div>  
      ` 
        console.log(params)
      })
      resolve(data);
      document.getElementById("yt-id").innerHTML = viewHtml;
    })
    .catch(error);
  });
}

function newsApi() {
  return new Promise(function (resolve, reject) {
  if ('caches' in window) {
    caches.match(news).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var viewHtml = "";
          data.articles.forEach(function (params) {
            viewHtml +=`
            
              <div class="col mb-4">
                <div class="card">
                  <img src="${params.urlToImage}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${params.title}</h5>
                    <p>${params.source.name}</p>
                    <p class="card-text">${params.description}</p>
                    <a href="${params.url}" class="card-link">Baca Selengkapnya</a>
                  </div>
                </div>
              </div>
                
            ` 
            console.log(params);
          })
          resolve(data);
          document.getElementById("news-id").innerHTML = viewHtml;
        });
      }
    });
  }

  fetch(news)
    .then(status)
    .then(json)
    .then(function (data) {
      var viewHtml = "";
      data.articles.forEach(function (params) {
        viewHtml +=`       
          <div class="col mb-4">
            <div class="card">
              <img src="${params.urlToImage}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${params.title}</h5>
                <p>${params.source.name}</p>
                <p class="card-text">${params.description}</p>
                <a href="${params.url}" class="card-link">Baca Selengkapnya</a>
              </div>
            </div>
          </div>
            
        ` 
        console.log(params);
      })
      resolve(data);
      document.getElementById("news-id").innerHTML = viewHtml;
      // console.log(data)
    })
    .catch(error);
  });
}


