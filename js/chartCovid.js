function chartPerhari(data) {

    // var lebel
    var dataLebel = [];

    //var perkembangan 
    var dataSet = [];
    var sembuh = [];
    var meninggal = [];

    //variabel kasus perhari
    var kasusBaru = [];
    var penambahanPasenDirawat = [];
    var penambahanPasienSembuh = [];
    var penambahanPasienMeninggal = [];

    // looping array
    data.features.forEach(function (params) {
      if (params.attributes.Jumlah_Kasus_Kumulatif != null) {
  
       // convert date json
        var jsonDate = "\/Date("+params.attributes.Tanggal+")\/";
        var date = new Date(parseInt(jsonDate.substr(6)));
        var tgl = date.format("dd mmm");
  
        // push array lebel
        dataLebel.push(tgl);

        // push array perkembangan
        sembuh.push(params.attributes.Jumlah_Pasien_Sembuh);  
        dataSet.push(params.attributes.Jumlah_Kasus_Kumulatif);  
        meninggal.push(params.attributes.Jumlah_Pasien_Meninggal);   
        // push array kasus perhari
        kasusBaru.push(params.attributes.Jumlah_Kasus_Baru_per_Hari);  
        penambahanPasenDirawat.push(params.attributes.Jumlah_Kasus_Dirawat_per_Hari);  
        penambahanPasienSembuh.push(params.attributes.Jumlah_Kasus_Sembuh_per_Hari);   
        penambahanPasienMeninggal.push(params.attributes.Jumlah_Kasus_Meninggal_per_Hari);   
      }
    })
//=================================== Perkembangan ======================================
    var ctxL = document.getElementById("myChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
            labels: dataLebel,
            datasets: [{
              label: "Terkonfirmasi",
              data: dataSet,
              borderColor: "#F1FC0B"
              },
              {
                label:'Sembuh',
                data:sembuh,
                borderColor: "#0AC824",
                pointBackgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              {
                label:'Meninggal',
                data:meninggal,
                borderColor: "#FC0B0B",
                pointBackgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
              ]
            },
              options: {
              responsive: true,
                legend: {
                  labels: {
                    fontColor: 'white'
                  }
                },
                scales: {
                  // pointLabels :{
                  //     fontStyle: "bold",
                  // },
                  yAxes: [{
                      ticks: {
                          fontColor : "#fff",
  
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                          zeroLineColor :"rgb(24,32,37)",
  
                      } 
                  }],
                  xAxes: [{
                      ticks:{
                          fontColor : "#fff",
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                      }
                  }]
              },
              }
    });

// ================================ END =================================

// ==================================== Chart Penambahan Kasus ======================================
    var ctxL = document.getElementById("chartPenambahanKasus").getContext('2d');
    var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
            labels: dataLebel,
            datasets: [{
              label: "Penambahan Kasus Baru Perhari",
              data: kasusBaru,
              borderColor: "#FF3342"
              }
              ]
            },
              options: {
              responsive: true,
                legend: {
                  labels: {
                    fontColor: 'white'
                  }
                },
                scales: {
                  // pointLabels :{
                  //     fontStyle: "bold",
                  // },
                  yAxes: [{
                      ticks: {
                          fontColor : "#fff",
  
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                          zeroLineColor :"rgb(24,32,37)",
  
                      } 
                  }],
                  xAxes: [{
                      ticks:{
                          fontColor : "#fff",
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                      }
                  }]
              },
              }
    });

// ==================================== End Chart Penambahan Kasus ======================================



// ==================================== Chart Penambahan Pasien ======================================
    var ctxL = document.getElementById("chartPenambahanPasien").getContext('2d');
    var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
            labels: dataLebel,
            datasets: [{
              label: "Penambahan Pasien dirawat Perhari",
              data: penambahanPasenDirawat,
              borderColor: "#FF5733"
              }
              ]
            },
              options: {
              responsive: true,
                legend: {
                  labels: {
                    fontColor: 'white'
                  }
                },
                scales: {
                  // pointLabels :{
                  //     fontStyle: "bold",
                  // },
                  yAxes: [{
                      ticks: {
                          fontColor : "#fff",
  
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                          zeroLineColor :"rgb(24,32,37)",
  
                      } 
                  }],
                  xAxes: [{
                      ticks:{
                          fontColor : "#fff",
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                      }
                  }]
              },
              }
    });

// ==================================== End Chart Penambahan Pasien ======================================


// ==================================== Chart Penambahan Sembuh perhari ======================================
    var ctxL = document.getElementById("chartPenambahanPasienSembuh").getContext('2d');
    var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
            labels: dataLebel,
            datasets: [{
              label: "Penambahan Pasien Sembuh Perhari",
              data: penambahanPasienSembuh,
              borderColor: "#0AB42E"
              }
              ]
            },
              options: {
              responsive: true,
                legend: {
                  labels: {
                    fontColor: 'white'
                  }
                },
                scales: {
                  // pointLabels :{
                  //     fontStyle: "bold",
                  // },
                  yAxes: [{
                      ticks: {
                          fontColor : "#fff",
  
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                          zeroLineColor :"rgb(24,32,37)",
  
                      } 
                  }],
                  xAxes: [{
                      ticks:{
                          fontColor : "#fff",
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                      }
                  }]
              },
              }
    });

// ==================================== End Chart Penambahan Sembuh perhari ======================================


// ==================================== Chart Penambahan Meninggal perhari ======================================
    var ctxL = document.getElementById("chartPenambahanPasienMeninggal").getContext('2d');
    var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
            labels: dataLebel,
            datasets: [{
              label: "Penambahan Pasien Meninggal Perhari",
              data: penambahanPasienMeninggal,
              borderColor: "#F8034D"
              }
              ]
            },
              options: {
              responsive: true,
                legend: {
                  labels: {
                    fontColor: 'white'
                  }
                },
                scales: {
                  // pointLabels :{
                  //     fontStyle: "bold",
                  // },
                  yAxes: [{
                      ticks: {
                          fontColor : "#fff",
  
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                          zeroLineColor :"rgb(24,32,37)",
  
                      } 
                  }],
                  xAxes: [{
                      ticks:{
                          fontColor : "#fff",
                      },
                      gridLines:{
                          color: "rgb(24,32,37)",
                      }
                  }]
              },
              }
    });

// ==================================== End Chart Penambahan Meninggal perhari ======================================
}