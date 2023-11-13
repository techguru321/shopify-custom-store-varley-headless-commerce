import {
  SanityCustomColorCategory,
  SanityCustomProductOptionColor,
  Size,
} from '../../types';
import {Filter} from '@shopify/hydrogen/storefront-api-types';
import CollectionMobileFilter from './CollectionMobileFilter.client';
import CollectionDesktopFilter from './CollectionDesktopFilter.client';
import useWindowSize from '../../hooks/useWindowSize';

type props = {
  customColorCategories?: SanityCustomColorCategory[];
  filters: Filter[];
};

export default function Filters({customColorCategories, filters}: props) {
  const filterTypes = ['color', 'size', 'style'];
  const windowSize: Size = useWindowSize();
  return (
    <>
      {windowSize.width < 640 && (
        <CollectionMobileFilter
          filters={filters}
          customColorCategories={customColorCategories ?? []}
        />
      )}
      {windowSize.width >= 640 && (
        <div className="flex space-x-12">
          {filterTypes.map((filterType: string) => (
            <CollectionDesktopFilter
              key={filterType}
              filterType={filterType}
              customColorCategories={customColorCategories ?? []}
              filters={filters}
            />
          ))}
        </div>
      )}
    </>
  );
}
