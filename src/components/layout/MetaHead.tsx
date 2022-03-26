import { FC } from 'react';
import { metaConfig } from '@/config';
import Head from 'next/head';

interface IMetaHeadProps {
  title?: string;
}

function formatSiteTitle(title?: string) {
  let formatted = metaConfig.meta.defaultTitle;
  if (title) {
    formatted = `${title} | ${formatted}`;
  }
  return formatted;
}

const MetaHead: FC<IMetaHeadProps> = ({ title }) => (
  <Head>
    <title>{formatSiteTitle(title)}</title>
  </Head>
);

export default MetaHead;
