export default function handler(req, res) {
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${req.query.searchterm}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK')
      }
      return response.json()
    })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({ error: 'failed to load data' })
    })
}