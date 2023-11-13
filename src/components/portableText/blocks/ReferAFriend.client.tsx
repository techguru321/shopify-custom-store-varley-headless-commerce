// import type {SanityModuleAccordion} from '../../types';
import clsx from 'clsx';
import {forwardRef} from 'react';
import {useState} from 'react';

// type Props = {
//   node: PortableTextBlock & SanityModuleAccordion;
// };

const ReferAFriendBlock = ({node}) => {
  return (
    <iframe
      id="mmContentReferrerStage1"
      scrolling="no"
      title="Mention Me"
      src="https://mention-me.com/a/xxzixpfc/er/display?partnercode=mme4c25f58&amp;situation=landingpage&amp;flowid=a773ffeaa7d121d513471f7f1fd1b6408344f8a1&amp;locale=en_EU&amp;isResponsive=false&amp;screenWidth=1920&amp;screenHeight=937"
      width="960"
      height="630"
      frameBorder={0}
      allow="web-share"
      name="ReferrerStage11680845790000"
      data-mm-identifier="mm1680845789992"
      className={clsx('mx-auto')}
    ></iframe>
  );
};

export default forwardRef(ReferAFriendBlock);
