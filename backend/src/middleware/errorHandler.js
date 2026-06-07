const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.errors.reduce((acc, e) => {
        acc[e.path] = e.message;
        return acc;
      }, {}),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      error: 'This record already exists',
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};

module.exports = errorHandler;
