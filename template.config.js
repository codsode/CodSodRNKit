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
};
