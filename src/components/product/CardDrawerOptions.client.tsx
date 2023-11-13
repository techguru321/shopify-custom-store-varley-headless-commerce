import {useProductOptions} from '@shopify/hydrogen';
import type {SanityCustomProductOptionColor} from '../../types';
import Tooltip from '../elements/Tooltip';
import Tippy from '@tippyjs/react/headless';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
import clsx from 'clsx';

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */

type Props = {
  customProductOptionColors: SanityCustomProductOptionColor[];
};

export default function CardDrawerOptions({
  customProductOptionColors
}: Props) {
  const {options, selectedOptions, variants, setSelectedOption} = useProductOptions();

  return (
    <>
      <div>
        {options.map(({name, values}) => {
          switch (name) {
            case 'Color':
              const option = options.find(option => {
                return option.name === 'Color';
              });
              return (
                <fieldset key="Color" className="mt-4">
                  <legend className="text-sm font-nhaasReg text-black mt-4 mb-2">Color : {selectedOptions.Color}</legend>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                    {option.values.map((value) => {
                      const color = customProductOptionColors.find(color => color.title === value);
                      return (
                        <Tippy
                          placement="top"
                          render={() => {
                            return (
                              <Tooltip
                                label={color.title}
                                tone="dark"
                              />
                            );
                          }}
                        >
                          <div>
                            <SanityImage
                              key={color._key} 
                              layout="responsive"
                              dataset={sanityConfig.dataset}
                              projectId={sanityConfig.projectId}
                              sizes={['50vw, 100vw']}
                              src={color?.image.asset._ref}
                              onClick={() => {setSelectedOption('Color', color.title)}}
                              className={clsx([
                                "mr-[6px] h-[29px] w-[29px] rounded-full border p-[4px] ",
                                selectedOptions.Color === color.title ? 'border-black' : "border-transparent  hover:border-black"
                              ])}
                            />
                          </div>
                        </Tippy>
                      );
                    })}
                  </div>
                </fieldset>
              );
              break;
            case 'Size':
              return (
                <fieldset key="Size" className="mt-4">
                  <legend className="text-sm font-nhaasReg text-black mt-4 mb-2">Size : {selectedOptions.Size}</legend>
            
                  <div className="flex flex-wrap items-center gap-x-[10px] gap-y-2">
                    {variants.map(variant => {
                      const selectedLabels: string[] = variant.title.split(' / ');
                      if (selectedLabels[0] === selectedOptions.Color) {  
                        return (
                          <button
                            className={clsx([
                              'drawer-button',
                              variant.availableForSale ? '' : 'out-of-stock',
                              selectedOptions.Size === selectedLabels[1] ? 'active' : ''
                            ])}
                            key={selectedLabels[1]}
                            onClick={() => {setSelectedOption('Size', selectedLabels[1])}}
                            disabled={!variant?.availableForSale ? true : false}
                          >{selectedLabels[1]}</button>
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
