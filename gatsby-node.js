exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        //   These NPM modules expect 'window' to be defined.
        //   This is a workaround to allow gatsby to build.
        //   See: https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
        rules: [
          {
            test: /html2canvas/,
            use: loaders.null(),
          },
          {
            test: /jspdf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
