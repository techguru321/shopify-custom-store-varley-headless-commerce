// import type {SanityModuleAccordion} from '../../types';
import clsx from 'clsx';
import {forwardRef} from 'react';
import {useState} from 'react';

// type Props = {
//   node: PortableTextBlock & SanityModuleAccordion;
// };

const ScrollToSectionBlock = ({node}) => {
  const handleClick = (e: any, ref: any) => {
    e.preventDefault();
    const target = document.getElementById(ref);
    if (target == null) return;

    const targetRect = target.getBoundingClientRect();
    const header = document.getElementsByTagName('header')[0];

    const clientHeight = header == undefined ? 0 : header.clientHeight;
    scrollTo({top: targetRect.top - clientHeight - 20});
  };
  return (
    <ul className={clsx('hero-menu')} data-scroll-to-anchors>
      {node?.scrollNav.map((scrollItem, i) => {
        return (
          <li key={i} className={clsx('hero-menu__item fw-medium')}>
            <a
              onClick={(e) => handleClick(e, scrollItem.sectionRef)}
              href={'#' + scrollItem.sectionRef}
              className={clsx('link_hover_expand')}
              data-scroll-to-anchors
            >
              {scrollItem.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default forwardRef(ScrollToSectionBlock);
