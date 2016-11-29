command1 = 'mongoimport -d mobile -c timesheets --type csv --file timesheet.csv --headerline';
command2 = 'mongo mobile --eval "db.dropDatabase()"';

const exec = require('child_process').exec;

load_data = function(){

	exec(command2, (error, stdout, stderr) => {
	
		if (error) {
		
			console.error('exec error: ${error}');
			return;
			
		} 
		
		else {
		
		    /*console.log('Works');*/
			exec(command1, (error, stdout, stderr) => {
			
				if (error) {
				
					console.error('exec error: ${error}');
					return;
					
				}
			});
		}
	});
};

setInterval(function(){
    /*console.log('Interval');*/
    load_data();
}, 30*1000);



module.exports = load_data();