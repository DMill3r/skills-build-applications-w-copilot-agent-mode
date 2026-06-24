export const formatDisplay = (val) => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'object') {
    return val.name || val.username || val.email || val._id || JSON.stringify(val);
  }
  return String(val);
};

export default formatDisplay;
