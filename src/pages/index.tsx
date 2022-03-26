import HeaderIndex from '@/components/Header';
import {MirrorItemTable} from '@/components/ItemList';
import GlobalSearch from '@/components/GlobalSearch';
import {useState} from 'react';
import useSWR from 'swr';
import {mirrorAPI, mirrorAPIKey} from '@/api';
import {useAppDispatch, useAppSelector, useFilterMirror} from '@/utils/hooks';
import {updateISOList} from '@/context/iso';

export default function Home() {
  const ISO = useAppSelector(state => state.iso);
  const dispatch = useAppDispatch();
  const [isLoading] = useState<boolean>(false);
  const { data } = useSWR(mirrorAPIKey(), mirrorAPI);
  const filteredMirrors = useFilterMirror(data?.mirrors);
  if (ISO.iso.length === 0) {
    if (data) {
      dispatch(updateISOList(data.info));
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
