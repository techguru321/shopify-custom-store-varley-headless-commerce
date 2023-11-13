/* eslint-disable hydrogen/prefer-image-component */
import {Link} from '@shopify/hydrogen';
import clsx from 'clsx';
import Cart from '../cart/Cart.client';
import CartToggle from '../cart/CartToggle.client';
import UserIcon from '../icons/User';
import SearchIcon from '../icons/Search';
import WishlistIcon from '../icons/Wishlist';
import {useEffect, useRef, useState} from 'react';
import CloseIcon from '../icons/Close';
import {
  KlevuConfig,
  KlevuFetch,
  KlevuKMCSettings,
  KlevuLastSearch,
  KlevuLastSearches,
  KlevuRecord,
  KlevuTypeOfRecord,
  KMCRootObject,
  search,
  suggestions,
} from '@klevu/core';
import MoneyPrice from '../product/money/Price.client';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

const SEARCH_RESULT_LIMIT = 5;

export default function HeaderActions({klevuApi}) {
  const [isShown, setIsShown] = useState(false);
  // ---------------------search-----------------------------------
  KlevuConfig.init({
    url: klevuApi.url,
    apiKey: klevuApi.key,
  });
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<KlevuRecord[]>([]);
  const [lastSearches, setLastSearches] = useState<KlevuLastSearch[]>(
    KlevuLastSearches.get(),
  );
  const [sugs, setSuggestions] = useState<string[]>([]);
  const [kmcSettings, setKmcSettings] = useState<KMCRootObject>();
  const inputFocus = useRef();

  const searchModifiers: never[] = [];

  const doSearch = async (term: string) => {
    if (term.length == 0) {
      setProducts([]);
      setSuggestions([]);

      return;
    }
    const result = await KlevuFetch(
      search(
        term,
        {
          limit: SEARCH_RESULT_LIMIT,
          typeOfRecords: [KlevuTypeOfRecord.Product],
        },
        ...searchModifiers,
      ),
      suggestions(term),
    );

    const searchResult = result.queriesById('search');
    setProducts(searchResult?.records ?? []);
    setSuggestions(
      result
        .suggestionsById('suggestions')
        ?.suggestions.map((i) => i.suggest) ?? [],
    );
  };

  const handleClickItem = (event) => {
    doSearch(event.target.innerText);
    setSearchValue(event.target.innerText);
  };

  const onChange: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    doSearch(event.target.value);
    setSearchValue(event.target.value);
  };

  const fetchKMCSettings = async () => {
    const settings = await KlevuKMCSettings();
    setKmcSettings(settings.root);
  };

  const handleLastSearchesUpdate = () => {
    setLastSearches(Array.from(KlevuLastSearches.get()).reverse());
  };

  useEffect(() => {
    fetchKMCSettings();
    handleLastSearchesUpdate();
  }, [searchValue]);

  return (
    <>
      <div
        className={clsx(
          'absolute top-0 right-0 flex h-full items-center gap-6',
        )}
      >
        {/* // TODO: LUIZ ADD YOUR SEARCH BUTTON HERE */}
        <button
          onClick={() => {
            inputFocus?.current?.focus();
            setIsShown(!isShown);
            handleLastSearchesUpdate();
          }}
        >
          {!isShown ? <SearchIcon /> : <CloseIcon />}
        </button>
        {/* Account */}
        <Link
          className={clsx(['hidden h-[2.4rem] items-center', 'lg:flex', ''])}
          to="/account"
        >
          <span className="linkTextNavigation">
            <UserIcon width="19" height="22" />
          </span>
          {/* {loggedIn && <span className="linkTextNavigation">Account</span>} */}
          {/* {!loggedIn && <span className="linkTextNavigation">Log In</span>} */}
        </Link>
        {/* Cart */}
        <div className="flex h-full items-center justify-center pb-1">
          <CartToggle />
        </div>
      </div>

      {/* search menu */}
      <div
        className={clsx([
          'absolute',
          'top-[48px] px-6 md:top-[88px]',
          '-ml-4 md:-ml-8',
          'transform bg-white duration-500 ease-in-out',
          'flex w-[100vw] flex-col items-center',
          isShown
            ? 'opacity-1  pointer-events-auto'
            : '  pointer-events-none  opacity-0',
        ])}
      >
        <div className=" my-5 h-[35px] w-full sm:w-[405px]">
          <form
            action="/search"
            method="get"
            className="flex h-full w-full items-center border-b"
            autoComplete="off"
          >
            <input
              type="text"
              name="q"
              className="h-full w-full font-nhaasMd focus-visible:outline-none"
              placeholder="Search"
              onChange={onChange}
              value={searchValue}
              autoComplete="off"
              ref={inputFocus}
            />
            <button className="h-[21px] w-[25px]" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42.128"
                height="12.708"
                viewBox="0 0 42.128 12.708"
                className="h-full w-full stroke-2"
              >
                <g transform="translate(-136.982 -892.226)">
                  <path
                    d="M0-5.362V36.025"
                    transform="translate(142.344 898.534) rotate(-90)"
                    fill="none"
                    stroke="#000"
                  ></path>
                  <path
                    d="M1099.524,643.151l6.177,6.177,6.177-6.177"
                    transform="translate(-470.571 2004.282) rotate(-90)"
                    fill="none"
                    stroke="#000"
                  ></path>
                </g>
              </svg>
            </button>
          </form>
        </div>
        <div
          className={clsx([
            'mb-30 flex',
            'flex-col space-y-6 md:flex-row md:space-y-0',
            'w-full md:w-auto ',
            !products?.length ? 'mt-13 md:space-x-30' : '',
          ])}
        >
          <div className={!products?.length ? '' : 'mt-8 min-w-[200px]'}>
            <div className="mb-8 font-nhaasMd text-md">Popular Searches</div>
            <ul className="space-y-2">
              {!sugs.length &&
                kmcSettings &&
                kmcSettings.klevu_webstorePopularTerms.map((item) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <li
                      key={item}
                      className="cursor-pointer font-nhaasReg text-md"
                      onClick={handleClickItem}
                    >
                      {item}
                    </li>
                  );
                })}
              {sugs.length > 0 &&
                sugs.map((item) => {
                  return (
                    <li key={item} className="font-nhaasReg text-md">
                      <a
                        dangerouslySetInnerHTML={{__html: item}}
                        href={
                          '/pages/search-result/?q=' +
                          item.replace(/(<([^>]+)>)/gi, '')
                        }
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          {!products?.length && (
            <div>
              <div className="mb-8 font-nhaasMd text-md">Recent Searches</div>
              <ul className="space-y-2">
                {lastSearches.length > 0 &&
                  lastSearches.map((s, i) => {
                    return (
                      <li
                        key={i}
                        className="cursor-pointer font-nhaasReg text-md"
                        onClick={handleClickItem}
                      >
                        {s.term}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          {products?.length > 0 && (
            <div className="flex overflow-x-auto lg:max-w-[1000px]">
              {[0, 1, 2, 3, 4].map(index => {
                if (index < products.length) {
                  const product = products[index];
                  const pos = product.url.split('/', 3).join('/').length;
                  const uri = product.url.slice(pos);
                  return (
                    <a
                      key={product.id}
                      href={uri}
                      className="inline-block min-w-[187px] px-2 pt-2 pb-10 align-top lg:w-[187px]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-[187/245] lg:h-[241px]"
                      />
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
                } else {
                  return (
                    <div
                      className="inline-block min-w-[187px] px-2 pt-2 pb-10 align-top lg:w-[187px]"
                      key={index}
                    >
                    </div> 
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
      <Cart />
    </>
  );
}
