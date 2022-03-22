import HeaderIndex from '@/components/Header';
import { FolderItemTable } from '@/components/ItemList';
import GlobalSearch from '@/components/GlobalSearch';
import { folders } from '@/components/Mock';
import { useContext, useEffect, useState } from 'react';
import SearchContext from '@/context/SearchContext';
import { IFolderItem } from '@/types/folder';

export default function Home() {
  const { keyword } = useContext(SearchContext);
  let filteredFolders: IFolderItem[] = folders;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  if (keyword && keyword !== ``) {
    filteredFolders = folders.filter((folder) => folder.name.includes(keyword));
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div>
      <HeaderIndex />
      <FolderItemTable items={filteredFolders} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
