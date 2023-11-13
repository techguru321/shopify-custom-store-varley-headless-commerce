import clsx from 'clsx';
import sanityConfig from '../../../../sanity.config';
import SanityImage from '../../media/SanityImage.client';

export default function SizeInfoBlock({node}) {
  return (
    <div className="relative flex justify-center">
      {node.image && (
        <SanityImage
          dataset={sanityConfig.dataset}
          layout="full"
          projectId={sanityConfig.projectId}
          sizes="25vw"
          src={node.image?.asset._ref}
          className="w-[153px]"
        />
      )}
      {node.contents.map((content: any, index: number) => {
        return (
          <div
            key={content.id}
            className={`absolute w-[250px] ${content.position}-0`}
            style={{
              top: `${content.indicatorPosition.top}px`,
            }}
          >
            <h6>{content.title}</h6>
            <div className={clsx([
                'flex items-center',
                index % 2 === 0 ? 'flex-row-reverse' : '',
              ])}
              style={{
                float: `${content.position}`,
              }}
            >
              <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black text-[15px] text-white">
                {index + 1}
              </span>
              <hr
                className="mb-0 border-dashed"
                style={{
                  width: `${content.indicatorPosition.length}px`,
                }}
              />
            </div>
            <p>{content.content}</p>
          </div>
        );
      })}
    </div>
  );
}
