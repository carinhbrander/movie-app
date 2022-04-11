import { useState } from 'react'
import Head from 'next/head'
import { SearchIcon } from '@heroicons/react/outline'
import { loadConfig } from '../lib/apiconfig'
import Results from '../components/results'

function Home({ apiconfig }) {
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [searchterm, setSearchTerm] = useState('')

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setSearchError(false)
    setHasSearched(true)
    fetch(`api/search?searchterm=${searchterm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK')
        }
        return response.json()
      })
      .then((data) => {
        if (data.results) {
          setResults(data.results)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setSearchError(true)
      })
  }

  return (
    <div>
      <Head>
        <title>The Movie Finder</title>
        <meta name="description" content="The best movie app ever" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-dark flex flex-col min-h-screen">
        <header className="container px-4 md:px-0 bg-white py-4">
          <h1 className="text-lg font-bold">
            The Movie Finder
          </h1>
        </header>
        <main className="bg-light grow">
          <section className="container px-4 md:px-0 py-8 md:py-12">
            <form className="relative" onSubmit={(event) => handleSubmit(event)} role="search">
              <input
                type="search"
                required="required"
                className="w-full py-4 pl-12 shadow-lg rounded transition-shadow focus:shadow-dark"
                placeholder="Search movie, TV shows or actors"
                value={searchterm}
                onChange={handleSearchTermChange}
              />
              <button type="submit" disabled={!apiconfig.images || isLoading} className="absolute left-0 inset-y-0 p-4"><SearchIcon className="block w-5" /></button>
            </form>
          </section>
          {isLoading &&
            <section className="container">
              <div className="motion-safe:animate-pulse text-2xl font-medium text-center">Loading...</div>
            </section>
          }
          {searchError &&
            <section className="container bg-red-100 p-7 mb-4 border border-3 border-solid border-red-900">
              <div className="text-red-900">Something went wrong. Please try again.</div>
            </section>
          }
          {!apiconfig.images &&
            <section className="container bg-red-100 p-7 mb-4 border border-3 border-solid border-red-900">
              <div className="text-red-900">Configuration failed to load. Please try again.</div>
            </section>
          }
          {apiconfig && hasSearched && !isLoading &&
            <Results results={results} baseurl={apiconfig.images.secure_base_url}></Results>
          }
        </main>

        <footer className="bg-dark text-light py-8 text-center">
          The Movie Finder
        </footer>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const apiconfig = await loadConfig()
  return {
    props: { apiconfig }
  }
}

export default Home