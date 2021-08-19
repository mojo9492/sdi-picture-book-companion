import { useEffect, useState } from 'react'


const Search = () => {

const [searchResults, setSearchResults] = useState([])

useEffect(() => {
  fetch(window.location.search)
.then(data => {
  console.log(data)
  setSearchResults(data)
})
}, [])


  return (
    <div>
    I'm Search
    </div>
  );

}

export default Search
