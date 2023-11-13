import {useMemo} from 'react';
import {useLocalization, gql, useShopQuery} from '@shopify/hydrogen';
export default function Klaviyo() {
  const {country} = useLocalization();

  const query = gql`
    query ProductPriceMax($country: CountryCode) @inContext(country: $country) {
      productByHandle(handle: "1234") {
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const {data} = useShopQuery({
    query,
    variables: {
      country: country.isoCode,
    },
  });

  const klaviyoInstance = useMemo(() => {
    switch (country.isoCode) {
      case 'NL':
        return (
          <div>
            <script
              async
              type="text/javascript"
              src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=M6YUUH"
            ></script>
            <div className="klaviyo-form-Q928hi" id="klaviyo-form"></div>
          </div>
        );
      case 'US':
        return (
          <div>
            <script
              async
              type="text/javascript"
              src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Hn8DRS"
            ></script>
            <div className="klaviyo-form-Rsgppt" id="klaviyo-form"></div>
          </div>
        );
    }
  }, [country.isoCode]);

  return <div>{klaviyoInstance}</div>;
}
