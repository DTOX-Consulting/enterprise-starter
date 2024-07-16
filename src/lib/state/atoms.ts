import { atom, useAtom as jotaiUseAtom } from 'jotai';

const availableAtoms = {
  searchAtom: atom<string>(''),
  filterAtom: atom<string>(''),
  dbInitializedAtom: atom<boolean>(false),
  sidebarMinimizedAtom: atom<boolean>(false)
} as const;

export const useAtom = <K extends keyof typeof availableAtoms>(atomName: K) => {
  const atomToUse = availableAtoms[atomName];
  return jotaiUseAtom(atomToUse);
};

export const getAtom = <K extends keyof typeof availableAtoms>(atomName: K) => {
  return availableAtoms[atomName];
};
