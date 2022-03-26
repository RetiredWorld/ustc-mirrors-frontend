import HeaderIndex from '@/components/Header';
import { MirrorItemTable } from '@/components/ItemList';
import GlobalSearch from '@/components/GlobalSearch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { mirrorAPI, mirrorAPIKey } from '@/api';
import { useAppDispatch, useAppSelector, useFilterMirror } from '@/utils/hooks';
import { updateISOList } from '@/context/iso';
import MetaHead from '@/components/layout/MetaHead';

export default function Home() {
  const ISO = useAppSelector((state) => state.iso);
  const dispatch = useAppDispatch();
  const [isLoading] = useState<boolean>(false);
  const { data } = useSWR(mirrorAPIKey(), mirrorAPI);
  const filteredMirrors = useFilterMirror(data?.mirrors);

  useEffect(() => {
    if (ISO.iso.length === 0) {
      if (data) {
        dispatch(updateISOList(data.info));
      }
    }
  }, [data]);

  return (
    <div>
      <MetaHead />
      <HeaderIndex />
      <MirrorItemTable items={filteredMirrors} isLoading={isLoading} />
      <GlobalSearch />
    </div>
  );
}
