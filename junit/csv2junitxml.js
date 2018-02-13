var fs = require('fs');
var csvParse = require('csv-parse');
var sprintf = require('sprintf-js').sprintf;
var vsprintf = require('sprintf-js').vsprintf;


var count = 0;
var ecount = 0;
var fcount = 0;
var totaltime = 0;

if (process.argv.length < 3) {
    console.error('lack argument.');
    process.exit(1);
}

var rs = null;
var testname = "";
try {
    testname = process.argv[2];
    rs = fs.createReadStream(process.argv[2], 'utf-8');
    rs.on('error', function (err) {
	console.error(err);
	process.exit(1);
    });
}
catch (err) {
    console.error(err);
    process.exit(1);
}

var parser = csvParse({ delimiter: '\t' });

var datas = [];
parser.on('data', function (line) {
//    console.log(line);
// testcasename\tresult\ttime\tmessage\tdescs
    var o = {name:line[0], time:line[2], result:line[1],message:line[3], desc:line[4]};

    if (o.result == 'error') {
	ecount++;
    } else if (o.result == 'fail') {
	fcount++;
    } else if (o.result == 'ok') {
	
    } else if (o.result == 'skip')  				     {
	return;
    }
    datas.push(o);    
    var fval = parseFloat(o.time);
    if (fval) totaltime += fval;
//    console.log(totaltime);
    count++;
});
parser.on('end', function (data) {
//    console.log("end");
    finish();
});
parser.on('error', function (err) {
    console.error("error:", err);
    process.exit(1);
});

rs.pipe(parser);


function finish()
{
    console.log('<?xml version="1.0" ?>');
    var i = 0;
    var n = sprintf('<testsuite name="%s" tests="%d" errors="%d" failures="%d" time="%g">', testname, count, ecount, fcount, totaltime);
    console.log(n);
    while (i < count) {
	var data = datas[i];
	var s = sprintf('<testcase classname="" name="%s" time="%s">', data.name, data.time);
	var t = '';
        var ss = '';
        ss += s;
	if (data.result == 'error') {
	    t = sprintf('<error message="%s">%s</error>', data.message, data.desc);
	} else if (data.result == 'fail') {
	    t = sprintf('<failure message="%s">%s</failure>', data.message, data.desc);
	} else if (data.result == 'ok') {

	} else if (data.result == 'skip')  				     {
	    t = sprintf('<skipped/>');
	} else {
	    i++;
	    continue;
	}
	ss += t;
	ss += '</testcase>';
	console.log(ss);
	i++;
    }
    console.log('</testsuite>');    
}
