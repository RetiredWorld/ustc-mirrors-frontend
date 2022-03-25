import HeaderIndex from '@/components/Header';
import { MirrorItemTable } from '@/components/ItemList';
import GlobalSearch, { useFilterMirror } from '@/components/GlobalSearch';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import { mirrorAPI, mirrorAPIKey } from '@/api';
import ISOContext from '@/context/ISOContext';

export default function Home() {
  const { ISO, setISO } = useContext(ISOContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, error } = useSWR(mirrorAPIKey(), mirrorAPI);
  const filteredMirrors = useFilterMirror(data?.mirrors);
  if (ISO.iso.length === 0) {
    if (data) {
      if (setISO) {
        setISO({
          ...ISO,
          iso: data.info,
        });
      }
    }
  }

  return (
    <div>
      <HeaderIndex />
      <MirrorItemTable items={filteredMirrors} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
