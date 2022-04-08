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

      <main>
        <h1>
          The Movie Finder
        </h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input type="search" placeholder="Search movie, TV shows or actors" value={searchterm} onChange={handleSearchTermChange} />
          <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>

        <Results results={results}></Results>
      </main>

      <footer>
        <a href="https://carinh.se/">Carin H Brander - Your friendly neighborhood dev</a>
      </footer>
    </div>
  )
}
