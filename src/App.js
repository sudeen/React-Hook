// eslint-disable-next-line
import React, { Component, useState, useEffect } from 'react'

const App = () => {
  // state
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('react')
  // fetch news 
  const fetchNews = () => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then(result => result.json())
      .then(data => setNews(data.hits))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchNews()
  }, [searchQuery]) // you can control the behaviour of useEffect using the second argument

const handleChange = (e) => {
  setSearchQuery(e.target.value)
}

  return(
    <div>
      <h2>News</h2>
      <form>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
      {news.map((n, i) => (
        <p key="{i}">{n.title}</p>
      ))}
    </div>
  )
} 

export default App
