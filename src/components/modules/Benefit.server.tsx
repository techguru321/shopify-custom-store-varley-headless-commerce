import type {SanityModuleBenefit} from '../../types';
import PortableText from '../portableText/PortableText.server';

type Props = {
  module?: SanityModuleBenefit;
};

export default function BenefitModule({module}: Props) {
  const benefits = module?.benefit;

  const renderBenefits = benefits.map((benefit, i) => {
    return (
      <div
        className="mx-auto  max-w-[350px]  px-10  py-8  text-center  lg:mx-0  lg:py-0"
        key={i}
      >
        <h3 className="mb-2  font-plantinItalic  text-[24px]">
          {benefit?.benefit?.name}
        </h3>
        <PortableText
          blocks={benefit?.benefit?.content}
          className="font-nhaasReg  text-sm"
        />
      </div>
    );
  });

  return (
    <div className="align-center  mt-30  mb-20  flex  w-full  flex-col  justify-center  lg:flex-row">
      {renderBenefits}
    </div>
  );
}
