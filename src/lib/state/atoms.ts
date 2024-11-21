import { type Atom, atom, useAtom as jotaiUseAtom } from 'jotai';
import { useEffect } from 'react';

const availableAtoms = {
  searchAtom: atom<string>(''),
  filterAtom: atom<string>(''),
  dbInitializedAtom: atom<boolean>(false),
  sidebarMinimizedAtom: atom<boolean>(false)
} as const;

export const useAtom = <
  K extends keyof typeof availableAtoms,
  T = (typeof availableAtoms)[K] extends Atom<infer V> ? V : never
>(
  atomName: K,
  initialValue?: T
) => {
  const atomToUse = availableAtoms[atomName];
  const [value, setValue] = jotaiUseAtom(atomToUse);

  useEffect(() => {
    if (initialValue !== undefined) {
      // @ts-expect-error - This is a hack to get around the fact that the atom is not typed correctly
      setValue(initialValue);
    }
  }, [initialValue, setValue]);

  return [value, setValue] as const;
};

export const getAtom = <K extends keyof typeof availableAtoms>(atomName: K) =>
  availableAtoms[atomName];
