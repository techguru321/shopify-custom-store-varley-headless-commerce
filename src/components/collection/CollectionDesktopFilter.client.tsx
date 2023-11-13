import {useServerProps} from '@shopify/hydrogen';
import clsx from 'clsx';
import {SanityCustomColorCategory} from '../../types';
import BrandArrowIcon from '../icons/BrandArrow';
import CollectionDesktopItemFilter from './CollectionDesktopItemFilter.client.';
import {Filter} from '@shopify/hydrogen/storefront-api-types';
// import {ChevronDownIcon} from '../icons/ChevronDown';

/**
 * A client component that provides functionality to initially show a subset of products and a button to load more products
 */
type props = {
  filterType: string;
  customColorCategories: SanityCustomColorCategory[];
  filters: Filter[];
};

export default function CollectionDesktopFilter({
  filterType,
  customColorCategories,
  filters,
}: props) {
  const {serverProps, setServerProps} = useServerProps();
  const filterName = filterType.charAt(0).toUpperCase() + filterType.slice(1);
  // const propsName = filterType.charAt(0).toLowerCase() + filterType.slice(1);

  const handleClick = () => {
    setServerProps('filter', {
      open: serverProps['filter']
        ? serverProps['filter']['open'] === filterType
          ? ''
          : filterType
        : filterType,
      items: serverProps['filter']
        ? serverProps['filter']['items']
        : {color: [], size: [], style: []},
    });
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        className="flex items-center hover:cursor-pointer"
        onClick={handleClick}
      >
        <span className="mr-2 block font-nhaasReg text-sm">{filterName}s</span>
        <BrandArrowIcon
          className={clsx(
            'transition  duration-300  ease-in-out',
            serverProps['filter']
              ? serverProps['filter']['open'] === filterType
                ? 'rotate-180'
                : ''
              : '',
          )}
        />
      </button>
      <CollectionDesktopItemFilter
        filters={filters}
        type={filterType}
        customColorCategories={customColorCategories}
      />
    </div>
  );
}
