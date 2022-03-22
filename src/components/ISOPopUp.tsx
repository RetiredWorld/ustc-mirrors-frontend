import { FC, useContext, useEffect, useState } from 'react';
import ISOContext, { IISO } from '@/context/ISOContext';
import Box from '@/components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import s from './ISOPopUp.module.scss';

const MOCK_ISO: IISO[] = [
  {
    distro: `Ubuntu`,
    urls: [
      {
        name: `21.10 (amd64, desktop LiveCD)`,
        url: `/ubuntu-releases/impish/ubuntu-21.10-desktop-amd64.iso`,
      },
      {
        name: `21.04 (amd64, desktop LiveCD)`,
        url: `/ubuntu-releases/hirsute/ubuntu-21.04-desktop-amd64.iso`,
      },
      {
        name: `20.04.4 (amd64, desktop LiveCD)`,
        url: `/ubuntu-releases/focal/ubuntu-20.04.4-desktop-amd64.iso`,
      },
      {
        name: `18.04.6 (amd64, desktop LiveCD)`,
        url: `/ubuntu-releases/bionic/ubuntu-18.04.6-desktop-amd64.iso`,
      },
    ],
  },
  {
    distro: `Ubuntu 衍生版`,
    urls: [
      {
        name: `Ubuntu Kylin 21.10 (amd64)`,
        url: `/ubuntu-cdimage/ubuntukylin/releases/impish/release/ubuntukylin-21.10-desktop-amd64.iso`,
      },
      {
        name: `Kubuntu 21.10 (amd64)`,
        url: `/ubuntu-cdimage/kubuntu/releases/impish/release/kubuntu-21.10-desktop-amd64.iso`,
      },
      {
        name: `Lubuntu 21.10 (amd64)`,
        url: `/ubuntu-cdimage/lubuntu/releases/impish/release/lubuntu-21.10-desktop-amd64.iso`,
      },
      {
        name: `Xubuntu 21.10 (amd64)`,
        url: `/ubuntu-cdimage/xubuntu/releases/impish/release/xubuntu-21.10-desktop-amd64.iso`,
      },
      {
        name: `Ubuntu Gnome 16.04.5 (amd64)`,
        url: `/ubuntu-cdimage/ubuntu-gnome/releases/xenial/release/ubuntu-gnome-16.04.5-desktop-amd64.iso`,
      },
      {
        name: `Ubuntu Gnome 16.04.5 (i386)`,
        url: `/ubuntu-cdimage/ubuntu-gnome/releases/xenial/release/ubuntu-gnome-16.04.5-desktop-i386.iso`,
      },
      {
        name: `Ubuntu Mate 21.10 (amd64)`,
        url: `/ubuntu-cdimage/ubuntu-mate/releases/impish/release/ubuntu-mate-21.10-desktop-amd64.iso`,
      },
    ],
  },
  {
    distro: `Debian`,
    urls: [
      {
        name: `11.2.0 (amd64, DVD installer)`,
        url: `/debian-cd/current/amd64/iso-dvd/debian-11.2.0-amd64-DVD-1.iso`,
      },
      {
        name: `11.2.0 (i386, DVD installer)`,
        url: `/debian-cd/current/i386/iso-dvd/debian-11.2.0-i386-DVD-1.iso`,
      },
      {
        name: `11.2.0 (amd64, xfce live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-xfce.iso`,
      },
      {
        name: `11.2.0 (amd64, standard live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-standard.iso`,
      },
      {
        name: `11.2.0 (amd64, mate live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-mate.iso`,
      },
      {
        name: `11.2.0 (amd64, lxqt live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-lxqt.iso`,
      },
      {
        name: `11.2.0 (amd64, lxde live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-lxde.iso`,
      },
      {
        name: `11.2.0 (amd64, kde live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-kde.iso`,
      },
      {
        name: `11.2.0 (amd64, gnome live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-gnome.iso`,
      },
      {
        name: `11.2.0 (amd64, cinnamon live)`,
        url: `/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-cinnamon.iso`,
      },
      {
        name: `testing (amd64, DVD installer)`,
        url: `/debian-cdimage/weekly-builds/amd64/iso-dvd/debian-testing-amd64-DVD-1.iso`,
      },
      {
        name: `testing (i386, DVD installer)`,
        url: `/debian-cdimage/weekly-builds/i386/iso-dvd/debian-testing-i386-DVD-1.iso`,
      },
    ],
  },
  {
    distro: `Debian（含非自由固件）`,
    urls: [
      {
        name: `11.2.0 (amd64, DVD installer)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current/amd64/iso-dvd/firmware-11.2.0-amd64-DVD-1.iso`,
      },
      {
        name: `11.2.0 (i386, DVD installer)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current/i386/iso-dvd/firmware-11.2.0-i386-DVD-1.iso`,
      },
      {
        name: `11.2.0 (amd64, xfce live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-xfce+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, standard live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-standard+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, mate live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-mate+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, lxqt live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-lxqt+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, lxde live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-lxde+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, kde live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-kde+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, gnome live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-gnome+nonfree.iso`,
      },
      {
        name: `11.2.0 (amd64, cinnamon live)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/current-live/amd64/iso-hybrid/debian-live-11.2.0-amd64-cinnamon+nonfree.iso`,
      },
      {
        name: `testing (amd64, Network installer)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/weekly-builds/amd64/iso-cd/firmware-testing-amd64-netinst.iso`,
      },
      {
        name: `testing (i386, Network installer)`,
        url: `/debian-cdimage/unofficial/non-free/cd-including-firmware/weekly-builds/i386/iso-cd/firmware-testing-i386-netinst.iso`,
      },
    ],
  },
  {
    distro: `Archlinux`,
    urls: [
      {
        name: `2022.03.01 (x86_64, CLI-only)`,
        url: `/archlinux/iso/latest/archlinux-2022.03.01-x86_64.iso`,
      },
    ],
  },
  {
    distro: `Fedora`,
    urls: [
      {
        name: `35 (x86_64, Xfce)`,
        url: `/fedora/releases/35/Spins/x86_64/iso/Fedora-Xfce-Live-x86_64-35-1.2.iso`,
      },
      {
        name: `35 (x86_64, Workstation)`,
        url: `/fedora/releases/35/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-35-1.2.iso`,
      },
      {
        name: `35 (x86_64, KDE)`,
        url: `/fedora/releases/35/Spins/x86_64/iso/Fedora-KDE-Live-x86_64-35-1.2.iso`,
      },
      {
        name: `35 (x86_64, Cinnamon)`,
        url: `/fedora/releases/35/Spins/x86_64/iso/Fedora-Cinnamon-Live-x86_64-35-1.2.iso`,
      },
      {
        name: `35 (aarch64, Workstation)`,
        url: `/fedora/releases/35/Workstation/aarch64/iso/Fedora-Workstation-Live-aarch64-35-1.2.iso`,
      },
      {
        name: `34 (x86_64, Xfce)`,
        url: `/fedora/releases/34/Spins/x86_64/iso/Fedora-Xfce-Live-x86_64-34-1.2.iso`,
      },
      {
        name: `34 (x86_64, Workstation)`,
        url: `/fedora/releases/34/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-34-1.2.iso`,
      },
      {
        name: `34 (x86_64, KDE)`,
        url: `/fedora/releases/34/Spins/x86_64/iso/Fedora-KDE-Live-x86_64-34-1.2.iso`,
      },
      {
        name: `34 (aarch64, Workstation)`,
        url: `/fedora/releases/34/Workstation/aarch64/iso/Fedora-Workstation-Live-aarch64-34-1.2.iso`,
      },
    ],
  },
  {
    distro: `Kali Linux`,
    urls: [
      {
        name: `2022.1 (amd64, live)`,
        url: `/kali-images/current/kali-linux-2022.1-live-amd64.iso`,
      },
      {
        name: `2022.1 (i386, live)`,
        url: `/kali-images/current/kali-linux-2022.1-live-i386.iso`,
      },
      {
        name: `2022.1 (arm64, live)`,
        url: `/kali-images/current/kali-linux-2022.1-live-arm64.iso`,
      },
      {
        name: `2022.1 (amd64, installer)`,
        url: `/kali-images/current/kali-linux-2022.1-installer-amd64.iso`,
      },
      {
        name: `2022.1 (i386, installer)`,
        url: `/kali-images/current/kali-linux-2022.1-installer-i386.iso`,
      },
      {
        name: `2022.1 (arm64, installer)`,
        url: `/kali-images/current/kali-linux-2022.1-installer-arm64.iso`,
      },
      {
        name: `2022.1 (amd64, Network installer)`,
        url: `/kali-images/current/kali-linux-2022.1-installer-netinst-amd64.iso`,
      },
      {
        name: `2022.1 (i386, Network installer)`,
        url: `/kali-images/current/kali-linux-2022.1-installer-netinst-i386.iso`,
      },
      {
        name: `2022.1 (arm64, Network installer)`,
        url: `/kali-images/current/kali-linux-2022.1-installer-netinst-arm64.iso`,
      },
    ],
  },
  {
    distro: `openSUSE`,
    urls: [
      {
        name: `15.2 (x86_64, NET installer)`,
        url: `/opensuse/distribution/leap/15.2/iso/openSUSE-Leap-15.2-NET-x86_64.iso`,
      },
      {
        name: `15.2 (x86_64, DVD installer)`,
        url: `/opensuse/distribution/leap/15.2/iso/openSUSE-Leap-15.2-DVD-x86_64.iso`,
      },
      {
        name: `15.1 (x86_64, NET installer)`,
        url: `/opensuse/distribution/leap/15.1/iso/openSUSE-Leap-15.1-NET-x86_64.iso`,
      },
      {
        name: `15.1 (x86_64, DVD installer)`,
        url: `/opensuse/distribution/leap/15.1/iso/openSUSE-Leap-15.1-DVD-x86_64.iso`,
      },
      {
        name: `15.0 (x86_64, NET installer)`,
        url: `/opensuse/distribution/leap/15.0/iso/openSUSE-Leap-15.0-NET-x86_64.iso`,
      },
      {
        name: `15.0 (x86_64, DVD installer)`,
        url: `/opensuse/distribution/leap/15.0/iso/openSUSE-Leap-15.0-DVD-x86_64.iso`,
      },
      {
        name: `15.4 (x86_64, XFCE-Live)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-XFCE-Live-x86_64-Media.iso`,
      },
      {
        name: `15.4 (x86_64, Rescue-CD)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-Rescue-CD-x86_64-Media.iso`,
      },
      {
        name: `15.4 (x86_64, KDE-Live)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-KDE-Live-x86_64-Media.iso`,
      },
      {
        name: `15.4 (x86_64, GNOME-Live)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-GNOME-Live-x86_64-Media.iso`,
      },
      {
        name: `15.4 (aarch64, XFCE-Live)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-XFCE-Live-aarch64-Media.iso`,
      },
      {
        name: `15.4 (aarch64, Rescue-CD)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-Rescue-CD-aarch64-Media.iso`,
      },
      {
        name: `15.4 (aarch64, KDE-Live)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-KDE-Live-aarch64-Media.iso`,
      },
      {
        name: `15.4 (aarch64, GNOME-Live)`,
        url: `/opensuse/distribution/leap/15.4/live/openSUSE-Leap-15.4-GNOME-Live-aarch64-Media.iso`,
      },
      {
        name: `15.3 (x86_64, XFCE-Live)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-XFCE-Live-x86_64-Media.iso`,
      },
      {
        name: `15.3 (x86_64, Rescue-CD)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-Rescue-CD-x86_64-Media.iso`,
      },
      {
        name: `15.3 (x86_64, KDE-Live)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-KDE-Live-x86_64-Media.iso`,
      },
      {
        name: `15.3 (x86_64, GNOME-Live)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-GNOME-Live-x86_64-Media.iso`,
      },
      {
        name: `15.3 (aarch64, XFCE-Live)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-XFCE-Live-aarch64-Media.iso`,
      },
      {
        name: `15.3 (aarch64, Rescue-CD)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-Rescue-CD-aarch64-Media.iso`,
      },
      {
        name: `15.3 (aarch64, KDE-Live)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-KDE-Live-aarch64-Media.iso`,
      },
      {
        name: `15.3 (aarch64, GNOME-Live)`,
        url: `/opensuse/distribution/leap/15.3/live/openSUSE-Leap-15.3-GNOME-Live-aarch64-Media.iso`,
      },
      {
        name: `15.2 (x86_64, Rescue-CD)`,
        url: `/opensuse/distribution/leap/15.2/live/openSUSE-Leap-15.2-Rescue-CD-x86_64-Media.iso`,
      },
      {
        name: `15.2 (x86_64, KDE-Live)`,
        url: `/opensuse/distribution/leap/15.2/live/openSUSE-Leap-15.2-KDE-Live-x86_64-Media.iso`,
      },
      {
        name: `15.2 (x86_64, GNOME-Live)`,
        url: `/opensuse/distribution/leap/15.2/live/openSUSE-Leap-15.2-GNOME-Live-x86_64-Media.iso`,
      },
      {
        name: `Tumbleweed (x86_64, XFCE-Live)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-XFCE-Live-x86_64-Current.iso`,
      },
      {
        name: `Tumbleweed (x86_64, Rescue-CD)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-Rescue-CD-x86_64-Current.iso`,
      },
      {
        name: `Tumbleweed (x86_64, NET)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-NET-x86_64-Current.iso`,
      },
      {
        name: `Tumbleweed (x86_64, KDE-Live)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-KDE-Live-x86_64-Current.iso`,
      },
      {
        name: `Tumbleweed (x86_64, GNOME-Live)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-GNOME-Live-x86_64-Current.iso`,
      },
      {
        name: `Tumbleweed (x86_64, DVD)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-DVD-x86_64-Current.iso`,
      },
      {
        name: `Tumbleweed (i686, XFCE-Live)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-XFCE-Live-i686-Current.iso`,
      },
      {
        name: `Tumbleweed (i686, Rescue-CD)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-Rescue-CD-i686-Current.iso`,
      },
      {
        name: `Tumbleweed (i586, NET)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-NET-i586-Current.iso`,
      },
      {
        name: `Tumbleweed (i686, KDE-Live)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-KDE-Live-i686-Current.iso`,
      },
      {
        name: `Tumbleweed (i686, GNOME-Live)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-GNOME-Live-i686-Current.iso`,
      },
      {
        name: `Tumbleweed (i586, DVD)`,
        url: `/opensuse/tumbleweed/iso/openSUSE-Tumbleweed-DVD-i586-Current.iso`,
      },
    ],
  },
  {
    distro: `CentOS`,
    urls: [
      {
        name: `7 (x86_64, NetInstall)`,
        url: `/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-NetInstall-2009.iso`,
      },
      {
        name: `7 (x86_64, Minimal)`,
        url: `/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso`,
      },
      {
        name: `Stream 8-20220307 (x86_64, boot)`,
        url: `/centos/8-stream/isos/x86_64/CentOS-Stream-8-x86_64-20220307-boot.iso`,
      },
      {
        name: `Stream 8-20220307 (aarch64, boot)`,
        url: `/centos/8-stream/isos/aarch64/CentOS-Stream-8-aarch64-20220307-boot.iso`,
      },
      {
        name: `Stream 8-20220307 (ppc64le, boot)`,
        url: `/centos/8-stream/isos/ppc64le/CentOS-Stream-8-ppc64le-20220307-boot.iso`,
      },
    ],
  },
  {
    distro: `Linux Mint`,
    urls: [
      {
        name: `20 (64bit, mate)`,
        url: `/linuxmint-cd/stable/20/linuxmint-20-mate-64bit.iso`,
      },
      {
        name: `20 (64bit, cinnamon)`,
        url: `/linuxmint-cd/stable/20/linuxmint-20-cinnamon-64bit.iso`,
      },
    ],
  },
];

const ISOPopUp: FC = () => {
  const { ISO, setISO } = useContext(ISOContext);
  const [selectedISO, setSelectedISO] = useState<number>(0);
  useEffect(() => {
    const newISO = { ...ISO };
    newISO.iso = MOCK_ISO;
    if (setISO) {
      setISO(newISO);
    }
  }, []);
  function handleClose() {
    const newISO = { ...ISO };
    newISO.isPop = false;
    if (setISO) {
      setISO(newISO);
    }
  }

  function handleSelectISO(selectedIndex: number) {
    setSelectedISO(selectedIndex);
  }
  return (
    <div className={`${s.container} ${ISO.isPop ? s.active : null}`}>
      <div className={s.mask} onClick={handleClose} />
      <div className={s.content}>
        <Box cls={s.box}>
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
                <div className={s.isoTitle}>{MOCK_ISO[selectedISO].distro}</div>
                <ul className={s.isoVersionList}>
                  {MOCK_ISO[selectedISO].urls.map((isoUrl) => (
                    <li className={s.isoVersion}>
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
