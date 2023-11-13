import {useState} from 'react';
import clsx from 'clsx';

type props = {
  text: string;
  length: number;
};
export default function ShowMoreText({text, length}: props) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {text.slice(0, length)}
      {text.charAt(length) && (
        <span
          className={clsx(['cursor-pointer', showMore ? 'hidden' : 'visible'])}
          onClick={() => setShowMore(!showMore)}
        >
          {' '}
          Show More
        </span>
      )}
      <span className={clsx([showMore ? 'visible' : 'hidden'])}>
        {text.slice(length)}
        <span className="cursor-pointer" onClick={() => setShowMore(!showMore)}>
          {' '}
          Less
        </span>
      </span>
    </>
  );
}
