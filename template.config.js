module.exports = {
  placeholderName: "HelloWorld",
  titlePlaceholder: "Hello App Display Name",
  templateDir: "./template",
  postInitScript: "./post-init.script.js",
  transformManifest: (manifest) => {
    manifest.vars = {
      ...manifest.vars,
      project_name: manifest.name,
    };
    return manifest;
  },
  additionalRenames: [
    {
      from: "template/ios/HelloWorld.xcodeproj/xcshareddata/xcschemes/HelloWorld.xcscheme",
      to: (manifest) =>
        `ios/${manifest.name}.xcodeproj/xcshareddata/xcschemes/${manifest.name}.xcscheme`,
    },
  ],
};
