import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: 'light-gray',
        border: '1px solid black'
    }
})

const ItemModal = (props) => {
    const styles = useStyles();

    const handleEdit = (event) => {
        event.preventDefault();
        const formData = {
            id: props.item.id,
            data: event.target
        }

        props.handleEvent(formData)
    }

    return (
        <>
            <Modal
                className={styles.root}
                open={props.openModal}
                aria-labelledby='item modal'
                aria-describedby='here you can edit the modal'>
                <Card>
                    <form onSubmit={handleEdit}>
                        <p>Item {props.item.id}</p>
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
                            <input id="accounting" placeholder={props.item.acounting} />
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
                            <Button color='secondary'>Delete</Button>
                        </div>
                    </form>
                </Card>
            </Modal>
        </>
    );
}

export default ItemModal;