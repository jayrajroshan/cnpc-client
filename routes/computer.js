var express = require("express");
var router = express.Router();
const axios = require("axios");

var token = require("../token.json");
var cookieSring = "PVEAuthCookie=" + token.data.ticket;

// var cookieSring =
//   "PVEAuthCookie=PVE:root@pam:60A1CB95::tXC4ARb/SxZfv1NfcCcBv355a1kiluPdVd9HNl5NXZq73CXa135Pixy3OEu1tsgH5psK/DWgUzwcyBW9Dr1FMIuaHg86h+z43iwSLeO5D4UutVD6c0ucNTzxYtkF3BCQbbjayixss54CyI0gieu00zxA/Xg/hkDuK8q3RktJKIZu5+yarFu93XB5IiU05WmxaNvHlqPtIv0oVaY4LnMX1AUo+CmBIk5LFdak1dE1BmENk4lgWf3+Vr5fUNzqXdivksfit33I1TkLpwRCSThWhTBxxslrWjlanpqThcINwgT/sxl5KEDeG1tMcMk3aqXIo7Oq4kwK0BqJxSczeK9nBw==";

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
          "CSRFPreventionToken": token.data.CSRFPreventionToken
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
