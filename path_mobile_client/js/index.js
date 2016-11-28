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
});
