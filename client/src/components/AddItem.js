
import { useState } from 'react';
import { useHistory }from'react-router-dom';

const AddItem = () => {

  const [category, setCategory] = useState(" ");
  const [common, setCommon] = useState(" ");
  const [nomenclature, setNomenclature] = useState(" ");
  const [nsn, setNsn] = useState(" ");
  const [part, setPart] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [accounting, setAccounting] = useState(" ");


  const [selectedFile, setSelectedFile] = useState()

  const onInputListeneCategory = (e) => {
    setCategory(e.target.value)
  }
  const onInputListenerCommon = (e) => {
    setCommon(e.target.value)
  }
  const onInputListenerNomenclature = (e) => {
    setNomenclature(e.target.value)
  }
  const onInputListenerNsn = (e) => {
    setNsn(e.target.value)
  }
  const onInputListenerPart = (e) => {
    setPart(e.target.value)
  }
  const onInputListenerDescription = (e) => {
    setDescription(e.target.value)
  }
  const onInputListenerAccounting = (e) => {
    setAccounting(e.target.value)
  }
  let imageFunc = (e) => {
    setSelectedFile(e.target.files[0])

  }

  const postFunc = (e) => {
    const formData = new FormData();



  let data ={
    "nomenclature": nomenclature,
    "common": common,
    "part_number": part,
    "nsn": nsn,
    "accounting": accounting,
    "category": category,
    "description": description
}

formData.append('File',selectedFile)
formData.append('item', data)

fetch('http://localhost:8080/add', {
  method:'POST',
  body: formData,
})
  .then(res => console.log(res))
  .then(input => console.log(selectedFile))
  e.preventDefault()

    }



  return (
    <>
    <form onSubmit={ postFunc }>
      <input type='text' placeholder='Category' onInput={ onInputListeneCategory }/>
      <input type='text' placeholder='Common Name' onInput={ onInputListenerCommon }/>
      <input type='text' placeholder='Nomenclature' onInput={ onInputListenerNomenclature }/>
      <input type='text' placeholder='NSN' onInput={ onInputListenerNsn }/>
      <input type='text' placeholder='Accounting' onInput={ onInputListenerAccounting }/>
      <input type='text' placeholder='Part Number' onInput={ onInputListenerPart }/>
      <input type='text' placeholder='Description' onInput={ onInputListenerDescription }/>
      <input type='file' name='file' onChange = {imageFunc} />
      <input type='button' value='Submit' onClick={ postFunc }/>
    </form>
  </>
);

}

export default AddItem
