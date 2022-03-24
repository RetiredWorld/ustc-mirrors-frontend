import HeaderIndex from '@/components/Header';
import { MirrorItemTable } from '@/components/ItemList';
import GlobalSearch, { useFilterMirror } from '@/components/GlobalSearch';
import SearchContext from '@/context/SearchContext';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import { mirrorAPI } from '@/api';

export default function Home() {
  const { filter } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, error } = useSWR(`mirror/index`, mirrorAPI);
  const filteredMirrors = useFilterMirror(data?.mirrors);
  return (
    <div>
      <HeaderIndex />
      <MirrorItemTable items={filteredMirrors} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
