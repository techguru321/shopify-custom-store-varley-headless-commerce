import clsx from 'clsx';
import VarleyFooterMain from './VarleyFooterMain.server';
import VarleyFooterBottom from './VarleyFooterBottom.server';
import VarleyFooterLegal from './VarleyFooterLegal.server';

/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer() {
  return (
    <footer
      className={clsx(
        'border-black bg-black px-[40px] pt-[80px]  text-white', //
        'lg:px-5  lg:pt-[90px]',
      )}
      role="contentinfo"
    >
      {/* Varley Footer Main */}
      <VarleyFooterMain />
      {/* Varley Footer Bottom */}
      <VarleyFooterBottom />
      {/* Varley Footer Legal */}
      <VarleyFooterLegal />
    </footer>
  );
}
