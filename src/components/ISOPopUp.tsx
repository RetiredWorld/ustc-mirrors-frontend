import { FC, useEffect, useState } from 'react';
import Box from '@/components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { mirrorAPI } from '@/api';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { changeISODisplay, updateISOList } from '@/context/iso';
import s from './ISOPopUp.module.scss';

const ISOPopUp: FC = () => {
  const ISO = useAppSelector((state) => state.iso);
  const dispatch = useAppDispatch();
  const [selectedISO, setSelectedISO] = useState<number>(0);
  const selected =
    ISO.iso.length === 0
      ? {
          distro: ``,
          urls: [],
        }
      : ISO.iso[selectedISO];

  useEffect(() => {
    if (ISO.isPop && ISO.iso.length === 0) {
      mirrorAPI().then((data) => {
        dispatch(updateISOList(data.info));
      });
    }
  }, [ISO, dispatch]);

  function handleClose() {
    dispatch(changeISODisplay(false));
  }

  function handleSelectISO(selectedIndex: number) {
    setSelectedISO(selectedIndex);
  }

  return (
    <div className={`${s.container} ${ISO.isPop ? s.active : null}`}>
      <div className={s.mask} onClick={handleClose} />
      <div className={s.content}>
        <Box BgClass="pure">
          <div className={s.close} onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className={s.ct}>
            <h1>获取安装镜像</h1>
            <div className={s.iso}>
              <div className={s.isoList}>
                {ISO.iso.map((iso, index) => (
                  <div
                    className={`${s.isoName} ${
                      index === selectedISO ? s.active : ``
                    }`}
                    key={iso.distro}
                    onClick={() => {
                      handleSelectISO(index);
                    }}
                  >
                    {iso.distro}
                  </div>
                ))}
              </div>
              <div className={s.isoDetail}>
                <div className={s.isoTitle}>{selected.distro}</div>
                <ul className={s.isoVersionList}>
                  {selected.urls.map((isoUrl) => (
                    <li className={s.isoVersion} key={isoUrl.url}>
                      <a href={isoUrl.url}>{isoUrl.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ISOPopUp;
