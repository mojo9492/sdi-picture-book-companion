import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
let history = useHistory()

const postFunc = (e) => {
e.preventDefault();

const fd = new FormData(document.getElementById("myForm"));

let url = 'http://localhost:8080/add';
let req = new Request(url, {
body: fd,
method: 'POST',
});

fetch(req)
.then(res => res.json())
.then(data => {
console.log('response from serer');
console.log(data);
})
.catch(console.warn);

history.push('/')

}


return (
<>
<form onSubmit={ postFunc } id="myForm">
<input data-cy="nomenclature-add" type='text' placeholder='Nomenclature' name='nomenclature' onInput={ onInputListenerNomenclature }/>
<input data-cy="common-add" type='text' placeholder='Common Name' name='common' onInput={ onInputListenerCommon }/>
<input data-cy="partnumber-add" type='text' placeholder='Part Number' name='part_number' onInput={ onInputListenerPart }/>
<input data-cy="NSN-add" type='text' placeholder='NSN' name='nsn' onInput={ onInputListenerNsn }/>
<input data-cy="accounting-add" type='text' placeholder='Accounting' name='accounting' onInput={ onInputListenerAccounting }/>
<input data-cy="category-add" type='text' placeholder='Category' name='category' onInput={ onInputListeneCategory }/>
<input data-cy="description-add" type='text' placeholder='Description' name='description' onInput={ onInputListenerDescription }/>
<input type='file' name='file' onChange = {imageFunc} />
<input data-cy="submit-add" type='button' name='image' value='Submit' onClick={ postFunc }/>
</form>
</>
);

}

export default AddItem
