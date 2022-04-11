import { useState } from 'react'
import Head from 'next/head'
import { loadConfig } from '../lib/apiconfig'
import Results from '../components/results'

function Home({ apiconfig }) {
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-dark flex flex-col min-h-screen">
        <header className="container px-4 md:px-0 bg-white py-4">
          <h1 className="text-lg font-bold">
            The Movie Finder
          </h1>
        </header>
        <main className="bg-light grow">
          <section className="container px-4 md:px-0 ">
            <form className="py-8 md:py-12" onSubmit={(event) => handleSubmit(event)} role="search">
              <input type="search" className="w-full p-4 shadow-lg rounded transition-shadow focus:shadow-dark" placeholder="Search movie, TV shows or actors" value={searchterm} onChange={handleSearchTermChange} />
            </form>
          </section>
          {apiconfig &&
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