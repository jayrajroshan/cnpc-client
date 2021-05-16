var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var vm = [];
    axios.get("https://192.168.0.100:8006/api2/json/nodes/appledore/qemu").then(response => {
        console.log(response)
        vm = response.data.data
        res.render('computer', vm);
    })
});

router.get('/create', function (req, res, next) {
    res.render('create');
});

router.post('/create', async (req, res) => {
    console.log(req.body.os)
    var id = Math.floor(Math.random() * 100) + 1;
    var plan = req.body.plan;
    var cpu = 0;
    var ram = 0;
    console.log(req.body.plan)
    switch (plan) {
        case "Micro":
            cpu = 1;
            ram = 2048;
            break;
        case "Mini":
            cpu = 2;
            ram = 4096;
            break;
        case "Basic":
            cpu = 4;
            ram = 8192;
            break;
        case "Full":
            cpu = 8;
            ram = 12288;
            break;
        case "Super":
            cpu = 16;
            ram = 16384;
            break;
        default:
            cpu = 0;
            ram = 0;
    }
    try {
        data = {
            node: req.body.os + "-" + id,
            vmid: id,
            cores: cpu,
            memory: ram
        }
        console.log("Data to post:" + data)
        axios.post("https://192.168.0.100:8006/api2/json/nodes/appledore/qemu", data).then(response => {
            console.log(response)
        })
        res.redirect('/computer')
    }
    catch {
        console.log("Error")
    }
})

module.exports = router;
