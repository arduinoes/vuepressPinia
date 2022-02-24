const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://vuepress.vuejs.org/guide/deploy.html#github-pages
   */
  base: '/pinia/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Curso Pinia',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'Nivel principiantes',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      { text: 'Vite', link: '/vite/' },
      { text: 'setup Firebase', link: '/setup/' }, 
      { text: 'Pinia Firebase', link: '/pinia/' },
      { text: 'Auth Firebase', link: '/auth/' },
      { text: 'Rutas Dinámicas', link: '/router/' },
      { text: 'Formulario', link: '/formulario/' },
      // { text: 'Tienda', link: '/tienda/' },
      // { text: 'Slots', link: '/slots/' },
      // { text: 'Router', link: '/router/' },
      // { text: 'Paginación', link: '/paginacion/' },
      // { text: 'Vuex', link: '/vuex/' },
      { text: 'Canal Youtube', link: 'https://www.youtube.com/playlist?list=PLgh8bcLDakt3oPmNoEfdfF4yd2b6KNCUX' }
    ],
    sidebar: 'auto'
  },
  plugins: [['vuepress-plugin-code-copy', true]]
}
