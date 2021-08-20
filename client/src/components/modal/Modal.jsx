import React, { useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import { Card, Button } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        alignSelf: 'center',
        background: 'light-gray',
        marginTop: '5%',
        margin: '1%'
    },
    editBanner: {
        color: 'orange'
    },
    img: {
        width: 400,
        height: 400,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    form: {
        marginTop: '5%'
    },
    formInputs: {
        margin: '.334em'
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly'
    },
    deleteButton: {
        alignSelf: 'flex-end'
    }
});

const ItemModal = (props) => {
    const history = useHistory()
    const styles = useStyles();
    const imageInputRef = useRef();

    const handleEdit = (event) => {
        event.preventDefault();

        //if no nsn

        const formData = {
            id: props.item.id,
            data: event.target,
        }

        if (imageInputRef.current.files) {
            formData['files'] = imageInputRef.current.files[0]
            console.log('this is the image', imageInputRef.current.files)
        }
        props.handleEvent(formData)
        history.push('/')

    }

    const handleDelete = () => {
        props.handleDelete(props.item.id)
    }

    return (
        <>
            <Modal
                data-cy='edit-item-modal'
                className={styles.root}
                open={props.openModal}
                onClose={props.closeModal}
                aria-labelledby='item modal'
                aria-describedby='here you can edit the modal'>
                <Card className={styles.card}>
                    <h2 className={styles.editBanner}>Editing item: {props.item.id}</h2>
                    <CardMedia
                        className={styles.img}
                        image={`http://localhost:8080/images/${props.item.id}?${Math.random()}`}
                        title="Item_Image"
                    />
                    <form onSubmit={handleEdit} className={styles.form}>

                        <label className={styles.formInputs}>
                            Image Upload
                            <input className={styles.formInputs} id='image' type='file' name='file' ref={imageInputRef} />
                        </label>
                        <label className={styles.formInputs}>
                            Nomenclature
                            <input className={styles.formInputs} data-cy='edit-nomenclature' id="nomenclature" placeholder={props.item.nomenclature} />
                        </label>
                        <label className={styles.formInputs}>
                            Common
                            <input className={styles.formInputs} id="common" placeholder={props.item.common} />
                        </label>
                        <label className={styles.formInputs}>
                            Part Number
                            <input className={styles.formInputs} id="part_number" placeholder={props.item.part_number} />
                        </label>
                        <label className={styles.formInputs}>
                            NSN
                            <input className={styles.formInputs} id="nsn" placeholder={props.item.nsn} />
                        </label>
                        <label className={styles.formInputs}>
                            Accounting
                            <input className={styles.formInputs} id="accounting" placeholder={props.item.accounting} />
                        </label>
                        <label className={styles.formInputs}>
                            Category
                            <input className={styles.formInputs} id="category" placeholder={props.item.category} />
                        </label>
                        <label className={styles.formInputs}>
                            Description
                            <input className={styles.formInputs} id="description" placeholder={props.item.description} />
                        </label>
                        <div className={styles.controls}>
                            <Button data-cy='edit-submit-button' variant='contained' color='primary' type='submit'>Submit</Button>
                            <Button data-cy='delete-submit-button' className={styles.deleteButton} color='secondary' onClick={handleDelete}>Delete</Button>
                        </div>
                    </form>
                </Card>
            </Modal>
        </>
    );
}

export default ItemModal;