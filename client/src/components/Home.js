import { useState } from 'react';
import { useHistory }from'react-router-dom';


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
history.push(`/search?type=${ itemSelection }&${ itemSelection }=${userInput}`)
  e.preventDefault()
}



  return (
    <>
      <form onSubmit={ navigateToSearch }>
        <input type='text' placeholder='search by' onInput={ onInputListener }/>
        <select name='item selection' onChange={ selectedItemUpdate }>
            <option value='nomenclature'>nomenclature</option>
            <option value='part number'>part number</option>
            <option value='nsn'>nsn</option>
            <option value='common name'>common name</option>
        </select>
        <input type='button' value='submit' onClick={navigateToSearch}/>
      </form>
    </>
  );

}

export default Home
