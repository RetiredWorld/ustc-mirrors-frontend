import { FC } from 'react';
import Link from 'next/link';
import s from './Container.module.scss';

export type IBoxColor = 'orange' | 'blue' | 'green' | 'pure';

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
      backgroundClass = s.ctBlue;
      break;
    }
    case `green`: {
      backgroundClass = s.ctGreen;
      break;
    }
    case `orange`: {
      backgroundClass = s.ctOrange;
      break;
    }
    case `pure`: {
      backgroundClass = s.ctPure;
      break;
    }
    default: {
      backgroundClass = s.ctGrey;
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
