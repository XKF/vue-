import { useBEM } from './bem';
export function use(name) {
  name = 'kafan-' + name;
  return [useBEM(name)];
}