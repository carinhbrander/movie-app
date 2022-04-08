import { useState } from 'react'
import Head from 'next/head'
import { loadConfig } from '../lib/apiconfig'
import Results from '../components/results'

function Home({apiconfig}) {
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
            <input type="search" className="w-full p-4 shadow-lg rounded transition-shadow focus:shadow-dark" placeholder="Search movie, TV shows or actors" value={searchterm} onChange={handleSearchTermChange} />
          </form>

          <Results results={results} baseurl={apiconfig.images.secure_base_url}></Results>
        </section>
      </main>

      <footer className="bg-dark text-light py-8 text-center">
        <a href="https://carinh.se/">The Movie Finder</a>
      </footer>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const apiconfig = await loadConfig();
  return {
    props: {apiconfig}
  }
}

export default Home