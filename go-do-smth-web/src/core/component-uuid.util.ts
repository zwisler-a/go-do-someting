let counter = 0;
export function generateComponentUUID() {
  return `comp${Math.random().toString(36).substring(7).toUpperCase()}${counter++}`;
}
