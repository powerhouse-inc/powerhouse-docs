import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Powerhouse Docs',
  tagline: 'Get started with the Powerhouse applications',
  favicon: 'img/ph-icon-light.svg',

  // Set the production url of your site here
  url: 'https://powerhouse.inc',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'powerhouse-inc', // Usually your GitHub org/user name.
  projectName: 'powerhouse-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
            'https://github.com/powerhouse-inc/powerhouse-docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        srcDark: 'img/Powerhouse-main-light.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'connectSidebar',
          position: 'left',
          label: 'Connect',
        },
        {
          type: 'docSidebar',
          sidebarId: 'switchboardSidebar',
          position: 'left',
          label: 'Switchboard',
        },
        {
          type: 'docSidebar',
          sidebarId: 'fusionSidebar',
          position: 'left',
          label: 'Fusion',
        },
        {
          type: 'docSidebar',
          sidebarId: 'faqSidebar',
          position: 'left',
          label: 'FAQ',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
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
              to: '/docs/connect/intro',
            },
            {
              label: 'Fusion',
              to: '/docs/fusion/intro',
            },
            {
              label: 'Switchboard',
              to: '/docs/switchboard/intro',
            },
            {
              label: 'FAQ',
              to: '/docs/faq/intro',
            },
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
