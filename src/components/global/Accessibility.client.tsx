import clsx from 'clsx';
import {useEffect} from 'react';
import AccessibilityIcon from '../icons/Accessibility';

export default function Accessibility() {
  useEffect(() => {
    const script = document.createElement('script');
    const root = document.body ? document.body : document.querySelector('head');
    script.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
    script.async = true;
    script.onload = function () {
      acsbJS.init({
        statementLink: '',
        footerHtml: '',
        hideMobile: false,
        hideTrigger: true,
        language: 'en',
        position: 'right',
        leadColor: '#7a7a7a',
        triggerColor: '#3c3c3c',
        triggerRadius: '50%',
        triggerPositionX: 'right',
        triggerPositionY: 'bottom',
        triggerIcon: 'people',
        triggerSize: 'small',
        triggerOffsetX: 20,
        triggerOffsetY: 20,
        mobile: {
          triggerSize: 'small',
          triggerPositionX: 'right',
          triggerPositionY: 'bottom',
          triggerOffsetX: 10,
          triggerOffsetY: 10,
          triggerRadius: '50%',
        },
      });
    };

    root?.appendChild(script);
  }, []);

  return (
    <div
      className={clsx([
        'flex cursor-pointer space-x-2 pt-15 sm:items-center sm:pt-0',
        'sm:absolute sm:-bottom-18 sm:left-1/2 sm:-translate-x-1/2 md:left-auto md:-bottom-18 md:right-0 md:translate-x-0',
      ])}
      data-acsb-custom-trigger="true"
    >
      <AccessibilityIcon />
      <span className="font-nhaasLt text-[12px] sm:text-sm">Accessibility</span>
    </div>
  );
}
