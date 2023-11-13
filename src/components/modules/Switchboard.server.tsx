/* eslint-disable jsx-a11y/click-events-have-key-events */
// import type {SanityModuleSwitchboard} from '../../types';
import {Link} from '@shopify/hydrogen';
import BrandArrowIcon from '../icons/BrandArrow';
import Heading from '../global/Heading.server';
import clsx from 'clsx';
import SanityImageWrapper from '../media/SanityImageWrapper.client';

// type Props = {
//   module?: SanityModuleSwitchboard;
// };

export default function Switchboard({module}) {
  const renderSwitchboard = module.buttons.map((button, i) => {
    switch (button?.links[0]?._type) {
      case 'linkEmail': {
        return (
          <div key={i} className="trigger--chat">
            <div
              className="georgias--trigger--open--hide"
              onClick="GorgiasChat.open();"
            >
              <div className="relative  flex h-15  cursor-pointer  items-center  border  border-brandClay  bg-white  px-5">
                <svg
                  className="mr-5  aspect-square  w-[29px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="21"
                  viewBox="0 0 29 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.1028 20.632H4.05735C3.00289 20.6308 1.99198 20.2114 1.24636 19.4658C0.913656 19.133 0.645896 18.7475 0.451257 18.3289C0.431832 18.2957 0.41508 18.2608 0.401244 18.2246C0.395881 18.2105 0.390983 18.1963 0.386552 18.182C0.186739 17.7026 0.0806999 17.1842 0.0800781 16.6548V4.65745C0.0813165 3.60299 0.500747 2.59207 1.24636 1.84646C1.99198 1.10084 3.00289 0.681414 4.05735 0.680176H24.1028C25.1573 0.681414 26.1682 1.10084 26.9138 1.84646C27.6594 2.59207 28.0788 3.60299 28.0801 4.65745V16.6548C28.0788 17.7092 27.6594 18.7201 26.9138 19.4658C26.1682 20.2114 25.1573 20.6308 24.1028 20.632ZM1.9449 18.1247C2.03133 18.2489 2.12912 18.3661 2.23759 18.4745C2.72022 18.9572 3.37481 19.2283 4.05735 19.2283H24.1028C24.7853 19.2283 25.4399 18.9572 25.9226 18.4745C26.031 18.3661 26.1288 18.2489 26.2152 18.1247L18.4573 11.2058L16.4805 12.7009C15.7886 13.2215 14.9459 13.5024 14.0801 13.501C13.2142 13.5024 12.3715 13.2215 11.6797 12.7009L9.70284 11.2058L1.9449 18.1247ZM8.56051 10.3418L1.48382 16.6531V4.9896L8.56051 10.3418ZM9.99118 9.67219L1.78147 3.45602C1.90063 3.23027 2.05377 3.0215 2.23759 2.83769C2.72022 2.35506 3.37481 2.08392 4.05735 2.08392H24.1028C24.7853 2.08392 25.4399 2.35506 25.9226 2.83769C26.1064 3.0215 26.2595 3.23026 26.3787 3.45601L18.169 9.67216C18.0983 9.70881 18.0344 9.75722 17.9799 9.8153L15.6335 11.5919C15.1849 11.9269 14.64 12.1078 14.0801 12.1078C13.5202 12.1078 12.9753 11.9269 12.5266 11.5919L10.1801 9.81526C10.1252 9.75672 10.0612 9.70853 9.99118 9.67219ZM19.5994 10.342L26.6763 16.6569C26.6763 16.6562 26.6763 16.6555 26.6763 16.6548V4.9896L19.5994 10.342Z"
                    fill="black"
                  />
                </svg>
                <span className="font-nhaasReg  font-normal">Email Us</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="10"
                  viewBox="0 0 19 10"
                  className="absolute  right-4  h-2.5  w-[15px]  -rotate-90"
                >
                  <g>
                    <g>
                      <path
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="50"
                        strokeWidth="2"
                        d="M1.852.954v0L9.6 8.702v0L17.348.954v0"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        );
      }
      case 'linkChat': {
        return (
          <div key={i} className="trigger--chat">
            <div
              className="georgias--trigger--open--hide"
              onClick="GorgiasChat.open();"
            >
              <div className="relative  flex h-15  cursor-pointer  items-center  border  border-brandClay  bg-black  px-5  text-white">
                <svg
                  className="mr-5  aspect-square  w-[26px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="none"
                >
                  <path
                    clipRule="evenodd"
                    d="M13.068 1A12.024 12.024 0 0 0 2.753 6.76a11.983 11.983 0 0 0-.388 11.795l.24.468c.198.369.239.8.115 1.2-.343.911-.63 1.842-.859 2.789 0 .48.138.754.653.742.912-.201 1.81-.46 2.69-.777.379-.104.781-.08 1.145.069.332.16 1.007.571 1.03.571a12.035 12.035 0 0 0 13.54-1.608 11.987 11.987 0 0 0 3.322-13.204A12.019 12.019 0 0 0 13.068 1Z"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.345 14.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM13.068 14.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM18.79 14.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-nhaasReg  font-normal">Chat Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="10"
                  viewBox="0 0 19 10"
                  className="absolute  right-4  h-2.5  w-[15px]  -rotate-90"
                >
                  <g>
                    <g>
                      <path
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="50"
                        strokeWidth="2"
                        d="M1.852.954v0L9.6 8.702v0L17.348.954v0"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        );
      }
      case 'linkInternal': {
        return (
          <Link
            // TODO: Fix this, no idea why it's broken
            to={button?.links[0]?.reference?.slug?.current}
            key={i}
            className="relative  flex h-15  items-center  border  border-brandClay  bg-white  px-5  font-nhaasReg  font-normal"
          >
            <SanityImageWrapper
              src={button?.content[0]?.asset._ref}
              className="mr-5  aspect-square  w-6"
            />
            
            <span className="font-nhaasReg  font-normal">
              {button?.links[0]?.altTitle}
            </span>
            <BrandArrowIcon className="absolute  right-4  h-2.5  w-[15px]  -rotate-90" />
          </Link>
        );
      }
      case 'linkExternal': {
        return (
          <Link
            // TODO: Fix this, no idea why it's broken
            to="#"
            key={i}
            className="relative  flex h-15  items-center  border  border-brandClay  px-5  font-nhaasReg  font-normal"
          >

            <SanityImageWrapper
              src={button?.content[0]?.asset._ref}
              className="mr-5  aspect-square  w-6"
            />
            <span className="font-nhaasReg  font-normal">
              {button?.links[0]?.altTitle}
            </span>
            <BrandArrowIcon className="absolute  right-4  h-2.5  w-[15px]  -rotate-90" />
          </Link>
        );
      }
    }
  });
  return (
    <div className="mx-auto  max-w-[680px]">
      {module?.sectionHeading && <Heading item={module?.sectionHeading} />}
      <div
        className={clsx([
          'mt-5  grid gap-4',
          module.buttons.length <= 1
            ? `grid-cols-1  md:mx-auto md:w-1/2 md:grid-cols-1`
            : `grid-cols-1  md:grid-cols-2`,
        ])}
      >
        {renderSwitchboard}
      </div>
    </div>
  );
}
