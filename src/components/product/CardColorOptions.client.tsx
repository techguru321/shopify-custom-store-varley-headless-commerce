import { useProductOptions, useServerProps } from "@shopify/hydrogen";
import clsx from "clsx";
import sanityConfig from "../../../sanity.config";
import { SanityCustomProductOptionColor } from "../../types";
import SanityImage from "../media/SanityImage.client";

type props = {
  customProductOptionColors?: SanityCustomProductOptionColor[];
  colorOptionValues?: string[];
};
export default function CardColorOptions({
  customProductOptionColors,
  colorOptionValues
}: props) {
  const {setServerProps} = useServerProps();
  const {variants, selectedOptions, setSelectedOption} = useProductOptions();
  const handleClick = (title: string) => {
    setSelectedOption('Color', title);
    const selectedVariantsByColor = variants?.filter(variant => {
      const optionColor = variant?.selectedOptions.find(option => option.name === 'Color');
      return optionColor.value === title;
    });
    setServerProps('selectedVariantID', selectedVariantsByColor[0]?.id);
  };

  if (!customProductOptionColors)
    return;

  const colorOptions = customProductOptionColors.map((
    color: SanityCustomProductOptionColor
  ) => colorOptionValues.map((value: string) => {
    if (color.title === value) {
      return (
        <SanityImage
          key={color._key}
          layout="responsive"
          dataset={sanityConfig.dataset}
          projectId={sanityConfig.projectId}
          sizes={['50vw, 100vw']}
          src={color?.image.asset._ref}
          onClick={() => handleClick(color.title)}
          className={clsx([
            "mr-[6px] h-[29px] w-[29px] rounded-full border p-[3px] ",
            selectedOptions.Color === color.title ? 'border-black' : "border-transparent  hover:border-black"
          ])} />
      );
    }
  }));

  return (
    <div className="hidden md:flex flex-wrap">
      {colorOptions}
    </div>
  );
}