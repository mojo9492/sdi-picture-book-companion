import { useEffect, useState } from 'react'
import ItemModal from './modal/Modal';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [bannerMsg, setBanner] = useState('')

  useEffect(() => {

    const helper = async () => {
      try {
        const response = await fetch(`http://localhost:8080/search${window.location.search}`)
        const data = await response.json();

        setSearchResults(data.item);
      } catch (err) {
        if (err.status === 404) {
          return <p>404</p>
        }
        if (err.status === 500) {
          return <p>500</p>
        }
      }
    }
    helper();
  }, [setSearchResults])

  if (!searchResults) {
    return (
      <p>404 data</p>
    )
  }

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
    const imageToUpdate = formData.files
    imageFormData.append('image', imageToUpdate, imageToUpdate.name)

    const response = await fetch(`http://localhost:8080/update/item/${formData.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: itemToUpdate
    })

    const data = await response.json();

    const imageResponse = await fetch(`http://localhost:8080/update/image/${formData.id}`, {
      method: 'POST',
      body: imageFormData
    })

    const imageUpdateRet = await imageResponse.json();


    console.log('response is', data)
    console.log('image response is', imageUpdateRet)
    setBanner(data.msg)
    setTimeout(() => {
      setIsOpen(!isOpen)
    }, 700);
  }

  const handleDelete = async (itemId) => {

    const response = await fetch(`http://localhost:8080/delete/${itemId}`, {
      method: 'DELETE'
    })

    const data = await response.json();

    setBanner(data.message)
    console.log(data)
  }

  return (
    <div>
      {!searchResults ? <div>loading... </div> :
        <div>
          <p>{bannerMsg}</p>
          <ul>
            {searchResults.map((result, index) => {
              return (
                <li key={result.nsn + index}>
                  <ItemModal openModal={isOpen} item={result} handleEvent={handleEvent} handleDelete={handleDelete}></ItemModal>
                  <button onClick={handleOpen}>{result.nomenclature}</button>
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
