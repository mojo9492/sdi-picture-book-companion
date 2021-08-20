import React, { useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import { Card, Button } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: 'light-gray',
    },
    img: {
        width: 400,
        height: 400,
    }
})

const ItemModal = (props) => {
    const styles = useStyles();
    const imageInputRef = useRef();

    const handleEdit = (event) => {
        event.preventDefault();
        if (imageInputRef.current.files) {
            console.log('this is the image', imageInputRef.current.files)
        }
        const formData = {
            id: props.item.id,
            data: event.target,
            files: imageInputRef.current.files[0]
        }

        props.handleEvent(formData)
    }

    const handleDelete = () => {

        props.handleDelete(props.item.id)
    }

    return (
        <>
            <Modal
                className={styles.root}
                open={props.openModal}
                aria-labelledby='item modal'
                aria-describedby='here you can edit the modal'>
                <Card>
                    <CardMedia
                        className={styles.img}
                        image={`http://localhost:8080/images/${props.item.id}`}
                        title="Item_Image"
                    />
                    <form onSubmit={handleEdit}>
                        <p>Item {props.item.id}</p>
                        <label>
                            Image Upload
                            <input id='image' type='file' name='file' ref={imageInputRef} />
                        </label>
                        <label>
                            Nomenclature
                            <input id="nomenclature" placeholder={props.item.nomenclature} />
                        </label>
                        <label>
                            Common
                            <input id="common" placeholder={props.item.common} />
                        </label>
                        <label>
                            Part Number
                            <input id="part_number" placeholder={props.item.part_number} />
                        </label>
                        <label>
                            NSN
                            <input id="nsn" placeholder={props.item.nsn} />
                        </label>
                        <label>
                            Accounting
                            <input id="accounting" placeholder={props.item.accounting} />
                        </label>
                        <label>
                            Category
                            <input id="category" placeholder={props.item.category} />
                        </label>
                        <label>
                            Description
                            <input id="description" placeholder={props.item.description} />
                        </label>
                        <div>
                            <Button variant='contained' color='primary' type='submit'>Submit</Button>
                            <Button color='secondary' onClick={handleDelete}>Delete</Button>
                        </div>
                    </form>
                </Card>
            </Modal>
        </>
    );
}

export default ItemModal;