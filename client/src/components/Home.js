import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css'


const Home = () => {

  const [userInput, setUserInput] = useState(" ");
  const [itemSelection, setItemSelection] = useState("nomenclature")


  const onInputListener = (e) => {
    setUserInput(e.target.value)
  }

  const selectedItemUpdate = (e) => {
    setItemSelection(e.target.value)
  }

  //search?type=nsn&nsn=24382374824
  let history = useHistory()
  const navigateToSearch = (e) => {
    history.push(`/search?type=${itemSelection}&${itemSelection}=${userInput}`)
    e.preventDefault()
  }
  const navigateToAdd = (e) => {
    history.push(`/add`)
    e.preventDefault()
  }


  return (
    <div className='home-container'>
      <form onSubmit={navigateToSearch}>
        <input data-cy='search-input' type='text' placeholder='search by' onInput={onInputListener} />
        <select data-cy='dropdown-menu' name='item selection' onChange={selectedItemUpdate}>
          <option value='nomenclature'>nomenclature</option>
          <option value='part number'>part number</option>
          <option value='nsn'>nsn</option>
          <option value='common name'>common name</option>
        </select>
        <Button variant='contained' color='primary' data-cy='submit-button' type='button' value='submit' onClick={navigateToSearch}>Submit</Button>
      </form>
      <div>
      </div>
      <p>Can't find an item? Add it!</p>
      <Button variant='contained' onClick={navigateToAdd} color='default' data-cy='add-button'>Add an item!</Button>
    </div>
  );

}

export default Home
