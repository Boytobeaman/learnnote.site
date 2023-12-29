const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://www.learnnote.site',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: 'https://www.learnnote.site/images/icon.png',
    logoLink: 'https://www.learnnote.site',
    title:
      "learnnote.site",
    githubUrl: 'https://github.com/Boytobeaman/learnnote.site',
    helpUrl: '',
    tweetText: '',
    social: ``,
    links: [{ text: 'ChatGPT中文网', link: 'https://www.chatgpt-use.com/' }],
    search: {
      enabled: true,
      indexName: 'test-doc',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/codeblock',
      '/graphql',
    ],
    collapsedNav: [
      '/codeblock', // add trailing slash if enabled above
    ],
    links: [{ text: 'Hasura', link: '' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "<div class='greenCircle'></div>",
  },
  siteMetadata: {
    title: 'Front end learn note, HTML, CSS, JAVASCRIPT',
    description: 'front end learn note, HTML, CSS, JAVASCRIPT',
    ogImage: null,
    docsLocation: 'https://github.com/Boytobeaman/learnnote.site/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
  pwa: {
    enabled: true, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
