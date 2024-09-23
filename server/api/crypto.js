import axios from 'axios'

export default async (req, res) => {
  const { symbol } = req.query

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' })
  }

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`, {
      params: {
        vs_currency: 'eur',
        days: '7'
      }
    })
    res.status(200).json(response.data)
  } catch (error) {
    console.error(`Error fetching ${symbol} price:`, error)
    const status = error.response?.status || 500
    const message = error.response?.data || { error: error.message }
    res.status(status).json(message)
  }
}