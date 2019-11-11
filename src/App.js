// eslint-disable-next-line
import React, { Component, useState, useEffect } from 'react'

const App = () => {
  // state
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)
  // fetch news 
  const fetchNews = () => {
    // set loading to true
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      // eslint-disable-next-line
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line
  }, [url]) // you can control the behaviour of useEffect using the second argument

const handleChange = (e) => {
  setSearchQuery(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault();
  setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
}

// For a single line we can use normal brackets instead of curly braces with return
const showLoading = () => 
  (loading ? <h2>Loading...</h2>: "")


const searchForm = () => (
<form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
)

const showNews = () => {
 return news.map((n, i) => (
    <p key="{i}">{n.title}</p>
  ))
}

  return(
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  )
} 

export default App
