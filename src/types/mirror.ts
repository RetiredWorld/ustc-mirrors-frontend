import { IISO } from '@/context/iso';

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
  info: IISO[];
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
