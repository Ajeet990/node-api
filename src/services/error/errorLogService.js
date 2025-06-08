import { prisma } from '../../config/connection/db.js';

export async function logError(error, req = null) {
  try {
    // Extract error details
    const stackLines = error.stack?.split('\n') || [];
    const firstStackLine = stackLines.length > 1 ? stackLines[1] : '';
    
    // Match line number and file name from stack trace
    const stackMatch = firstStackLine.match(/\(?(.+):(\d+):(\d+)\)?/);
    
    await prisma.errorLog.create({
      data: {
        message: error.message,
        stack: error.stack,
        lineNumber: stackMatch ? parseInt(stackMatch[2]) : null,
        fileName: stackMatch ? stackMatch[1] : null,
        statusCode: error.statusCode || 500,
        route: req?.originalUrl,
        method: req?.method
      }
    });
  } catch (loggingError) {
    console.error('Failed to log error:', loggingError);
  }
}