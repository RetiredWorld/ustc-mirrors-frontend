import { IMirrorStatus, ISingleMirror } from '@/types/mirror';

// rewrite folder url to match exact location of file and folder
export function folderURLRewrite(
  name: string,
  folderPath: string,
  isDir: boolean,
): string {
  if (!isDir) {
    return `${folderPath}/${name}`;
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
export function parseTimeAndStatus(mirrorObj: ISingleMirror): IMirrorStatus {
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
    status.forEach((stat) => {
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
