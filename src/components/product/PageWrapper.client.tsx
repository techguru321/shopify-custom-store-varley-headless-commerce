import {useEffect, useState} from 'react';
import {useLocalization} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import type {ProductWithNodes, SanityProductPage} from '../../types';
import clsx from 'clsx';
import axios from 'axios';

import Breadcrumb from '../../components/global/Breadcrumbs.client';
import ProductDetails from '../../components/product/Details.client';
import YotpoCarousel from '../../components/product/YotpoCarousel.client';
import PortableText from '../portableText/PortableText.client';

type Props = {
  initialVariantId?: ProductVariant['id'];
  sanityProduct: SanityProductPage;
  storefrontProduct: ProductWithNodes;
  breadcrumbsUrl: string;
};

export default function ProductPageWrapper({
  initialVariantId,
  sanityProduct,
  storefrontProduct,
  breadcrumbsUrl,
}: Props) {
  const breadcrumbs_collection = storefrontProduct?.metafields.find(
    (metafield) => {
      return metafield?.key === 'breadcrumbs_collection';
    },
  );

  const {country} = useLocalization();
  let yotpoKey: string;
  let productId = storefrontProduct.id || '';
  productId = productId.split('/').slice(-1)[0];
  let moreLoads = false;

  switch (country.isoCode) {
    case 'GB':
      yotpoKey = 'eUT7nBFwS2J6zeXlFSaCrpSinTddCUwSH7wWvC6U';
      break;

    case 'US':
      yotpoKey = 'OY123VpsSXHCN0m3NtrUkgojlB51XXdo0sxhxPEf';
      break;

    default:
      yotpoKey = 'jmc0ZXGTR6UiK8bS5cB8kEvfZKDhPk8FsWqCIstR';
      break;
  }

  const [allReviews, setYotpoReview] = useState([]);
  const [yotpoResult, setYotpoResult] = useState({
    bottomline: {},
  });
  const handleYotpoReviews = (review: any) => {
    setYotpoReview(allReviews.concat(review));
  };

  const handleYotpoResponse = (result: any) => {
    if (
      result.pagination.page * result.pagination.per_page <
      result.pagination.total
    ) {
      moreLoads = true;
    } else {
      moreLoads = false;
    }

    setYotpoResult(result);
  };

  useEffect(() => {
    const fetchReviews = (page = 1) => {
      const apiUrl = `https://api-cdn.yotpo.com/v1/widget/${yotpoKey}/products/${productId}/reviews.json?per_page=150&page=${page}&sort=score`;

      axios
        .get(apiUrl)
        .then((response) => {
          if (response.status === 200) {
            const reviewResp = response.data.response;

            handleYotpoReviews(reviewResp.reviews);

            if (page == 1) {
              handleYotpoResponse(reviewResp);
            }
          }
        })
        .then(() => {
          moreLoads && fetchReviews(page + 1);
        });
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <div className="py-5 pl-[30px]">
        <Breadcrumb
          url={breadcrumbsUrl}
          collectionUri={
            breadcrumbs_collection ? breadcrumbs_collection.value : ''
          }
        />
      </div>
      <div className="relative mx-auto flex max-w-[3000px] flex-col items-start pr-0 md:flex-row md:pr-[30px]">
        <ProductDetails
          initialVariantId={initialVariantId}
          sanityProduct={sanityProduct}
          storefrontProduct={storefrontProduct}
          yotpoBottomLine={yotpoResult.bottomline}
        />
      </div>

      <div className="mx-auto px-5 py-7 md:mt-8 md:px-15 md:py-8">
        {allReviews.length > 0 && (
          <YotpoCarousel
            allReviews={allReviews}
            yotpoBottomLine={yotpoResult.bottomline}
          />
        )}
      </div>

      <div
        className={clsx(
          'w-full', //
          '',
        )}
      >
        {/* Body */}
        {sanityProduct?.body && (
          <PortableText
            blocks={sanityProduct.body}
            className={clsx(
              'px-8', //
              '',
            )}
            colorTheme={sanityProduct?.colorTheme}
          />
        )}
      </div>
    </div>
  );
}
