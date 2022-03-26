import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/context/store';

const ContextWrapper: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ContextWrapper;
