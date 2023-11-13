import clsx from 'clsx';
import {defaultButtonStyles} from '../elements/Button';

export default function ContactUsForm() {
  return (
    <div className="mx-auto w-[680px] px-[20px] pb-[80px]">
      <form
        method="post"
        action="/contact#contact_form"
        className="mt-[40px] w-full"
      >
        <input type="hidden" name="form_type" value="contact" />
        <input type="hidden" name="utf8" value="✓" />
        <h2 className="mt-[30px] mb-[12px] pb-[15px] font-nhaasMd text-[16px]">
          Send Us A Message
        </h2>
        <div className="mb-[20px]">
          <p className="font-nhaasReg text-[16px]">
            Please note we are not open on holidays or weekends. If you contact
            us after business hours, we will aim to get back to you the
            following business day.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[20px]">
          <div className="">
            <label
              className="font-nhassMd mb-[5px] text-[16px]"
              htmlFor="contact[first_name]"
            >
              First Name:
            </label>
            <input
              className="mb-[20px] h-[40px] w-full border px-[15px] text-[14px]"
              type="text"
              id="contact[first_name]"
              name="contact[first_name]"
            />
          </div>
          <div className="">
            <label
              className="font-nhassMd mb-[5px] text-[16px]"
              htmlFor="contact[last_name]"
            >
              Last Name:
            </label>
            <input
              className="mb-[20px] h-[40px] w-full border px-[15px] text-[14px]"
              type="text"
              id="contact[last_name]"
              name="contact[last_name]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[20px]">
          <div className="">
            <label
              className="font-nhassMd mb-[5px] text-[16px]"
              htmlFor="contact[email]"
            >
              Email:
            </label>
            <input
              type="email"
              id="contact[email]"
              name="contact[email]"
              className="mb-[20px] h-[40px] w-full border px-[15px] text-[14px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[20px]">
          <div className="">
            <label
              className="font-nhassMd mb-[5px] text-[16px]"
              htmlFor="contact[subject]"
            >
              Subject:
            </label>
            <input
              type="text"
              id="contact[subject]"
              name="contact[subject]"
              className="mb-[20px] h-[40px] w-full border px-[15px] text-[14px]"
            />
          </div>
        </div>
        <div className="">
          <div className="">
            <label
              className="font-nhassMd mb-[5px] text-[16px]"
              htmlFor="contact[message]"
            >
              Message:
            </label>
            <textarea
              id="contact[message]"
              name="contact[message]"
              className="mb-[20px] w-full border px-[15px] text-[14px]"
            />
          </div>
        </div>
        <div className="mt-[30px] mb-[60px]">
          <button
            type="submit"
            className={clsx([
              defaultButtonStyles(),
              'mx-auto h-[40px] w-[330px] px-[58px] text-[16px]',
            ])}
          >
            Submit Enquiry
          </button>
        </div>
        <div>
          <p>
            Alternativley, if you would like to get in touch about any of the
            following, please find your direct contact below.{' '}
          </p>
          <p>
            <a className="underline" href="mailto:support@varley.com">
              support@varley.com
            </a>
            <br />
            <a className="underline" href="mailto:press@varley.com">
              press@varley.com
            </a>
            <br />
            <a className="underline" href="mailto:trade@varley.com">
              trade@varley.com
            </a>
            <br />
            <a className="underline" href="mailto:partnerships@varley.com">
              partnerships@varley.com
            </a>
            <br />
            <a className="underline" href="mailto:hospitality@varley.com">
              hospitality@varley.com
            </a>
            <br />
            <a className="underline" href="mailto:blog@varley.com">
              blog@varley.com
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
