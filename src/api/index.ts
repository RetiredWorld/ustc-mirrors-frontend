import { IMirror } from '@/types/mirror';
import { IFolderItem } from '@/types/folder';

interface IHeader {
  [key: string]: string;
}

interface IRequest {
  url: string;
  headers?: IHeader;
  data?: any;
}

const BASE_HEADERS: IHeader = {
  'Content-Type': `application/json`,
};

export const MIRROR_API_URL = `http://localhost/static/json/mirrorz.json`;
export const FOLDER_API_URL = `http://localhost/api/files/`;

const baseFetch = async <T>(props: IRequest) => {
  const headers = { ...BASE_HEADERS, ...props.headers };
  const method = `GET`;
  let rsp;
  const reqProps: RequestInit = {
    method,
    mode: `cors`,
    headers,
  };
  if (method === `GET`) {
    rsp = await fetch(props.url, reqProps);
  } else {
    reqProps.body = JSON.stringify(props.data);
    rsp = await fetch(props.url, reqProps);
  }
  if (rsp.status >= 300 || rsp.status < 200) {
    throw new Error(
      `Request error with status code ${rsp.status}, msg: ${rsp.statusText}`,
    );
  }
  return (await rsp.json()) as T;
};

export const mirrorAPIKey = () => `mirror/index`;
export const mirrorAPI = async () =>
  baseFetch<IMirror>({
    url: `${MIRROR_API_URL}`,
  });

export const folderAPIKey = (folderName: string) => `folder/${folderName}`;
export const folderAPI = async (folderName: string) =>
  baseFetch<IFolderItem[]>({
    url: `${FOLDER_API_URL}${folderName}/`,
  });
