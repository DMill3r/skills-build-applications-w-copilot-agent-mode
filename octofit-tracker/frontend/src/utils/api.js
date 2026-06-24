export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const isBrowser = typeof window !== 'undefined' && !!window.location;
  const pageIsHttps = isBrowser && window.location.protocol === 'https:';

  if (codespaceName && codespaceName.trim().length > 0) {
    const scheme = pageIsHttps ? 'https' : 'http';
    return `${scheme}://${codespaceName}-8000.app.github.dev`;
  }

  const scheme = pageIsHttps ? 'https' : 'http';
  return `${scheme}://localhost:8000`;
};

export default getApiBaseUrl;
