import { useContext } from 'react';
import { CmsContext } from './cms-context';

export function useCms() {
  return useContext(CmsContext);
}
