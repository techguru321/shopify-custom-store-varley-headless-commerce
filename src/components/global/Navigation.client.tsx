import {Link} from '@shopify/hydrogen';
import clsx from 'clsx';
import {useCallback} from 'react';
import {SanityMenuLink} from '../../types';
import CollectionGroup from './collectionGroup/CollectionGroup.client';

/**
 * A server component that defines the navigation for a web storefront
 */

type Props = {
  menuLinks: SanityMenuLink[];
};

export default function Navigation({menuLinks}: Props) {
  const renderLinks = useCallback(() => {
    return menuLinks?.map((menuLink: SanityMenuLink) => {
      if (menuLink._type === 'navigation.section') {
        return (
          <CollectionGroup collectionGroup={menuLink} key={menuLink._key} />
        );
      }

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
          <div
            className="menu-link relative flex cursor-pointer items-center"
            key={menuLink._key}
          >
            <Link
              className="font-plantinItalic text-lg font-normal"
              to={`/${parent_uri}/${child_uri}`}
            >
              {menuLink.altTitle}
            </Link>
          </div>
        );
      }

      if (menuLink._type === 'linkExternal') {
        return (
          <div
            className="menu-link relative  flex cursor-pointer items-center "
            key={menuLink._key}
          >
            <a
              className="font-plantinItalic text-lg font-normal"
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

  return (
    <nav
      className={clsx(
        'mb-[18px] hidden items-stretch justify-start gap-9 text-sm font-bold',
        'lg:flex',
      )}
    >
      {renderLinks()}
    </nav>
  );
}
