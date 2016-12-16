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
var SaturdayHashTable = {};
var SundayHashTable = {};
var MondayHashTable = {};
var TuesdayHashTable = {};
var ThursdayHashTable = {};
var WednesdayHashTable = {};
var FridayHashTable = {};

var timeTable = {
  "Hoboken to 33rd":["HOBOKEN","CHRISTOPHER ST","9TH ST","14TH ST","23RD ST","33RD ST"],
  "33rd to Hoboken":["33RD ST","23RD ST","14TH ST","9TH ST","CHRISTOPHER ST","HOBOKEN"],
  "Hoboken to WTC":["HOBOKEN","NEWPORT","EXCHANGE PLACE","WORLD TRADE CENTER"],
  "WTC to Hoboken":["WORLD TRADE CENTER","EXCHANGE PLACE","NEWPORT","HOBOKEN"],
  "Journal Square to 33rd":["JOURNAL SQUARE","GROVE ST","NEWPORT","CHRISTOPHER ST","9TH ST","14TH ST","23RD ST","33RD ST"],
  "33rd to Journal Square":["33RD ST","23RD ST","14TH ST","9TH ST","CHRISTOPHER ST","NEWPORT","GROVE ST","JOURNAL SQUARE"],
  // "Journal Square to 33rd via Hoboken":["JOURNAL SQUARE","GROVE ST","NEWPORT","HOBOKEN","CHRISTOPHER ST","9TH ST","14TH ST","23RD ST","33RD ST"],
  // "33rd to Journal Square via Hoboken":["33RD ST","23RD ST","14TH ST","9TH ST","CHRISTOPHER ST","HOBOKEN","NEWPORT","GROVE ST","JOURNAL SQUARE"],
  "Journal Square to Hoboken":["JOURNAL SQUARE","GROVE ST","NEWPORT","HOBOKEN"],
  "Hoboken to Journal Square":["HOBOKEN","NEWPORT","GROVE ST","JOURNAL SQUARE"],
  "Newark to WTC":["NEWARK","HARRISON","JOURNAL SQUARE","GROVE ST","EXCHANGE PLACE","WORLD TRADE CENTER"],
  "WTC to Newark":["WORLD TRADE CENTER","EXCHANGE PLACE","GROVE ST","JOURNAL SQUARE","HARRISON","NEWARK"]
};

for(key in timeTable){
  hashTable[key] = {};
  // MondayHashTable[key] = {};
  // TuesdayHashTable[key] = {};
  // WednesdayHashTable[key] = {};
  // ThursdayHashTable[key] = {};
  // FridayHashTable[key] = {};
  // SaturdayHashTable[key] = {};
  // SundayHashTable[key] = {};
  for(var i = 0; i < timeTable[key].length; i++) {
    hashTable[key][timeTable[key][i]] = {};
    // SundayHashTable[key][timeTable[key][i]] = {};
    // MondayHashTable[key][timeTable[key][i]] = {};
    // TuesdayHashTable[key][timeTable[key][i]] = {};
    // WednesdayHashTable[key][timeTable[key][i]] = {};
    // ThursdayHashTable[key][timeTable[key][i]] = {};
    // FridayHashTable[key][timeTable[key][i]] = {};
    // SaturdayHashTable[key][timeTable[key][i]] = {};
  }

}


var timeTableData = {
  // "Hoboken to 33rd": []
}

$(document).ready(function(){
  $("a.selection").click(function(){
    $("h3#timetable_header").text(this.text+" - "+n);

      var array_name = timeTable[this.id];
      var path = this.id;
      // console.log('path ==', path);
      $('#timetable_display tr').not(':first').remove();
      if(array_name == null) {
        $("#error").html("<p>No train is scheduled for today for this path.</p>");
        return;
      }
      var arrayLength = array_name.length;
      // $("#timetable_display tr").remove();

      $("#column_headers").html('');
      for (i = 0; i < arrayLength; i++) {
        $("#column_headers").append("<th>" + array_name[i] + "</th>");
      }

      var pathTable = timeTableData[path];
      console.log('path is ==', path);
      console.log('path table ==', pathTable);
      var html = '';
      if(pathTable.length == 0 || pathTable == null) {
        $("#error").html("<p>No train is scheduled for today for this path.</p>");
      }
      else {
        for(var i = 1; i < pathTable.length; i++) {
          var row = '';
          for(var j = 0 ; j < array_name.length ; j++) {
            row = row + '<td>' + pathTable[i][array_name[j]] + '</td>';
          }

          html += '<tr>' + row + '</tr>';
        }
        $('#timetable_display tr').first().after(html);
        html = '';
      }

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
      // console.log('data is ==', data);
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
        // console.log('Alerts is ==', data);
        globalAlerts = data.alert;
        showAlerts(data.alert);
      },

      error: function(error) {
        globalAlerts = error;
        console.log('error is ==', error);
      }
    });
  });



  // Station To Station Click logic
  $("#search_button").click(function() {
    // console.log('coming in search_button logic');
    var from = $("#from")[0].options[$("#from")[0].selectedIndex].value;
    var to = $("#to")[0].options[$("#to")[0].selectedIndex].value;
    console.log('From is ==', from);
    console.log('to is ==', to);

    var possiblePath = findPossiblePath(from, to);
  });
});

