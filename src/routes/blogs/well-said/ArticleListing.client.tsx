import {Link} from '@shopify/hydrogen';
import SanityImage from '../../../components/media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import Button from '../../../components/elements/Button';
import PortableText from '../../../components/portableText/PortableText.client';
import {useCallback} from 'react';
import groq from 'groq';
import clsx from 'clsx';

export default function ArticleListing({articles}) {
    let lastId = '';

    const fetchNextPage = useCallback(
        async () => {
        if (lastId === null) {
        return []
        }
        const {result} = await fetch(
        groq`*[_type == "post" && _id > $lastId] | order(_id) [0...50] {
            _id, title, body
        }`, {lastId});
        
        if (result.length > 0) {
        lastId = result[result.length - 1]._id;
        } else {
        lastId = null; // Reached the end
        }
        return result;
    });

    return (
        <>
            <div className="grid  grid-cols-1  md:grid-cols-2  gap-2.5  mt-5  md:mt-0">
                {articles?.map((article, i) => {
                    return (
                        <div className="mb-16  md:mt-10" key={i}>
                            <Link to={`blogs/well-said/${article.slug.current}`}>
                                {article?.categories && 
                                    <ul className="flex  mb-0  text-brandLightGrey">
                                        {article?.categories.map((cat, i) => {
                                            return (
                                                <li className="text-xs  font-nhaasReg  uppercase  letter-spacing-[0.1]  mb-2.5" key={i}>
                                                    {(article?.categories.length - 1 === i) ? cat.title : cat.title + ', ' }
                                                </li>
                                            )
                                        })}
                                    </ul>
                                
                                }
                                <SanityImage
                                    crop={article.image.image?.crop}
                                    dataset={sanityConfig.dataset}
                                    hotspot={article.image.image?.hotspot}
                                    layout="responsive"
                                    projectId={sanityConfig.projectId}
                                    sizes={['50vw, 100vw']}
                                    src={article.image.image?.asset._ref}
                                />
                                <div className="">
                                    <h3 className="font-plantin  text-xl  capitalize  mt-5">{article.title}</h3>
                                    <PortableText
                                        blocks={article.excerpt}
                                        className={clsx(
                                            'py-2.5  text-sm  font-nhaasReg', //
                                            'md:w-8/12',
                                        )}
                                    />
                                    <span className="text-link  text-xs  font-nhaasReg  capitalize">Read more</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <Button onClick={fetchNextPage}>
                Fetch More Posts
            </Button>
        </>
    )
}
