import { useEffect, useState } from 'react'

import temp from './temp'

const Search = () => {

const [searchResults, setSearchResults] = useState({});

useEffect(() => {
  fetch(`http://localhost:8080/search${window.location.search}`)
  .then(res => res.json())
  .then(data => {
  console.log("data: ", data)
  setSearchResults(data)
})
}, [])


  return (
    <div>
      {/* {searchResults.length === 0 ?
      <div>Loading...</div> : <div></div> } */}
    </div>
  );

}

export default Search