var organiseData = function(data) {
  for (var i = 0 ; i < data.length ; i++){
    if(data[i].day == 'Weekday') {
      hashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Monday') {
      if(MondayHashTable[data[i].route] == null) {
        MondayHashTable[data[i].route] = {};
      }
      MondayHashTable[data[i].route][data[i].station] = {};
      MondayHashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Tuesday') {
      if(TuesdayHashTable[data[i].route] == null) {
        TuesdayHashTable[data[i].route] = {};
      }
      TuesdayHashTable[data[i].route][data[i].station] = {};
      TuesdayHashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Wednesday') {
      if(WednesdayHashTable[data[i].route] == null) {
        WednesdayHashTable[data[i].route] = {};
      }
      WednesdayHashTable[data[i].route][data[i].station] = {};
      WednesdayHashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Thursday') {
      if(ThursdayHashTable[data[i].route] == null) {
        ThursdayHashTable[data[i].route] = {};
      }
      ThursdayHashTable[data[i].route][data[i].station] = {};
      ThursdayHashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Friday') {
      if(FridayHashTable[data[i].route] == null) {
        FridayHashTable[data[i].route] = {};
      }
      FridayHashTable[data[i].route][data[i].station] = {};
      FridayHashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Saturday') {
      if(SaturdayHashTable[data[i].route] == null) {
        SaturdayHashTable[data[i].route] = {};
      }
      SaturdayHashTable[data[i].route][data[i].station] = {};
      SaturdayHashTable[data[i].route][data[i].station] = data[i];
    }
    else if(data[i].day == 'Sunday') {
      if(SundayHashTable[data[i].route] == null) {
        SundayHashTable[data[i].route] = {};
      }
      SundayHashTable[data[i].route][data[i].station] = {};
      SundayHashTable[data[i].route][data[i].station] = data[i];
    }
  }

  if(n != 'Saturday' && n != 'Sunday') {
    console.log('hashTable in if ==', hashTable);
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
  }


  var todayHashTable = {};
  console.log('value of n ==', n);
  switch (n) {
    case "Sunday":
        todayHashTable = SundayHashTable;
      break;
    case "Monday":
        todayHashTable = MondayHashTable;
      break;
    case "Tuesday":
        todayHashTable = TuesdayHashTable;
      break;
    case "Wednesday":
        todayHashTable = WednesdayHashTable;
      break;
    case "Thursday":
        todayHashTable = ThursdayHashTable;
      break;
    case "Friday":
        todayHashTable = FridayHashTable;
      break;
    case "Saturday":
        todayHashTable = SaturdayHashTable;
      break;
    default:
      todayHashTable = hashTable;
  }
  // console.log("hashTable before==", hashTable);
  // console.log('todays hashtable ==', todayHashTable);
  // console.log('todays timetable before ==', timeTableData);

  for(path in todayHashTable) {
    timeTableData[path] = [];
    for(station in todayHashTable[path]) {
      for(key in todayHashTable[path][station]) {
        if(key != "_id" && key != "day" && key != "route" && key != "station"  && parseInt(key) != 153 && todayHashTable[path][station][key] != "") {
          var tempObj = {};
          tempObj[station] = todayHashTable[path][station][key]
          timeTableData[path][parseInt(key)] = $.extend({}, timeTableData[path][parseInt(key)], tempObj);
        }
      }
    }
  }
  // console.log("hashTable after==", hashTable);
  console.log("timeTableData afer==", timeTableData);
}

