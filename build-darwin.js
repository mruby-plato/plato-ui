const packager = require("electron-packager");
const package = require("./package.json");

packager({
  name: package["name"],
  dir: ".",       // source directory
  out: "../bin/", // output directory
  icon: "src/img/icon.icns",  // icon
  platform: "darwin",
  arch: "x64",
  version: "3.0.10",  // Electron version
  overwrite: true,
  asar: false,        // not asar package
  prune: false,
  "app-version": package["version"],  // Application version
  "app-copyright": "Copyright (C) 2018 " + package["author"] + ".",
}, function (err, appPaths) {
    if (err) console.log(err);
    console.log("Done: " + appPaths);
});
