import { useState } from 'react'
import Head from 'next/head'
import Results from '../components/results'

export default function Home() {
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [searchterm, setSearchTerm] = useState('')

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    fetch(`api/search?searchterm=${searchterm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setResults(data.results)
        }
        setLoading(false)
      })
  }

  return (
    <div>
      <Head>
        <title>The Movie Finder</title>
        <meta name="description" content="The best movie app ever" />
      </Head>
    <div className="text-dark flex flex-col ">
      <header className="container mx-auto bg-white py-4">
        <h1 className="text-lg font-bold">
          The Movie Finder
        </h1>
      </header>
      <main className="bg-light py-4">
        <section className="container mx-auto px-12 ">
          <form className="py-8" onSubmit={(event) => handleSubmit(event)}>
            <input type="search" placeholder="Search movie, TV shows or actors" value={searchterm} onChange={handleSearchTermChange} />
            <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
          </form>

          <Results results={results}></Results>
        </section>
      </main>

      <footer className="bg-dark text-light py-8 text-center">
        <a href="https://carinh.se/">The Movie Finder</a>
      </footer>
      </div>
    </div>
  )
}
