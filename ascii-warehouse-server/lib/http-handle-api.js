var faces = require('cool-ascii-faces').faces;
var getQueryParams = require('./get-query-params');

var max = getRandomInRange(111, 333)

function getRandomString() {
    return (Math.random()).toString(36).substr(2);
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createRandomItem(i, sort) {
    var min_size = 12;
    var max_size = 40;
    var obj = {
        id: getRandomInRange(0, 100000) + '-' + getRandomString(),
        size: getRandomInRange(min_size, max_size),
        price: getRandomInRange(1, 1000),
        face: faces[i % faces.length],
        date: new Date(Date.now() - getRandomInRange(1, 1000 * 3600 * 24 * 15)).toString()
    };

    if (sort === 'id') {
        obj.id = i + '-' + getRandomString();
    }
    else if (sort === 'size') {
        var floor = Math.floor(i * 0.05);
        obj.size = Math.min(42, min_size + floor);
    }
    else if (sort === 'price') {
        obj.price = Math.min(1000, Math.floor(i * 0.1) + 1);
    }

    //console.log(obj);
    console.log(max);
    return obj;
}

module.exports = function (req, res) {
    var params = getQueryParams(req.url);

    // how many records to fetch
    var limit = parseInt(params.limit, 10) || 10;

    // pagination offset
    var skip = parseInt(params.skip, 10) || 0;

    // sort field
    var sort = params.sort || 'id';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'application/x-json-stream'
    });

    // random delay
    setTimeout(function () {
        var i;
        for (i = 0; i < limit; i += 1) {
            if (i + skip > max) { break }
            res.write(JSON.stringify(createRandomItem(i + skip, sort)) + '\n');
        }
        res.end();
    }, 100 + Math.floor(Math.random() * 3000));
};
