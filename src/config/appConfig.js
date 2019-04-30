export default {
  DEBUG: process.env.NODE_ENV !== 'production',

  navMenu: [
    {
      title: 'Home',
      link: '/',
    },

    {
      title: 'Search',
      link: '/search',
    },

    {
      title: 'About',
      link: '/about',
    },
  ],
};
