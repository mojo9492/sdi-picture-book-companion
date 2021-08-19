import { useEffect, useState } from 'react'
import ItemModal from './modal/Modal';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {

    const helper = async () => {
      const response = await fetch(`http://localhost:8080/search${window.location.search}`)
      const data = await response.json();

      setSearchResults(data.item);
    }
    helper();
  }, [setSearchResults])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleEvent = async (formData) => {
    let item = {};
    
    Object.values(formData.data).forEach(element => {
      if (element.localName === "input") {
        console.log(element);
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
    console.log('result', item);
    const itemToUpdate = JSON.stringify(item)

    const response = await fetch(`http://localhost:8080/update/item/${formData.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: itemToUpdate
    })

    const data = await response.json();
    console.log('response is',  data)
  }

  return (
    <div>
      {!searchResults ? <div>loading... </div> :
        <div>
          <ul>

            {searchResults.map((result, index) => {
              return (
                <li key={result.nsn + index}>
                  <ItemModal openModal={isOpen} item={result} handleEvent={handleEvent}></ItemModal>
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
