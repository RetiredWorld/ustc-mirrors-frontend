export interface ISingleMirror {
  cname: string;
  desc: string;
  url: string;
  status: string;
  help: string;
  upstream: string;
  size?: string;
}

export interface IMirror {
  extension: string;
  endpoints: any[];
  site: any;
  info: any;
  mirrors: ISingleMirror[];
}

export interface IMirrorStatus {
  status: string;
  startTime: string | null;
  nextTime: string | null;
  failTime: string | null;
  addedTime: string | null;
  lastSuccessTime: string | null;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, `0`);
}

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
