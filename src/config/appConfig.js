export default {
  DEBUG: process.env.NODE_ENV !== 'production',
  API_HOST: 'https://api.github.com',
  DEFAULT_PAGE_SIZE: 10,

  navMenu: [
    {
      title: 'Home',
      link: '/',
    },

    {
      title: 'Engine',
      link: '/engine',
    },

    {
      title: 'About',
      link: '/about',
    },
  ],
};
