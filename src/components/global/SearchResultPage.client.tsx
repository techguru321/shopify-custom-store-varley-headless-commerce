import {
  applyFilterWithManager,
  debug,
  FilterManager,
  KlevuConfig,
  KlevuDomEvents,
  KlevuFetch,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuListenDomEvent,
  KlevuResultEvent,
  KlevuSearchSorting,
  KlevuTypeOfRecord,
  listFilters,
  search,
  sendSearchEvent,
} from '@klevu/core';
import {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {useCallback, useEffect, useState} from 'react';
import MoneyPrice from '../product/money/Price.client';

KlevuConfig.init({
  url: 'https://eucs29.ksearchnet.com/cs/v2/search',
  apiKey: 'klevu-165157725308815120',
});

const manager = new FilterManager();
let nextFunc: KlevuNextFunc;
let clickManager: ReturnType<KlevuResultEvent['getSearchClickSendEvent']>;

export function SearchResultPage(term: string) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<KlevuFilterResultOptions[]>(
    manager.options,
  );
  const [sliders, setSliders] = useState<KlevuFilterResultSlider[]>(
    manager.sliders,
  );
  const [products, setProducts] = useState<KlevuRecord[]>([]);
  const [sorting, setSorting] = useState(KlevuSearchSorting.Relevance);
  const [showMore, setShowMore] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const initialFetch = useCallback(async () => {
  //   const modifiers = [
  //     listFilters({
  //       include: ["color", "", "size", "amount"],
  //       rangeFilterSettings: [
  //         {
  //           key: "klevu_price",
  //           minMax: true,
  //         },
  //       ],
  //       filterManager: manager,
  //     }),
  //     applyFilterWithManager(manager),
  //     sendSearchEvent(),
  //   ];

  //   const functions = [
  //     search(
  //       term,
  //       {
  //         id: "search",
  //         limit: 36,
  //         sort: sorting,
  //       },
  //       ...modifiers
  //     ),
  //   ];
  //   const res = await KlevuFetch(...functions);

  //   const searchResult = res.queriesById("search");
  //   if (!searchResult) {
  //     return;
  //   }

  //   nextFunc = searchResult.next;

  //   clickManager = searchResult.getSearchClickSendEvent();

  //   setShowMore(Boolean(searchResult.next));
  //   setOptions(manager.options);
  //   setSliders(manager.sliders);
  //   setProducts(searchResult.records ?? []);
  // }, [sorting]);

  // const fetchMore = async () => {
  //   const nextRes = await nextFunc({
  //     filterManager: manager,
  //   });

  //   const searchResult = nextRes.queriesById("search");

  //   setProducts([...products, ...(searchResult?.records ?? [])]);
  //   nextFunc = searchResult.next;
  //   setShowMore(Boolean(searchResult.next));
  // }

  // const handleFilterUpdate = () => {
  //   setOptions(manager.options);
  //   setSliders(manager.sliders);
  //   initialFetch();
  // }

  // useEffect(() => {
  //   const stop = KlevuListenDomEvent(
  //     KlevuDomEvents.FilterSelectionUpdate,
  //     handleFilterUpdate
  //   );

  //   // cleanup this component
  //   return () => {
  //     stop();
  //   }
  // }, [sorting]);

  // useEffect(() => {
  //   initialFetch();
  // }, [sorting]);
  const doSearch = async () => {
    const result = await KlevuFetch(
      search(
        term.term,
        {
          id: 'search',
          limit: 12,
          typeOfRecords: [KlevuTypeOfRecord.Product], // KLEVU_PRODUCT
          sort: KlevuSearchSorting.Relevance, // RELEVANCE
        },
        listFilters({
          include: ['color', 'size', 'amount'],
          filterManager: manager,
        }),
        debug(),
        applyFilterWithManager(manager), // make filters used by current filter state
      ),
    );
    const searchResult = result.queriesById('search');
    if (!searchResult) return;

    setProducts(searchResult.records);
  };

  const handleFilterUpdate = () => {
    doSearch();
  };

  // document.addEventListener(
  //   KlevuDomEvents.FilterSelectionUpdate,
  //   handleFilterUpdate
  // );

  useEffect(() => {
    doSearch();
  }, [sorting]);
  return (
    <div className="px-[30px] pt-5">
      <div className="mt-5 mb-4 w-full border-b border-b-[#EEEEEE] pb-3">
        <span className="font-nhaasMd">Search results:</span>&nbsp;&nbsp;
        <span className="font-nhaasReg">{term.term}</span>
      </div>
      {products?.length > 0 && (
        <div className="grid grid-cols-4">
          {products.map((product) => {
            const pos = product.url.split('/', 3).join('/').length;
            const uri = product.url.slice(pos);
            return (
              // eslint-disable-next-line react/jsx-key
              <a
                href={uri}
                className="mx-[10px] mt-[10px] inline-block pb-10 align-top"
              >
                <img src={product.image} className="aspect-[253/335] w-full" />
                <p className="mt-4 font-plantin text-md">{product.name}</p>
                <p className="font-nhaasReg text-md">
                  <MoneyPrice
                    money={
                      {
                        amount: product.price,
                        currencyCode: product.currency,
                      } as MoneyV2
                    }
                  />
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
