import type { AppProps } from 'next/app';

import '@/styles/global/reset.scss';
import '@/styles/font.scss';
import Main from '@/components/layout/Main';
import Side from '@/components/layout/Side';
import ISOPopUp from '@/components/ISOPopUp';
import ContextWrapper from '@/context/ContextWrapper';
import { FC } from 'react';
import Footer from '@/components/layout/Footer';
import s from './_app.module.scss';

const MyAppWithCtx: FC<{
  appProps: AppProps;
}> = ({ appProps }) => {
  const { Component, pageProps } = appProps;
  return (
    <>
      <div className={s.container}>
        <Side />
        <Main>
          <Component {...pageProps} />
        </Main>
        <ISOPopUp />
      </div>
      <Footer />
    </>
  );
};

function MyApp(appProps: AppProps) {
  return (
    <ContextWrapper>
      <MyAppWithCtx appProps={appProps} />
    </ContextWrapper>
  );
}

export default MyApp;
