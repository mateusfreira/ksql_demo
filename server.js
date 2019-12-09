const http = require('http');
const FreiraDb = require('./freira-db.js');


const db = new FreiraDb('ws://127.0.0.1:3012', "mateus", "mateus", "mateus", "mateus_pwd");

const data = JSON.stringify({
    ksql: "select avg(price) from riderSales group by 1 EMIT CHANGES;",
    streamsProperties: {}
})

const options = {
    hostname: 'localhost',
    port: 8088,
    path: '/query',
    method: 'POST',
    headers: {
        'Content-Type': 'application/vnd.ksql.v1+json; charset=utf-8',
        'Content-Length': data.length
    }
}

const req = http.request(options, (res) => {
    res.on('data', (d) => {
        const dataStr = new String(d);
        const rowStr = dataStr.split("String: ")[0].replace('\n', '');
        try {
            if (rowStr.length > 1) {
                console.log(rowStr);
                const {
                    row
                } = JSON.parse(rowStr.replace(/,(\s+)?$/, ''));
                console.log(row);
                db.setValue('salesAvg', row.columns[0]);// 
            }
        } catch (e) {
            console.log(e);
        }
    })
});

req.on('error', (error) => {
    console.error(error)
});
req.write(data)
req.end()
