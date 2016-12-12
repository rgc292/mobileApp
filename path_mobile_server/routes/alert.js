/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var request = require('request');
var cheerio = require('cheerio');
//var URL = require('url-parse');
var parse = require('xml-parser');
var inspect = require('util').inspect;
var express = require('express');
var router = express.Router();

/*descriptions = [];
dates = [];*/

var pageToVisit = "http://rss.paalerts.com/rss.aspx?PATH";
/*console.log("Visiting page " + pageToVisit);*/


router.get('/', function(req, res, next) {
   request(pageToVisit, function(error, response, xml) {
	   if(error) {
		 console.log("Error: " + error);
		 return res.send(error);
	   }
	   // Check status code (200 is HTTP OK)
	//   console.log("response is: " + response);
	   if(response.statusCode === 200) {
		 // Parse the document body
	//     console.log('html == ', xml );
		 var obj = parse(xml);
	//     console.log(inspect(obj, { colors: true, depth: Infinity }));
		 var items = obj.root.children[0].children;
		 var realItems = [];
	//     console.log('items, are ==', items);
		 for(var i = 0 ; i < items.length ; i++ )
		 {
			 if(items[i].name == 'item')
			 {
				 realItems.push(items[i]);
			 };
		 }

		var actualItems=[];
		for(var i=0;i<realItems.length;i++)
		{
			var tempObj = {};
			for(var j=0; j< realItems[i].children.length; j++)
			{
				if(realItems[i].children[j].name == 'description') {
					tempObj.description = realItems[i].children[j].content;
					/*descriptions.push(realItems[i].children[j].content);*/
				}
				if(realItems[i].children[j].name == 'pubDate') {
					tempObj.date = realItems[i].children[j].content;
					/*dates.push(realItems[i].children[j].content);*/
				 }
				 }
				actualItems.push(tempObj);
		  }
	
			/*console.log("simplified items ==", actualItems);*/
			return res.json({alert: actualItems});
  
		}
	});
});

module.exports = router;