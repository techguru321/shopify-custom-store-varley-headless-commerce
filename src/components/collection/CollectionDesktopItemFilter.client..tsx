import {useServerProps} from '@shopify/hydrogen';
import clsx from 'clsx';
import {SanityCustomColorCategory} from '../../types';
import type {FilterValue, Filter} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce';

type props = {
  filters: any;
  type: string;
  customColorCategories?: SanityCustomColorCategory[];
};

export default function CollectionDesktopItemFilter({
  filters,
  type,
  customColorCategories = [],
}: props): JSX.Element {
  const {serverProps, setServerProps} = useServerProps();
  const [checkedItems, setCheckedItems] = useState({
    color: [],
    size: [],
    style: [],
  });
  const debouncedCheckedItems = useDebounce(checkedItems, 500);

  const filterType =
    type === 'style'
      ? 'Product type'
      : type.charAt(0).toUpperCase() + type.slice(1);
  const filter = filters.find((filter: Filter) => {
    return filter.label === filterType;
  });
  const colorFilterValues: FilterValue[] = [];
  if (type === 'color') {
    customColorCategories.forEach((category: SanityCustomColorCategory) => {
      let count = 0;
      category.categoryContent &&
        filter.values.forEach((value: FilterValue) => {
          if (category.categoryContent.includes(value.label))
            count += value.count;
        });

      if (count != 0) {
        colorFilterValues.push({
          count,
          label: category.categoryName,
          id: '',
          input: undefined,
        });
      }
    });
  }

  const filterValues = type === 'color' ? colorFilterValues : filter.values;

  const handleFilter = () => {
    const checked_items = {
      color: [],
      size: [],
      style: [],
    };

    document
      .querySelectorAll('.filter-item:checked ~ span')
      .forEach((item: HTMLElement): void => {
        checked_items[item.dataset.type].push(item.innerText.split(' (')[0]);
      });

    setCheckedItems(checked_items);
  };

  useEffect(() => {
    debouncedCheckedItems &&
      setServerProps('filter', {
        open: serverProps['filter'] ? serverProps['filter']['open'] : '',
        items: debouncedCheckedItems,
      });
  }, [debouncedCheckedItems])

  return (
    <div
      className={clsx([
        serverProps['filter']
          ? serverProps['filter']['open'] === type
            ? ''
            : 'hidden'
          : 'hidden',
        'absolute left-0 top-[45px] z-10 min-w-[305px] border border-black/20 bg-white py-10 pl-5 pr-1 transition-width duration-300 ease-in-out',
      ])}
    >
      <div
        className="custom-scroll flex flex-col overflow-y-auto" // max-h-[293px]
        key={filter.id}
      >
        <ul className="">
          {filterValues.map((value: any) => {
            return (
              <li key={value.id} className="mb-2 last:mb-0">
                <label className="flex items-center">
                  <input
                    className="filter-item mr-[9px] h-5 w-5 accent-black"
                    type="checkbox"
                    value={value.label}
                    onChange={handleFilter}
                    checked={checkedItems[type].includes(value.label)}
                  />
                  <span
                    className="whitespace-nowrap font-nhaasReg text-md"
                    data-type={type}
                  >
                    {value.label}
                     {/* ({value.count}) */}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
