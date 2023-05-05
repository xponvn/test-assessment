export default {
  routes: [
    {
      // Path defined with a URL parameter
      method: 'POST',
      path: '/tests/:id/candidate',
      handler: 'test.sendTest',
    },
  ],
};
