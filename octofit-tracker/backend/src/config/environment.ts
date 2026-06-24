export const getBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
export const NODE_ENV = process.env.NODE_ENV || 'development';
