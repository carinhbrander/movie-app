export default function handler(req, res) {
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${req.query.searchterm}`)
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data)
    }) 
}