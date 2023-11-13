import {Link} from '@shopify/hydrogen';
import clsx from 'clsx';
import {useCallback} from 'react';
import {SanityMenuLink} from '../../types';
/**
 * A server component that defines the navigation for a web storefront
 */

type Props = {
  menuLinks: SanityMenuLink[];
};

export default function TopNavigation({menuLinks}: Props) {
  const renderLinks = useCallback(() => {
    return menuLinks?.map((menuLink: SanityMenuLink) => {
      let testing, parent_uri, child_uri;
      if (menuLink._type === 'linkInternal') {
        switch (menuLink.reference._type) {
          case 'page':
            testing = menuLink.reference.slug;
            parent_uri = 'pages';
            child_uri = menuLink.reference.slug.current;
            break;
          case 'product':
            testing = menuLink.reference.store.slug;
            parent_uri = 'products';
            child_uri = menuLink.reference.store.slug.current;
            break;
          case 'collection':
            testing = menuLink.reference.store.slug;
            parent_uri = 'collections';
            child_uri = menuLink.reference.store.slug.current;
            break;
          default:
            return null;
        }

        if (!testing) {
          return null;
        }

        return (
          <div key={menuLink._key} className="mt-[6px] mb-[8px] h-[20px]">
            <Link
              className="font-nhaasLt text-sm leading-[20px]"
              to={`/${parent_uri}/${child_uri}`}
            >
              {menuLink.altTitle}
            </Link>
          </div>
        );
      }

      if (menuLink._type === 'linkExternal') {
        return (
          <div key={menuLink._key} className="mt-[6px] mb-[8px] h-[20px]">
            <a
              className="font-nhaasLt text-sm leading-[20px]"
              href={menuLink.url}
              rel="noreferrer"
              target={menuLink.newWindow ? '_blank' : '_self'}
            >
              {menuLink.altTitle}
            </a>
          </div>
        );
      }

      return null;
    });
  }, [menuLinks]);

  return <nav className={clsx('flex space-x-[45px]')}>{renderLinks()}</nav>;
}
