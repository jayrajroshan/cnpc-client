var express = require("express");
var router = express.Router();
const axios = require("axios");
var cookieSring =
  "PVEAuthCookie=PVE:root@pam:60A13D81::bUL69l1JeuJdm6qKfrJ4Z2jZb4tNAB5A2DR++xAwYrNkK0vavVquDok5d+j8LJkuSGaWXbnsxWl6aGcSV7XLVR0haNLq/m5YrD8AYT+96RJOo1+ER4tiRcti+4Q1h40QcgTDxnMF3wM00fFDW/648a2/DauO3Qu2EOB0nAjTS5w23De9WsG/r3KT4Mv7zOdxHGfwZXU5pfdJslCNObxmhSAQtXmMCIx7fV3WtSLOEIbTOxgdGt5//Q8gLu5eySiPvoV1XEFhfsHabn+ofZzg/9Pq4NRe3C6haIBAhRQ1PmnPhS0j3JguO8ZSJs/+effnB9i5bmWiAyHj29jaYmAIeQ==";

/* GET users listing. */
router.get("/", function (req, res, next) {
  var vm = [];
  axios
    .get("https://192.168.0.100:8006/api2/json/nodes/appledore/qemu", {
      headers: {
        Cookie: cookieSring,
      },
    })
    .then((response) => {
      console.log(response);
      vm = response.data.data;
      console.log(JSON.stringify(vm));
      res.render("computer", { vm });
    });
});

router.get("/create", function (req, res, next) {
  res.render("create");
});

router.post("/create", async (req, res) => {
  console.log(req.body.os);
  var id = Math.floor(Math.random() * 100) + 300;
  var plan = req.body.plan;
  var cpu = 0;
  var ram = 0;
  console.log(req.body.plan);
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
      node: "appledore",
      vmid: id,
      cores: cpu,
      memory: ram,
    };
    console.log("Data to post:" + data);
    axios
      .post("https://192.168.0.100:8006/api2/json/nodes/appledore/qemu", data, {
        headers: {
          Cookie: cookieSring,
          "CSRFPreventionToken": "60A13D81:SqVCOHAMbGMCY5u1QSDYFXPRTrjA2TuWWiUyidT+pDU"
        },
      })
      .then((response) => {
        console.log(response);
      });
    res.redirect("/computer");
  } catch {
    console.log("Error");
  }
});

module.exports = router;
