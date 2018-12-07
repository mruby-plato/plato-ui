const packager = require("electron-packager");
const package = require("./package.json");

packager({
  name: package["name"],
  dir: ".",       // source directory
  out: "../bin/", // output directory
  icon: "src/img/icon.ico",   // icon
  platform: "win32",
  arch: "ia32",
  version: "3.0.10",  // Electron version
  overwrite: true,
  asar: false,        // not asar package
  prune: false,
  "app-version": package["version"],  // Application version
  "app-copyright": "Copyright (C) 2018 " + package["author"] + ".",

  "version-string": { // opntions for Windows
    CompanyName: "SCSK KYUSHU CORP.",
    FileDescription: package["name"],
    OriginalFilename: "electron.exe",
    ProductName: package["name"],
    InternalName: package["name"]
  }
}, function (err, appPaths) {
  if (err) console.log(err);
  console.log("Done: " + appPaths);
});
