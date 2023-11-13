import type {SanityModulePeople} from '../../types';
// import Heading from '../global/Heading.server';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
import React, {useEffect, useRef} from 'react';

// type Props = {
//   module?: SanityModulePeople;
// };

export default function People({module}) {
  const people = module?.people;
  const reference = useRef(module.ref);
  // TODO: FIX THE SHIT OUT OF THIS.
  useEffect(() => {
    const _mq = window.matchMedia('(max-width: 768px)');
    const _limit = _mq.matches ? 6 : 10;
    const _items = document.querySelectorAll('.our-people__item');
    const el = document.querySelector('#container-people');
    const _interval = parseFloat(el?.dataset?.interval) * 1000;
    function initGrid() {
      document.querySelectorAll('.our-people__item').forEach((item, key) => {
        if (key < _limit) {
          item.classList.remove('hide');
        }
      });
    }
    function connectedCallback() {
      if (_items.length > _limit + 4) {
        setInterval(changeGrids, _interval);
      }
    }
    function changeGrids() {
      let outRandom1 = randomIntInclusive(_limit, _items.length - 1);
      let outRandom2, outRandom3;
      while (1) {
        outRandom2 = randomIntInclusive(_limit, _items.length - 1);
        outRandom3 = randomIntInclusive(_limit, _items.length - 1);
        if (outRandom1 !== outRandom2 && outRandom2 !== outRandom3) {
          break;
        }
      }

      let inRandom1 = randomIntInclusive(0, _limit - 1);
      let inRandom2, inRandom3;
      while (1) {
        inRandom2 = randomIntInclusive(0, _limit - 1);
        inRandom3 = randomIntInclusive(0, _limit - 1);
        if (inRandom1 !== inRandom2 && inRandom2 !== inRandom3) {
          break;
        }
      }

      let tempElem = _items[inRandom1].innerHTML;
      _items[inRandom1].innerHTML = _items[outRandom1].innerHTML;
      _items[outRandom1].innerHTML = tempElem;

      tempElem = _items[inRandom2].innerHTML;
      _items[inRandom2].innerHTML = _items[outRandom2].innerHTML;
      _items[outRandom2].innerHTML = tempElem;

      tempElem = _items[inRandom3].innerHTML;
      _items[inRandom3].innerHTML = _items[outRandom3].innerHTML;
      _items[outRandom3].innerHTML = tempElem;
    }

    function randomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    initGrid();
    connectedCallback();
  }, []);

  const renderPeople = people.map((person, i) => {
    return (
      <div className="our-people__item  hide  relative" key={i}>
        <SanityImage
          dataset={sanityConfig.dataset}
          layout="responsive"
          projectId={sanityConfig.projectId}
          sizes={['50vw, 100vw']}
          className="aspect-[2/3]  object-cover"
          src={person?.person.image.asset._ref}
        />
        <div className="absolute  top-0 bottom-0 left-0 right-0 z-10 flex  flex-col  items-center  justify-center  bg-[rgba(0,0,0,.6)]  opacity-0   transition duration-150 ease-out hover:opacity-100   hover:ease-in">
          <div className="font-nhaasReg  text-xl  text-white">
            {person.person.name}
          </div>
          <div className="font-plantinItalic  text-xl  text-white">
            {person.person.role}
          </div>
        </div>
      </div>
    );
  });

  return (
    <section
      data-interval="3"
      id="container-people"
      className="mx-auto  grid  max-w-[1240px]  grid-cols-2  px-5  pb-13  md:grid-cols-5"
      ref={reference}
    >
      {renderPeople}
    </section>
  );
}
