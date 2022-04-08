export default function Results({ results }) {
  return (
    <div>
      {results.length == 0 &&
        <h2>No results</h2>
      }
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title || result.name}</li>
        ))}
      </ul>
    </div>
  )
}