import {useState} from 'react';
import {Link} from '@shopify/hydrogen';
import SanityImage from '../../media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import {SanityMenuLink} from '../../../types';

type props = {
  collectionGroup: SanityMenuLink;
  key: string;
};

export default function CollectionGroup({collectionGroup, key}: props) {
  const [isShown, setIsShown] = useState(false);
  const [isMMShown, setIsMMShown] = useState(false);
  const handleClick = () => {
    setIsMMShown(false);
  };
  return (
    <div
      key={key}
      className={`header__menu-list-item`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        className={`flex cursor-pointer items-center ${
          isShown || isMMShown ? 'menu-active' : ''
        } menu-link relative`}
        key={collectionGroup.navigationItem._id}
      >
        <Link
          onClick={handleClick}
          className="font-plantinItalic text-lg font-normal"
          to={`${collectionGroup.navigationItem._type}s/${
            collectionGroup.navigationItem.store?.slug?.current ||
            collectionGroup.navigationItem.slug?.current
          }`}
        >
          {collectionGroup.navigationItem.altTitle}
        </Link>
      </div>
      <div
        className={`header__submenu duration-0  erase-in-out  absolute top-[39px]  left-1/2  right-1/2  ml-[-50vw]  mr-[-50vw]  flex-grow  flex-wrap border-b border-lightGray1 bg-white ease-in-out`}
      >
        <div className="m-auto  flex  max-w-[1260px]  justify-center px-[30px]">
          {collectionGroup?.links?.map((item: any) => {
            if (item._type === 'navigation.link') {
              return (
                <div
                  className="flex  basis-[174px]  flex-col pt-13 pb-11"
                  key={item._key}
                >
                  <ul className="flex  flex-col">
                    {item?.children?.map((link: SanityMenuLink) => {
                      return (
                        <li className="mb-4" key={link._key}>
                          <Link
                            className="menu-link relative inline-block  font-nhaasLt text-sm font-normal"
                            to={
                              !link.reference
                                ? link.url
                                : `${link.reference._type}s/${link.reference.store.slug.current}`
                            }
                            onClick={handleClick}
                          >
                            {link.altTitle}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }

            if (item._type === 'navigation.image') {
              const image = item.image;
              return (
                <div
                  className="mr-4  flex  pt-13 pb-11 last:mr-0"
                  key={item._key}
                >
                  <Link
                    to={`${item.callToAction.links[0].reference._type}s/${item.callToAction.links[0].reference.store.slug.current}`}
                  >
                    <SanityImage
                      crop={image?.crop}
                      dataset={sanityConfig.dataset}
                      hotspot={image?.hotspot}
                      layout="responsive"
                      projectId={sanityConfig.projectId}
                      sizes={['50vw, 100vw']}
                      className="h-[206px]  w-[168px]"
                      src={image?.asset._ref}
                    />
                    <span className="align-center  text-nhaasReg  mt-4  flex  font-normal  leading-none">
                      {item.callToAction.title}
                    </span>
                  </Link>
                </div>
              );
            }

            return null;
          })}
        </div>
        {/* <div
            className="header__submenu__backdrop"
            onMouseEnter={() => console.log('backdrop mouse enter')}
          ></div> */}
      </div>
    </div>
  );
}