var showAlerts = function (alerts) {
  // $('#alert_content li').not(':first').remove();
  // var pathTable = timeTableData[path];
  var html = '';
  if(alerts.length == 0) {
    //html = 'No recent service alerts at this time.';
    $('#alert_error').html("<p>No recent service alerts at this time.</p>");
  }
  else {
    $('ul#alert_content > li').remove() ;
    // $('ul#alert_content').append('<li><a id="Hoboken to 33rd" class="selection" href="#TimetableContainer">Hoboken to 33rd</a></li>');
    for(var i = 0; i < alerts.length; i++) {
      html += '<li class="alert_items"> <div>' + alerts[i].description + '</div>' + '<div class="date">' + alerts[i].date + '</div></li>';
    }
    // html = 'something';
    // console.log('coming here and html is==', html);
    $('ul#alert_content').append(html);
    html = '';
  }

}

var findPossiblePath = function(from, to) {
  var possibleFromPaths = {};
  var possibleToPaths = {};
  var possiblePaths = {};
  for(key in timeTable) {
    for(var i=0; i < timeTable[key].length; i++) {
      if(timeTable[key][i] == from) {
        possibleFromPaths[key] = i;
        break;
      }
    }
  }

  for(key in possibleFromPaths) {
    for(var i=0; i < timeTable[key].length; i++) {
      if(timeTable[key][i] == to && i > possibleFromPaths[key]) {
        possiblePaths[key] = {from:possibleFromPaths[key], to:i};
        break;
      }
    }
  }

  //$("ul#search_result > li").remove();
  //$("ul#search_result").html("<p><strong>Route Results: </strong></p><br>");
  //var i =10;
  //for(key in possiblePaths) {
    //var html = '<li><a id=' + i + ' class="search_selection" href="#SearchTableContainer">' + key +'</a></li><br>';
    //$("ul#search_result").append(html);
    //i++;	
  //}
  $("#result_container").html("<p><strong>Route Results: </strong></p><br>");
  	$("#result_container").append('<ul data-role="listview" id="search_result" style="list-style: none"></ul>');
	  var i =10;
	  for(key in possiblePaths) {
		var html = '<div class="route_result" style="width:75%"><br><li><a id=' + i + ' class="search_selection" href="#SearchTableContainer">' + key +'</a></li><br></div><br>';
		$("ul#search_result").append(html);
		i++;	
  		}

  $("a.search_selection").click(function(){
    $("h3#searchtable_header").text(this.text+" - "+n);

      var array_name = timeTable[this.text];
      var path = this.text;
      // console.log('path ==', possiblePaths[path].from);
      $('#searchtable_display tr').not(':first').remove();
      if(array_name == null || array_name.length == 0) {
        //html = 'No train is scheduled for today for this path.'
        $("#error").html('<p>No direct routes available at this time.</p>');
        return;
      }
      var arrayLength = array_name.length;
      // $("#timetable_display tr").remove();

      $("#search_column_headers").html('');
      for (i = possiblePaths[path].from; i <= possiblePaths[path].to; i++) {
        $("#search_column_headers").append("<th>" + array_name[i] + "</th>");
      }

      var pathTable = timeTableData[path];
      // console.log('path is ==', path);
      // console.log('path table ==', pathTable);
      var html = '';
      if(pathTable.length == 0 || pathTable == null) {
        $("#error").html("<p>No direct routes available at this time.</p>");
      }
      else {
        var currentTime = new Date();
        var currentHours = currentTime.getHours();
        var currentMinutes = currentTime.getMinutes();

        for(var i = 1; i < pathTable.length; i++) {
          if(compareTimeGreater(pathTable[i][array_name[possiblePaths[path].from]], {hours:currentHours, minutes:currentMinutes})) {
            var row = '';
            for(var j = possiblePaths[path].from ; j <= possiblePaths[path].to ; j++) {
              row = row + '<td>' + pathTable[i][array_name[j]] + '</td>';
            }

            html += '<tr>' + row + '</tr>';
          }
        }
        $('#searchtable_display tr').first().after(html);
        html = '';
      }

  });

  console.log('possiblePaths ==', possiblePaths);
  return possiblePaths;
}

compareTimeGreater = function(str, currentTime) {


  str.trim();
  var ampm = str.substr(str.length-2, 2);
  ampm.trim();
  // console.log('ampm ==', ampm);
  var time = str.substr(0,5);
  time.trim();
  var hours = parseInt(time.split(':')[0]) + (ampm == 'PM' ? 12 : 0);
  var minutes = parseInt(time.split(':')[1]);
  if(hours == 12){
    hours = 0;
  }
  else if(hours == 24){
    hours = 12;
  }

  // console.log('comparing =='+ str + ' :with == ', hours + ' and ' + currentTime.hours .);

  var answer = false;
  if(hours >= currentTime.hours){
    if(minutes>= currentTime.minutes){
      answer = true;
    }
  }
  return answer;
  // console.log(str + 'of hours are ==' + hour);
}
