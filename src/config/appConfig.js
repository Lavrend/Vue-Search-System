export default {
  DEBUG: process.env.NODE_ENV !== 'production',
  date_locale: 'en-US',

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
