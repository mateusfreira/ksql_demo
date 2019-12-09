const db = new FreiraDb('ws://127.0.0.1:3012', "mateus", "mateus", "mateus", "mateus_pwd");

db.watch("salesAvg", event => {
    document.querySelector('#salesAvg').innerHTML = parseFloat(event.value).toFixed(2);
})
