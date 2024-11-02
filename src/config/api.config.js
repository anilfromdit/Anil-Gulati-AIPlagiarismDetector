export const API_CONFIG = {
  CLAUDE_API_KEY: process.env.REACT_APP_CLAUDE_API_KEY,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FILE_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
};