import HeaderIndex from '@/components/Header';
import { MirrorItemTable } from '@/components/ItemList';
import GlobalSearch from '@/components/GlobalSearch';
import { mirrors } from '@/components/Mock';
import SearchContext from '@/context/SearchContext';
import { useContext, useEffect, useState } from 'react';
import { ISingleMirror } from '@/types/mirror';

export default function Home() {
  const { keyword } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let filteredMirrors: ISingleMirror[] = mirrors.mirrors;
  if (keyword && keyword !== ``) {
    filteredMirrors = mirrors.mirrors.filter((mirror) =>
      mirror.cname.toLowerCase().includes(keyword),
    );
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div>
      <HeaderIndex />
      <MirrorItemTable items={filteredMirrors} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
