const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

// Use user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Fallback route for undefined endpoints
router.use((req, res) => {
  res.status(404).send('404 Not Found');
});

module.exports = router;