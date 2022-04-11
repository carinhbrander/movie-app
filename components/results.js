import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Image from 'next/image'

export default function Results({ results, baseurl }) {
  const buttonClasses = "disabled:invisible hidden md:block group"
  const arrowClasses = "block w-12 group-hover:stroke-orange-500 group-active:stroke-orange-700"

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)
    return (
      <button disabled={isFirstItemVisible} onClick={() => scrollPrev()} className={buttonClasses}>
        <ChevronLeftIcon className={arrowClasses} />
      </button>
    )
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
    return (
      <button className={buttonClasses} disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ChevronRightIcon className={arrowClasses} />
      </button>
    )
  }

  function Card({ result }) {
    const visibility = React.useContext(VisibilityContext)

    return (
      <div className="card w-48">
        <Image
          alt={result.title || result.name}
          className="rounded shadow"
          src={result.poster_path ? baseurl + "w342" + result.poster_path : 'http://placekitten.com/185/185'}
          width="342"
          height="342"
        />
        <h3 className="font-bold mt-3">{result.title || result.name}</h3>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-fit">
      {results.length == 0 &&
        <h2>No results</h2>
      }
      {results.length > 0 &&
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          scrollContainerClassName="gap-2 no-scrollbar container mx-4 md:mx-0">
          {results.map((result) => (
            <Card
              itemId={result.id.toString()}
              key={result.id}
              result={result}
            />
          ))}
        </ScrollMenu>
      }
    </section>
  )
}