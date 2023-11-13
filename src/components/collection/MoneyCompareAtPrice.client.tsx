import {useMoney} from '@shopify/hydrogen/client';

/**
 * A client component that renders a product's compare at price
 */
export default function MoneyCompareAtPrice({money}) {
  const {amount, currencyNarrowSymbol} = useMoney(money);
  return (
    <span className="text-gray-500 mr-2.5 text-lg line-through">
      {currencyNarrowSymbol}
      {amount}
    </span>
  );
}
