import { useEffect, useState } from 'react'
import ItemModal from './modal/Modal';
import { Redirect, useHistory } from 'react-router-dom'
import Item from './Item';


const Search = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [bannerMsg, setBanner] = useState('')

  useEffect(() => {
    console.log('modal state', isOpen);
    const helper = async () => {
      // try {
      const response = await fetch(`http://localhost:8080/search${window.location.search}`)
      const data = await response.json();




      if (response.status === 404 || response.status === 500 || response.status === 400) {
        return setBanner(data.message)

      }
      setSearchResults(data.item);
      // } catch (err) {
      // console.log(err.status)
      // if (err.status === 404) {
      //   console.log('no data bois')
      //   return <p>404</p>

      // }
      // if (err.status === 500) {
      //   return <p>500</p>
      // }
      // }
    }
    helper();
  }, [setSearchResults, isOpen])



  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleEvent = async (formData) => {

    let item = {};

    Object.values(formData.data).forEach(element => {
      if (element.localName === "input") {
        if (element.value) {
          //data['labeltext'] = item.value
          item[element.id] = element.value;
        } else {
          if (element.placeholder) {
            item[element.id] = element.placeholder;
          } else {
            item[element.id] = "";
          }
        }
      }

    });

    const itemToUpdate = JSON.stringify(item)
    const imageFormData = new FormData()

    try {


      const response = await fetch(`http://localhost:8080/update/item/${formData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: itemToUpdate
      })

      const data = await response.json();

      if (formData.files) {
        const imageToUpdate = formData.files
        imageFormData.append('image', imageToUpdate, imageToUpdate.name)
        const imageResponse = await fetch(`http://localhost:8080/update/image/${formData.id}`, {
          method: 'POST',
          body: imageFormData
        })
        const imageUpdateRet = await imageResponse.json();
        console.log('image response is', imageUpdateRet)
        return <Redirect to='/' />
      }

      console.log('response is', data)
      setIsOpen(false)
      return <Redirect push to={`http://localhost:8080/search?type=nsn&nsn=${item.nsn}`} />
    } catch (err) {
      setBanner('Something went wrong.')
      return <Redirect to='/' />
    }
  }

  const handleDelete = async (itemId) => {
    const response = await fetch(`http://localhost:8080/delete/${itemId}`, {
      method: 'DELETE'
    })

    const data = await response.json();

    setBanner(data.message)
    console.log(data)
  }

  const historyCheck = () => {
    setTimeout(() => {

    }, 1500)
  }

  return (
    <div data-cy='search-results' >
      {!searchResults ?
        <div>
          loading..
          {historyCheck()}
        </div> :
        <div className='search-container'>
          <h3>{bannerMsg}</h3>
          <ul>
            {searchResults.map((result, index) => {
              return (
                <li key={result.nsn + index}>
                  <ItemModal openModal={isOpen} closeModal={() => setIsOpen(false)} item={result} handleEvent={handleEvent} handleDelete={handleDelete} ></ItemModal>
                  <Item item={result} openModal={handleOpen}/>
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div >
  );

}

export default Search
