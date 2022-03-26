import { ISingleMirror } from '@/types/mirror';
import { IFolderItem } from '@/types/folder';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/context/store';
import { useRouter } from 'next/router';
import path from 'path';
import { useEffect, useState } from 'react';

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

// get router path
export interface IRouterPath {
  name: string;
  path: string;
}
export function useRouterPath(recursive: true): IRouterPath[] | undefined;
export function useRouterPath(recursive: false): string | undefined;
export function useRouterPath(recursive = false): any {
  const router = useRouter();
  const [folderPath, setFolderPath] = useState<string | undefined>(undefined);
  const [pathList, setPathList] = useState<IRouterPath[]>([]);

  function genPath(list: string[]) {
    return list.reduce((prev, curr) => path.join(prev, curr));
  }

  useEffect(() => {
    if (!router.isReady) return;

    const folders = router.query.path as string[];
    if (folders === undefined) return;
    if (!recursive) {
      setFolderPath(genPath(folders));
      return;
    }

    const newPathList: IRouterPath[] = [];
    for (let i = 0; i < folders.length; i += 1) {
      const folderSlice = folders.slice(0, i + 1);
      newPathList.push({
        name: folders[i],
        path: genPath(folderSlice),
      });
    }
    setPathList(newPathList);
  }, [router.isReady, recursive, router.query]);

  if (!router.isReady) {
    return folderPath;
  }

  if (!recursive) {
    return folderPath;
  }
  return pathList;
}
