import {Link} from '@shopify/hydrogen/client';
import React from 'react';

export default function Breadcrumb({url = '', collectionUri = '', helpCentre = false}) {
  const arrUrl = url.split('/');
  let title = '';
  const arrUrlFix = arrUrl.map((v) => {
    if (v && collectionUri && v.includes('products')) {
      return collectionUri;
    }
    if (
      v && !v.includes(':') && !v.includes('.') 
      && !v.includes('collections')
      && !v.includes('pages')
    ) {
      return v;
    }
  });
  return (
    <div className="flex  items-center">
      <ol className="flex  list-none  items-center  font-nhaasReg  text-sm">
        <li className="text-brandAsphalt">
          <Link to="/" className="capitalize  underline">
            Home
          </Link>
          <span className="mx-[3px]  text-brandAsphalt"> / </span>
        </li>
        {arrUrlFix.map((v, i) => {
          const last = arrUrlFix.length - 1 === i;
          const beforeLast = arrUrlFix.length - 2 === i;
          if (last) title = v?.replace(/-/g, ' ')?.toUpperCase();
          if (v && !v.includes(':') && !v.includes('.')) {
            return (
              <React.Fragment key={i}>
                <li
                  className={`text-sm  capitalize  text-brandAsphalt ${
                    last && 'active'
                  }`}
                >
                  {beforeLast && collectionUri 
                  ? (
                    <Link to={`/${v.replace(/ /g, '-')}`} className="capitalize underline">
                      {v.toLowerCase()}
                    </Link>  
                  ) 
                  : (
                    last 
                    ? (
                      helpCentre 
                      ? (
                        <Link to={`/${v.replace(/ /g, '-')}`} className="capitalize underline">
                          {title.toLowerCase()}
                        </Link>
                      ) 
                      : title.toLowerCase()
                    )
                    : (
                      <Link to={`/${v}`} className="capitalize underline">
                        {v.toLowerCase()}
                      </Link>
                    )
                  )}
                </li>
                {!last && <span className="mx-[3px]  text-brandAsphalt"> / </span> }
              </React.Fragment>
            );
          }
        })}
      </ol>

      {/* <p className="font-nhaasReg  text-sm  capitalize  text-brandAsphalt">
        {title.toLowerCase()}
      </p> */}
      {/* <!-- End Title --> */}
    </div>
  );
}
