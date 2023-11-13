import {useProductOptions} from '@shopify/hydrogen';
import type {SanityCustomProductOption} from '../../../types';
import Tooltip from '../../elements/Tooltip';
import Tippy from '@tippyjs/react/headless';
import SanityImage from '../../media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import clsx from 'clsx';

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */

type Props = {
  customProductOptions?: SanityCustomProductOption[];
};

export default function ProductOptions({customProductOptions}: Props) {
  const {
    options,
    selectedOptions,
    selectedVariant,
    variants,
    setSelectedOption,
  } = useProductOptions();

  return (
    <>
      <div>
        {options.map(({name}) => {
          switch (name) {
            case 'Color':
              const option = options.find(option => {
                return option.name === 'Color';
              });
              return (
                <fieldset key="Color" className="mt-10">
                  <legend className="text-sm font-nhaasReg text-black mb-1">Color : {selectedOptions.Color}</legend>
                  <div className="flex flex-wrap items-center gap-x-3">
                    {option.values.map((value) => {
                      const color = customProductOptions[0].colors.find(color => color.title === value);
                      if (color) {
                        return (
                          <Tippy
                            placement="top"
                            render={() => {
                              return <Tooltip label={color.title} />;
                            }}
                          >
                            <div
                              className={clsx([
                                'rounded-full border hover:border-black',
                                selectedOptions.Color === color.title
                                  ? 'border-black'
                                  : 'border-transparent',
                              ])}
                            >
                              <SanityImage
                                key={color._key}
                                layout="responsive"
                                dataset={sanityConfig.dataset}
                                projectId={sanityConfig.projectId}
                                sizes={['50vw, 100vw']}
                                src={color?.image.asset._ref}
                                onClick={() => {
                                  setSelectedOption('Color', color.title);
                                }}
                                className={clsx([
                                  'h-[28px] w-[28px] rounded-full border-[3px] border-white',
                                ])}
                              />
                            </div>
                          </Tippy>
                        );
                      } else {
                        return <div>{value}</div>;
                      }
                    })}
                  </div>
                </fieldset>
              );
              break;
            case 'Size':
              return (
                <fieldset key="Size" className="mt-5">
                  <legend className="mb-1 font-nhaasReg text-sm text-black">
                    Size : {selectedOptions.Size}
                  </legend>

                  <div className="flex flex-wrap items-center">
                    {variants.map(variant => {
                      if (variant.title.includes(selectedOptions.Color)) {
                        const label = variant.title.split(' / ')[1];
                        return (
                          <button
                            className={clsx([
                              'drawer-button',
                              !variant.availableForSale ? 'out-of-stock' : '',
                              variant === selectedVariant ? 'active' : '',
                            ])}
                            key={label}
                            onClick={() => {
                              setSelectedOption('Size', label);
                            }}
                          >
                            {label}
                          </button>
                        );
                      }
                    })}
                  </div>
                </fieldset>
              );
              break;
            default:
              break;
          }
        })}
      </div>
    </>
  );
}
