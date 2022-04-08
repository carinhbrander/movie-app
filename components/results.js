export default function Results({ results, baseurl }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {results.length == 0 &&
        <h2>No results</h2>
      }
      {results.map((result) => (
        <article key={result.id} className="w-full">
          <img alt={result.title || result.name} className="aspect-square object-cover rounded shadow" src={result.poster_path ? `${baseurl}w185${result.poster_path}` : 'https://placekitten.com/185/185'} />
          <h2 className="font-bold">{result.title || result.name}</h2>
        </article>
      ))}
    </section>
  )
}