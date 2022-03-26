import HeaderIndex from '@/components/Header';
import { FolderItemTable } from '@/components/ItemList';
import GlobalSearch from '@/components/GlobalSearch';
import { useState } from 'react';
import useSWR from 'swr';
import { folderAPI, folderAPIKey } from '@/api';
import { useRouter } from 'next/router';
import { useFilterFolder } from '@/utils/hooks';

export default function Home() {
  const { query } = useRouter();

  let folderPath: string | undefined = ``;

  try {
    folderPath = (query.path as string[]).reduce(
      (prev, curr) => `${prev}/${curr}`,
      ``,
    );
  } catch (e) {
    folderPath = undefined;
  }

  const [isLoading] = useState<boolean>(false);

  const { data } = useSWR(
    folderPath ? folderAPIKey(folderPath) : null,
    folderPath ? async () => folderAPI(folderPath as string) : null,
  );
  const filteredFolders = useFilterFolder(data);

  return (
    <div>
      <HeaderIndex />
      <FolderItemTable items={filteredFolders} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
