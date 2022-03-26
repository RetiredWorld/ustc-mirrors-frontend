import HeaderIndex from '@/components/Header';
import { FolderItemTable } from '@/components/ItemList';
import GlobalSearch from '@/components/GlobalSearch';
import { useState } from 'react';
import useSWR from 'swr';
import { folderAPI, folderAPIKey } from '@/api';
import { useFilterFolder, useRouterPath } from '@/utils/hooks';
import MetaHead from '@/components/layout/MetaHead';

export default function Folder() {
  const folderPath = useRouterPath(false);

  const [isLoading] = useState<boolean>(false);

  const { data } = useSWR(
    folderPath ? folderAPIKey(folderPath) : null,
    folderPath ? async () => folderAPI(folderPath as string) : null,
  );
  const filteredFolders = useFilterFolder(data);

  return (
    <div>
      <MetaHead title={folderPath ? `Index of /${folderPath}/` : undefined} />
      <HeaderIndex />
      <FolderItemTable items={filteredFolders} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
