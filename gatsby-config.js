module.exports = {
  siteMetadata: {
    title: `Bearing Chart Generator`,
    description: `Create your own bearing charts for quick reference while sailing!`,
    author: `@bcolwell`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bearing Chart Generator`,
        short_name: `bearings`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/compass.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
  ],
};
