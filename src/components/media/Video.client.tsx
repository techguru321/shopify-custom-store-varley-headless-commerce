// import {useEffect, useRef} from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import {Size} from '../../types';
import {LazyVideo} from 'react-lazy-media';

export default function Video({content}) {
  const windowSize: Size = useWindowSize();
  // const videoRef = useRef(null);
  // useEffect(() => {
  //   videoRef.current.play();
  // }, []);
  return (
    <>
      {/* {windowSize.width >= 640 && (
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          poster={content.desktopImage}
        >
          <source data-src={content.desktopVideo} type="video/mp4" />
        </video>
      )}
      {windowSize.width < 640 && (
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          poster={content.mobileImage}
        >
          <source data-src={content.mobileVideo} type="video/mp4" />
        </video>
      )} */}
      {windowSize.width >= 640 && (
        <LazyVideo
          src={content.desktopVideo}
          width="100"
          height="800px"
          poster={content.desktopImage}
          controls={false}
          autoplay={true}
          loop={true}
          muted={true}
        />
      )}
      {windowSize.width < 640 && (
        <LazyVideo
          src={content.mobileVideo}
          width="100"
          height="100"
          poster={content.mobileImage}
          controls={false}
          autoplay={true}
          loop={true}
          muted={true}
        />
      )}
    </>
  );
}
