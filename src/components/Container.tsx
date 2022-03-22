import { FC } from 'react';
import s from './Container.module.scss';

export type IBoxColor = 'orange' | 'blue' | 'green' | 'transparent';

export interface IBox {
  BgClass?: IBoxColor;
  cls?: string;
  onClick?: (...args: any[]) => void;
}

const Box: FC<IBox> = ({ children, BgClass, cls, onClick }) => {
  let backgroundClass = ``;
  switch (BgClass) {
    case `blue`: {
      backgroundClass = s.blue;
      break;
    }
    case `green`: {
      backgroundClass = s.green;
      break;
    }
    case `orange`: {
      backgroundClass = s.orange;
      break;
    }
    case `transparent`: {
      backgroundClass = s.transparent;
      break;
    }
    default: {
      backgroundClass = s.grey;
    }
  }
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={`${s.box} ${backgroundClass} ${cls}`}
    >
      {children}
    </div>
  );
};

export default Box;
