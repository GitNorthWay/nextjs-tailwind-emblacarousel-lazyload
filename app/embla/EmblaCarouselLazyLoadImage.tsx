import React, { useState, useCallback } from 'react'

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`

type PropType = {
  imgSrc: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (
    <div className="flex-[0_0_100%] min-w-0 pl-[1rem]">
            <div
        className={'relative h-full'.concat(
          hasLoaded ? ' opacity-100' : ''
        )}
      >
        {!hasLoaded && (
          <span className="inline-flex absolute inset-0 m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        )}
        <img
          className={`rounded-lg block h-[25vh] w-full object-cover ${hasLoaded ? 'opacity-100' : ''}`}
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={imgSrc}
        />
      </div>
    </div>
  )
}
