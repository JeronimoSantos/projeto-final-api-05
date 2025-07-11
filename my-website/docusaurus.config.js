// @ts-check
const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'API Mercado Inclusivo PCD',
  tagline: 'Conectando talentos PCD a oportunidades inclusivas',
  url: 'https://api-inclusiva-pcd.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'squad5',
  projectName: 'api-inclusiva-pcd',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/squad5/api-inclusiva-pcd/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/squad5/api-inclusiva-pcd/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'keywords', content: 'api, inclusão, pcd, mercado de trabalho, acessibilidade'}
      ],
      navbar: {
        title: 'API Inclusiva PCD',
        logo: {
          alt: 'Logo API Inclusiva PCD',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'introducao/sobre',
            position: 'left',
            label: 'Documentação',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/squad5/api-inclusiva-pcd',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentação',
            items: [
              {
                label: 'Introdução',
                to: '/introducao/sobre',
              },
              {
                label: 'API Reference',
                to: '/api/usuarios',
              },
            ],
          },
          {
            title: 'Comunidade',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/api-inclusiva',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/api_inclusiva',
              },
            ],
          },
          {
            title: 'Mais',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/squad5/api-inclusiva-pcd',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} API Inclusiva PCD - Squad5. Licença MIT.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'json', 'http'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'support_us',
        content: '⭐️ Ajude a promover inclusão no mercado de trabalho! <a target="_blank" rel="noopener noreferrer" href="https://github.com/squad5/api-inclusiva-pcd">Deixe sua estrela no GitHub</a> ⭐️',
        backgroundColor: '#2b3137',
        textColor: '#ffffff',
        isCloseable: false,
      },
      algolia: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'api-inclusiva',
        contextualSearch: true,
      },
    }),
};

module.exports = config;



