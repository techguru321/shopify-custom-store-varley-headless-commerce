import {useServerProps} from '@shopify/hydrogen';
import clsx from 'clsx';
import {SanityCustomColorCategory} from '../../types';
import type {FilterValue, Filter} from '@shopify/hydrogen/storefront-api-types';
import {defaultButtonStyles} from '../elements/Button';
import BrandArrowIcon from '../icons/BrandArrow';

type props = {
  filters: any[];
  customColorCategories: SanityCustomColorCategory[];
};

export default function CollectionMobileFilter({
  filters,
  customColorCategories,
}: props) {
  const {serverProps, setServerProps} = useServerProps();
  const renderItems = {
    color: [],
    size: [],
    style: [],
  };

  const clearFilter = () => {
    document.querySelectorAll('.filter-item:checked').forEach((item) => {
      item.checked = false;
    });
    setServerProps('filter', {
      open: '',
      items: {
        color: [],
        size: [],
        style: [],
      },
    });
  };
  const handleFilter = () => {
    const checked_items = {
      color: [],
      size: [],
      style: [],
    };

    document.querySelectorAll('.filter-item:checked ~ span').forEach((item) => {
      checked_items[item.dataset.type].push(item.innerText.split(' (')[0]);
    });

    setServerProps('filter', {
      open: '',
      items: checked_items,
    });
  };
  filters.forEach((filter: Filter) => {
    const filterType = filter.label;
    filter.values.forEach((value: FilterValue) => {
      const type =
        filterType === 'Product type' ? 'style' : filterType.toLowerCase();

      if (type !== 'color')
        renderItems[type as keyof typeof renderItems][value.label] =
          value.count;
    });
  });
  const colorFilter = filters.find(
    (filter: Filter) => filter.label === 'Color',
  );
  customColorCategories.forEach((category: SanityCustomColorCategory) => {
    let count = 0;
    category.categoryContent &&
      colorFilter.values.forEach((value: FilterValue) => {
        if (category.categoryContent.includes(value.label))
          count += value.count;
      });

    if (count != 0) {
      renderItems.color[category.categoryName] = count;
    }
  });
  return (
    <>
      <div className="mr-3">
        <div className="flex items-center justify-center">
          <button
            className="flex items-center hover:cursor-pointer"
            onClick={() => {
              setServerProps('filter', {
                open: 'all',
                items: serverProps['filter']
                  ? serverProps['filter']['items']
                  : {color: [], size: [], style: []},
              });
            }}
          >
            <span className="mr-1 block font-nhaasReg text-sm">Filters</span>
            {serverProps['filter'] && serverProps['filter']['open'] === 'all' ? (
              <BrandArrowIcon className="rotate-180 transition  duration-300  ease-in-out" />
            ) : (
              <BrandArrowIcon className="transition  duration-300  ease-in-out" />
            )}
          </button>
        </div>
      </div>
      <div
        className={clsx([
          serverProps['filter']
            ? serverProps['filter']['open'] === 'all'
              ? 'block'
              : 'hidden'
            : 'hidden',
          'absolute left-0 top-[38px] w-full border-t border-t-brandClay bg-white px-5 py-8 sm:hidden',
        ])}
      >
        <div className="collection-filter black-scrollbar overflow-y-scroll">
          {Object.keys(renderItems).map((type) => {
            const title = type.charAt(0).toUpperCase() + type.slice(1);
            return (
              <>
                <h2 className="mb-6 font-nhaasMd text-md font-medium">
                  {title}s
                </h2>
                <ul className="mb-6 grid grid-cols-2 gap-y-4">
                  {Object.keys(renderItems[type]).map((key) => {
                    return (
                      <li key={key}>
                        <label className="flex items-center ">
                          <input
                            type="checkbox"
                            value={key}
                            className="filter-item mr-[9px] h-5 w-5 accent-black"
                          />{' '}
                          <span
                            className="font-nhaasReg text-md"
                            data-type={type}
                          >
                            {key}
                             {/* ({renderItems[type][key]}) */}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between gap-5">
          <button
            className={clsx([
              defaultButtonStyles({mode: 'outline'}),
              'h-[50px] w-full rounded-sm font-nhaasMd text-md',
            ])}
            onClick={() => {
              clearFilter();
            }}
          >
            Clear filters
          </button>
          <button
            className={clsx([
              defaultButtonStyles(),
              'h-[50px] w-full rounded-sm font-nhaasMd text-md',
            ])}
            onClick={() => {
              handleFilter();
            }}
          >
            Apply filters
          </button>
        </div>
      </div>
    </>
  );
}
