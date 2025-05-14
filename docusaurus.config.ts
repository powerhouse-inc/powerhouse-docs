import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Powerhouse Academy',
  tagline: 'Get started with the Powerhouse ecosystem',
  favicon: 'img/ph-icon-light.svg',

  // Set the production url of your site here
  url: 'https://powerhouse.academy',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/powerhouse-inc/powerhouse-docs/tree/dev',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: {
          showReadingTime: false,
          editUrl:
            'https://github.com/powerhouse-inc/powerhouse-docs/tree/dev',
          onInlineAuthors: 'ignore',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    algolia: {
      // The application ID provided by Algolia
      appId: '2P4JJIQAAV',
      // Public API key: it is safe to commit it
      apiKey: '0bd7f4aa2b67345a3dff0e2de63075ea',
      indexName: 'powerhouse-academy',
      // Optional: see doc section below
      contextualSearch: true,
      // Remove external URL regex since we're only searching our own docs
      // externalUrlRegex: 'external\\.com|domain\\.com',
      // Update the path replacement to match your docs structure
      replaceSearchResultPathname: {
        from: '/docs/academy/',
        to: '/docs/academy/',
      },
      // Add some search parameters for better results
      searchParameters: {
        // Number of results to show
        hitsPerPage: 10,
        // Enable typo tolerance
        typoTolerance: true,
        // Enable highlighting
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        // Search in specific attributes
        attributesToRetrieve: ['title', 'content', 'tags'],
      },
      // Enable the search page
      searchPagePath: 'search',
    },
    navbar: {
      title: '',
      logo: {
        alt: 'My Site Logo',
        src: 'img/Powerhouse-main.svg',
        srcDark: 'img/Powerhouse-main-light.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'academySidebar',
          position: 'left',
          label: 'Academy',
        },
        {
          type: 'docSidebar',
          sidebarId: 'bookofpowerhouseSidebar',
          position: 'left',
          label: 'Book of Powerhouse',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/powerhouse-inc/powerhouse-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Connect',
              to: 'docs/academy/AdvancedTopics/PowerhouseArchitecture',
            },
            {
              label: 'Reactor',
              to: 'docs/academy/AdvancedTopics/PowerhouseArchitecture',
            },
            {
              label: 'Switchboard',
              to: 'docs/academy/AdvancedTopics/PowerhouseArchitecture',
            },
            {
              label: 'Renown',
              to: 'docs/academy/AdvancedTopics/PowerhouseArchitecture',
            },
            {
              label: 'FAQ',
              to: 'docs/academy/AdvancedTopics/PowerhouseArchitecture',
            },
            {
              label: "Blog",
              to: '/blog'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/h7GKvqDyDP',
            },
            {
              label: 'X',
              href: 'https://x.com/PowerhouseDAO',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/powerhouse-inc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Powerhouse, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
