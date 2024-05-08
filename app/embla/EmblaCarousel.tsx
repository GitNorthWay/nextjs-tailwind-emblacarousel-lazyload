'use client';

import React, {useCallback, useEffect, useState} from 'react'
import {EmblaCarouselType, EmblaOptionsType} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {LazyLoadImage} from './EmblaCarouselLazyLoadImage'
import {NextButton, PrevButton, usePrevNextButtons} from './EmblaCarouselArrowButtons'
import {DotButton, useDotButton} from './EmblaCarouselDotButton'


type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const {slides, options} = props
    const [emblaRed, emblaApi] = useEmblaCarousel(options)
    const [slidesInView, setSlidesInView] = useState<number[]>([])

    const {selectedIndex, scrollSnaps, onDotButtonClick} =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
        setSlidesInView((slidesInView) => {
            if (slidesInView.length === emblaApi.slideNodes().length) {
                emblaApi.off('slidesInView', updateSlidesInView)
            }
            const inView = emblaApi
                .slidesInView()
                .filter((index) => !slidesInView.includes(index))
            return slidesInView.concat(inView)
        })
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        updateSlidesInView(emblaApi)
        emblaApi.on('slidesInView', updateSlidesInView)
        emblaApi.on('reInit', updateSlidesInView)
    }, [emblaApi, updateSlidesInView])

    return (
        <div className="w-full">
            <div className="relative">
                <div className="overflow-hidden" ref={emblaRed}>
                    <div className="flex touch-pan-y ml-[-1rem]">
                        {slides.map((index) => (
                            <LazyLoadImage
                                key={index}
                                index={index}
                                imgSrc={`https://picsum.photos/600/350?v=${index}`}
                                inView={slidesInView.indexOf(index) > -1}
                            />
                        ))}
                    </div>

                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                </div>
            </div>

            <div className="flex flex-wrap justify-center mt-2 mr-2 gap-3">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'bg-transparent touch-manipulation inline-flex cursor-pointer border-0 p-0 m-0 w-4 h-4 align-items-center justify-center rounded-full'.concat(
                            index === selectedIndex ? ' shadow shadow-gray-900' : ' shadow shadow-gray-300'
                        )}
                    />
                ))}
            </div>
        </div>

    )
}

export default EmblaCarousel
