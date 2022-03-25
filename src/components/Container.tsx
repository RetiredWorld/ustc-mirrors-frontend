import { FC } from 'react';
import Link from 'next/link';
import s from './Container.module.scss';

export type IBoxColor = 'orange' | 'blue' | 'green' | 'transparent';

export interface IBox {
  BgClass?: IBoxColor;
  cls?: string;
  link?: string;
  onClick?: (...args: any[]) => void;
}

const Box: FC<IBox> = ({ children, BgClass, cls, onClick, link }) => {
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
  const containerEle = (
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
  return link ? (
    <Link href={link} passHref>
      {containerEle}
    </Link>
  ) : (
    containerEle
  );
};

export default Box;
