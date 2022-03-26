import { ISingleMirror } from '@/types/mirror';
import { IFolderItem } from '@/types/folder';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/context/store';

// hooks for redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// filter mirror and sort
export function useFilterMirror(
  mirrorList: ISingleMirror[] | undefined,
): ISingleMirror[] {
  const search = useAppSelector((state) => state.search);
  let filteredMirrorList: ISingleMirror[] = [];
  if (mirrorList) {
    if (search.keyword !== ``) {
      filteredMirrorList = mirrorList.filter((mirror) =>
        mirror.cname.toLowerCase().includes(search.keyword),
      );
    } else {
      filteredMirrorList = mirrorList;
    }
  }
  return filteredMirrorList;
}

// filter folder and sort
export function useFilterFolder(
  folderList: IFolderItem[] | undefined,
): IFolderItem[] {
  let filteredFolderList: IFolderItem[] = [];
  const search = useAppSelector((state) => state.search);
  if (folderList) {
    if (search.keyword !== ``) {
      filteredFolderList = folderList.filter((folder) =>
        folder.name.toLowerCase().includes(search.keyword),
      );
    } else {
      filteredFolderList = folderList;
    }
  }
  return filteredFolderList;
}
