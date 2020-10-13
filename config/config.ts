// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      // component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
              hideInMenu: true,
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
              hideInMenu: true,
            },
            {
              name: 'blog.blogs',
              icon: 'table',
              path: '/blogs',
              component: './blogs',
            },
            {
              name: 'blog.types',
              icon: 'table',
              path: '/types',
              component: './types',
            },
            {
              name: 'blog.tags',
              icon: 'table',
              path: '/tags',
              component: './tags',
              hideInMenu : true,
            },
            {
              name: 'blog.archives',
              icon: 'table',
              path: '/archives',
              component: './archives',
            },
            {
              name: 'blog.timeAxis',
              icon: 'table',
              path: '/timeAxis',
              component: './timeAxis',
            },
            {
              name: 'blog.aboutMe',
              icon: 'table',
              path: '/aboutMe',
              component: './aboutMe',
            },
            {
              name: 'blog.detail',
              icon: 'smile',
              path: '/detail',
              // target: 'blank', // 点击新窗口打开
              component: './detail',
              hideInMenu : true,
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },

      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },

});
