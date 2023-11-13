import groq from 'groq';

export const CAROUSEL = groq`
    carouselImages{
        carouselOptions {
            _type,
            active,
            align,
            arrowColour{
                _type,
                alpha,
                hex,
            },
            arrowSize,
            arrows,
            autoplay,
            autoplayDelay,
            aspectRatio,
            slideToShow,
            font,
            fontSize,
            loop,
            slidesToScroll,
        },
        modules[]{
            _key,
            _type,
            image{
                asset{
                    _ref
                }
            }
        }
    },
`;
