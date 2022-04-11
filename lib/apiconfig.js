export async function loadConfig() {
  const res = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)
  const data = await res.json()

  return data
}