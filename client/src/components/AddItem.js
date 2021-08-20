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

}


return (
<>
<form onSubmit={ postFunc } id="myForm">
<input type='text' name='nomenclature' onInput={ onInputListenerNomenclature }/>
<input type='text' name='common' onInput={ onInputListenerCommon }/>
<input type='text' name='part_number' onInput={ onInputListenerPart }/>
<input type='text' name='nsn' onInput={ onInputListenerNsn }/>
<input type='text' name='accounting' onInput={ onInputListenerAccounting }/>
<input type='text' name='category' onInput={ onInputListeneCategory }/>
<input type='text' name='description' onInput={ onInputListenerDescription }/>
<input type='file' name='file' onChange = {imageFunc} />
<input type='button' name='image' value='Submit' onClick={ postFunc }/>
</form>
</>
);

}

export default AddItem
