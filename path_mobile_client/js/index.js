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

$(document).ready(function(){
  $("a.selection").click(function(){
    $("h3#timetable_header").text(this.text+" - "+n);
    var Timetables = {HobTT:["Hoboken","Christopher St.","9th St.","14th St.","23rd St.","33rd St."],
      TTHob:["33rd St.","23rd St.","14th St.","9th St.","Christopher St."],
      HobWTC:["Hoboken","Newport","Exchange Place","World Trade Center"],
      WTCHob:["World Trade Center","Exchange Place","Newport","Hoboken"],
      JSQTT:["Journal Square","Grove St.","Newport","Christopher St.","9th St.","14th St.","23rd St.","33rd St."],
      TTJSQ:["33rd St.","23rd St.","14th St.","9th St.","Christopher St.","Newport","Grove St.","Journal Square"],
      JSQTTHob:["Journal Square","Grove St.","Newport","Hoboken","Christopher St.","9th St.","14th St.","23rd St.","33rd St."],
      TTJSQHob:["33rd St.","23rd St.","14th St.","9th St.","Christopher St.","Hoboken","Newport","Grove St.","Journal Square"],
      JSQHob:["Journal Square","Grove St.","Newport","Hoboken"],
      HobJSQ:["Hoboken","Newport","Grove St.","Journal Square"],
      NWKWTC:["Newark","Harrison","Journal Square","Grove St.","Exchange Place","World Trade Center"],
      WTCNWK:["World Trade Center","Exchange Place","Grove St.","Journal Square","Harrison","Newark"]
          };
          var array_name = Timetables[this.id];
          var arrayLength = array_name.length;
          $("#column_headers").html('');
          for (i = 0; i < arrayLength; i++) {
            $("#column_headers").append("<th>" + array_name[i] + "</th>");
            }
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
