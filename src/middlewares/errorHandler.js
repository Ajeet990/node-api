function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({ 
      error: 'Database error',
      details: err.message 
    });
  }

  // Custom errors
  if (err.message) {
    return res.status(400).json({ error: err.message });
  }

  // Default error
  res.status(500).json({ error: 'Something went wrong!' });
}

export default errorHandler;