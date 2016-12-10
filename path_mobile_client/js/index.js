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
      $("#column_headers").html('');
      for (i = 0; i < arrayLength; i++) {
        $("#column_headers").append("<th>" + array_name[i] + "</th>");
      }

      var pathTable = timeTableData[path];
      // console.log('Hoboken ==', timeTableData['Hoboken to 33rd'][1]['HOBOKEN']);
      var html = '';
      // console.log('array_name ==', array_name);
      for(var i = 1; i < pathTable.length; i++) {
        // console.log('Hoboken ==', timeTableData['Hoboken to 33rd'][i]['HOBOKEN']);
        var row = '';
        for(var j = 0 ; j < array_name.length ; j++) {
          row = row + '<td>' + pathTable[i][array_name[j]] + '</td>';
        }
        // console.log('row is ==', row);
        // html += '<tr><td>' + pathTable[i]['HOBOKEN'] + '</td><td>' +
        //    pathTable[i]['CHRISTOPHER ST'] + '</td><td>' +
        //    pathTable[i]['9TH ST'] + '</td><td>' +
        //    pathTable[i]['14TH ST'] + '</td><td>' +
        //    pathTable[i]['23RD ST'] + '</td><td>' +
        //    pathTable[i]['33RD ST'] + '</td></tr>' ;
        html += '<tr>' + row + '</tr>';
      }
      $('#timetable_display tr').first().after(html);
  });

  $.ajax({

    // The 'type' property sets the HTTP method.
    // A value of 'PUT' or 'DELETE' will trigger a preflight request.
    type: 'GET',

    // The URL to make the request to.
    url: 'http://websys3.stern.nyu.edu:7004/api/timesheets',

    // The 'contentType' property sets the 'Content-Type' header.
    // The JQuery default for this property is
    // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
    // a preflight. If you set this value to anything other than
    // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
    // you will trigger a preflight request.
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
      // Here's where you handle an error response.
      // Note that if the error was due to a CORS issue,
      // this function will still fire, but there won't be any additional
      // information about the error.
      console.log('error is ==', error);
    }
  });

  // $.get("http://websys3.stern.nyu.edu:7004/api/timesheets", function(data){
  //   console.log('data is ==', data);
  //   alert("Data: " + data);
  // });
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
  console.log("hashTable ==", hashTable);
  console.log("timeTableData ==", timeTableData);
}
