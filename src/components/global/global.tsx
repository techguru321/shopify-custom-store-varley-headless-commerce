export function formatString(str: string) {
  str = str.trim();
  return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
}