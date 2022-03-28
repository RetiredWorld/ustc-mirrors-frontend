import { IMirrorStatus, IRawMirror, ISingleMirror } from '@/types/mirror';
import path from 'path';
import { Order } from '@/context/search';
import { IFolderItem } from '@/types/folder';

// rewrite folder url to match exact location of file and folder
export function folderURLRewrite(
  name: string,
  isDir: boolean,
  folderPath?: string,
): string {
  if (!isDir) {
    return path.join(folderPath || ``, name);
  }

  return name;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, `0`);
}

// format mirrorz date
export function formatDate(dateStr: string, unix = true): string {
  if (dateStr.length === 0) {
    return ``;
  }
  let date: Date;
  if (unix) {
    date = new Date(parseInt(dateStr, 10) * 1000);
  } else {
    date = new Date(dateStr);
  }

  return `${[
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join(`-`)} ${[
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
  ].join(`:`)}`;
}

// parse mirrorz time and sync status
export function parseTimeAndStatus(mirrorObj: IRawMirror): IMirrorStatus {
  const status = mirrorObj.status.match(/[A-Z](\d+)?/g);
  const formattedStatus: IMirrorStatus = {
    status: ``,
    startTime: null,
    nextTime: null,
    lastSuccessTime: null,
    addedTime: null,
    failTime: null,
  };

  if (status) {
    status.forEach((stat: string) => {
      const flag: string = stat.slice(0, 1);
      switch (flag) {
        case `S`: {
          formattedStatus.status = flag;
          formattedStatus.startTime = formatDate(stat.slice(1));
          break;
        }
        case `Y`: {
          formattedStatus.status = flag;
          formattedStatus.startTime = formatDate(stat.slice(1));
          break;
        }
        case `F`: {
          formattedStatus.status = flag;
          formattedStatus.startTime = formatDate(stat.slice(1));
          break;
        }
        case `P`: {
          formattedStatus.status = flag;
          formattedStatus.startTime = formatDate(stat.slice(1));
          break;
        }
        case `C`: {
          formattedStatus.status = flag;
          break;
        }
        case `R`: {
          formattedStatus.status = flag;
          break;
        }
        case `U`: {
          formattedStatus.status = flag;
          break;
        }
        case `X`: {
          formattedStatus.nextTime = formatDate(stat.slice(1));
          break;
        }
        case `N`: {
          formattedStatus.addedTime = formatDate(stat.slice(1));
          break;
        }
        case `O`: {
          formattedStatus.lastSuccessTime = formatDate(stat.slice(1));
          break;
        }
        default: {
          formattedStatus.status = `U`;
        }
      }
    });
  }

  return formattedStatus;
}

// format size
export function formatSize(size: number | undefined) {
  if (size) {
    let sz = size;
    const thresh = 1024;

    if (Math.abs(sz) < thresh) {
      return `${sz} B`;
    }

    const units = [`kB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`];
    let u = -1;
    const r = 10 ** 1;

    do {
      sz /= thresh;
      u += 1;
    } while (
      Math.round(Math.abs(sz) * r) / r >= thresh &&
      u < units.length - 1
    );

    return `${sz.toFixed(1)} ${units[u]}`;
  }
  return `-`;
}

// sort mirror
const statusOrderList = [`S`, `Y`, `P`, `C`, `R`, `U`, `F`];
export function sortMirror(
  mirrorList: ISingleMirror[],
  order: Order,
): ISingleMirror[] {
  const sortedMrList: ISingleMirror[] = [...mirrorList];
  switch (order) {
    case Order.nameRev:
    case Order.name: {
      sortedMrList.sort((a, b) => {
        const res = a.cname.localeCompare(b.cname);
        return order === Order.name ? res : -res;
      });
      break;
    }
    case Order.dateRev:
    case Order.date: {
      sortedMrList.sort((a, b) => {
        if (!a.status.startTime) {
          return 1;
        } else if (!b.status.startTime) {
          return -1;
        }
        const res = a.status.startTime > b.status.startTime ? -1 : 1;
        return order === Order.date ? res : -res;
      });
      break;
    }
    case Order.statusRev:
    case Order.status: {
      sortedMrList.sort((a, b) => {
        const aIdx = statusOrderList.indexOf(a.status.status);
        const bIdx = statusOrderList.indexOf(b.status.status);
        return order === Order.status ? aIdx - bIdx : bIdx - aIdx;
      });
      break;
    }
    default: {
    }
  }
  return sortedMrList;
}

// sort folder
export function sortFolder(
  folderList: IFolderItem[],
  order: Order,
): IFolderItem[] {
  const sortedFolders = [...folderList];
  switch (order) {
    case Order.nameRev:
    case Order.name: {
      sortedFolders.sort((a, b) => {
        const res = a.name.localeCompare(b.name);
        if (a.type !== b.type) {
          if (a.type === `directory`) {
            return -1;
          } else {
            return 1;
          }
        }
        return order === Order.name ? res : -res;
      });
      break;
    }
    case Order.dateRev:
    case Order.date: {
      sortedFolders.sort((a, b) => {
        if (!a.mtime) {
          return 1;
        } else if (!b.mtime) {
          return -1;
        }
        const res = a.mtime > b.mtime ? -1 : 1;
        return order === Order.date ? res : -res;
      });
      break;
    }
    case Order.sizeRev:
    case Order.size: {
      sortedFolders.sort((a, b) => {
        if (!a.size) {
          return 1;
        } else if (!b.size) {
          return -1;
        }
        const res = a.size - b.size;
        return order === Order.sizeRev ? res : -res;
      });
      break;
    }
    default: {
    }
  }
  return sortedFolders;
}
