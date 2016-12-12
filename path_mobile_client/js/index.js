var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
var globalData = null;
var hashTable = {};

var timeTable = {
  "Hoboken to 33rd":["HOBOKEN","CHRISTOPHER ST","9TH ST","14TH ST","23RD ST","33RD ST"],
  "33rd to Hoboken":["33RD ST","23RD ST","14TH ST","9TH ST","CHRISTOPHER ST"],
  "Hoboken to WTC":["HOBOKEN","NEWPORT","EXCHANGE PLACE","WORLD TRADE CENTER"],
  "WTC to Hoboken":["WORLD TRADE CENTER","EXCHANGE PLACE","NEWPORT","HOBOKEN"],
  "Journal Square to 33rd":["JOURNAL SQUARE","GROVE ST","NEWPORT","CHRISTOPHER ST","9TH ST","14TH ST","23RD ST","33RD ST"],
  "33rd to Journal Square":["33RD ST","23RD ST","14TH ST","9TH ST","CHRISTOPHER ST","NEWPORT","GROVE ST","JOURNAL SQUARE"],
  "Journal Square to 33rd via Hoboken":["JOURNAL SQUARE","GROVE ST","NEWPORT","HOBOKEN","CHRISTOPHER ST","9TH ST","14TH ST","23RD ST","33RD ST"],
  "33rd to Journal Square via Hoboken":["33RD ST","23RD ST","14TH ST","9TH ST","CHRISTOPHER ST","HOBOKEN","NEWPORT","GROVE ST","JOURNAL SQUARE"],
  "Journal Square to Hoboken":["JOURNAL SQUARE","GROVE ST","NEWPORT","HOBOKEN"],
  "Hoboken to Journal Square":["HOBOKEN","NEWPORT","GROVE ST","JOURNAL SQUARE"],
  "Newark to WTC":["NEWARK","HARRISON","JOURNAL SQUARE","GROVE ST","EXCHANGE PLACE","WORLD TRADE CENTER"],
  "WTC to Newark":["WORLD TRADE CENTER","EXCHANGE PLACE","GROVE ST","JOURNAL SQUARE","HARRISON","NEWARK"]
};

for(key in timeTable){
  hashTable[key] = {};
  for(var i = 0; i < timeTable[key].length; i++)
  hashTable[key][timeTable[key][i]] = {};
}


var timeTableData = {
  "Hoboken to 33rd": []
}

$(document).ready(function(){
  $("a.selection").click(function(){
    $("h3#timetable_header").text(this.text+" - "+n);

      var array_name = timeTable[this.id];
      var path = this.id;
      console.log('path ==', path);
      var arrayLength = array_name.length;
      // $("#timetable_display tr").remove();

      $("#column_headers").html('');
      for (i = 0; i < arrayLength; i++) {
        $("#column_headers").append("<th>" + array_name[i] + "</th>");
      }


      $('#timetable_display tr').not(':first').remove();
      var pathTable = timeTableData[path];
      var html = '';
      for(var i = 1; i < pathTable.length; i++) {
        var row = '';
        for(var j = 0 ; j < array_name.length ; j++) {
          row = row + '<td>' + pathTable[i][array_name[j]] + '</td>';
        }

        html += '<tr>' + row + '</tr>';
      }
      $('#timetable_display tr').first().after(html);
      html = '';
  });

  $.ajax({
    type: 'GET',

    // The URL to make the request to.
    url: 'http://websys3.stern.nyu.edu:7004/api/timesheets',
    contentType: 'application/json',
    xhrFields: {
      // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
      // This can be used to set the 'withCredentials' property.
      // Set the value to 'true' if you'd like to pass cookies to the server.
      // If this is enabled, your server must respond with the header
      // 'Access-Control-Allow-Credentials: true'.
      withCredentials: false
    },

    headers: {
      // Set any custom headers here.
      // If you set any non-simple headers, your server must include these
      // headers in the 'Access-Control-Allow-Headers' response header.
    },

    success: function(data) {
      // Here's where you handle a successful response.
      console.log('data is ==', data);
      globalData = data;
      organiseData(data);
    },

    error: function(error) {
      globalData = error;
      console.log('error is ==', error);
    }
  });

  // $.get("http://websys3.stern.nyu.edu:7004/api/timesheets", function(data){
  //   console.log('data is ==', data);
  //   alert("Data: " + data);
  // });

  $("#alert_icon").click(function(){
    $.ajax({
      type: 'GET',

      // The URL to make the request to.
      url: 'http://websys3.stern.nyu.edu:7004/api/alerts',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },

      headers: {

      },
      success: function(data) {
        console.log('Alerts is ==', data);
        globalAlerts = data.alert;
        showAlerts(data.alert);
      },

      error: function(error) {
        globalAlerts = error;
        console.log('error is ==', error);
      }
    });
  });
});

var organiseData = function(data) {
  for (var i = 0 ; i < data.length ; i++){
    hashTable[data[i].route][data[i].station] = data[i];
  }

  for(path in hashTable) {
    timeTableData[path] = [];
    for(station in hashTable[path]) {
      for(key in hashTable[path][station]) {
        if(key != "_id" && key != "day" && key != "route" && key != "station"  && parseInt(key) != 153 && hashTable[path][station][key] != "") {
          var tempObj = {};
          tempObj[station] = hashTable[path][station][key]
          timeTableData[path][parseInt(key)] = $.extend({}, timeTableData[path][parseInt(key)], tempObj);
        }
      }
    }
  }
  // console.log("hashTable ==", hashTable);
  // console.log("timeTableData ==", timeTableData);
}

var showAlerts = function (alerts) {
  // $('#alert_content li').not(':first').remove();
  // var pathTable = timeTableData[path];
  var html = '';
  if(alerts.length == 0) {
    html = 'No Alerts Are There To See.';
    $('#alert_error').innerHTML = html;
  }
  else {
    $('ul#alert_content > li').remove() ;
    for(var i = 0; i < alerts.length; i++) {
      html += '<li class="alert_items"> <div>' + alerts[i].description + '</div>' + '<div class="date">' + alerts[i].date + '</div></li>';
    }
    // html = 'something';
    console.log('coming here and html is==', html);
    $('ul#alert_content').append(html);
    html = '';
  }

}
