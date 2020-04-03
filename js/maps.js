//===================================== Maps ========================
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
  
  //=================================== maps end =========================