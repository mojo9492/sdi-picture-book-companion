import React from 'react';
import { Button, Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: '1%'
  },
  ul: {
    listStyleType: 'none',
    padding:'.333em'
  },
  li: {
    marginTop: '.333em',
    fontFamily: 'Helena, sans-serif',
    fontSize: '1.5em'
  },
  img: {
    width: 400,
    height: 400,
  },
  editButton: {
    margin: '.334em'
  }
})

const Item = (props) => {
  const styles = useStyles();
  if (props.item) {
    const { id, nomenclature, common, part_number, nsn, accounting, category, description } = props.item

    return (
      <div data-cy='result-item'>
        <Card className={styles.root}>
          <CardMedia
            className={styles.img}
            image={`http://localhost:8080/images/${id}?${Math.random()}`}
            title="Item_Image"
          />
          <ul className={styles.ul}>
            <li className={styles.li} data-cy='result-nomenclature' >{nomenclature}</li>
            <li className={styles.li} data-cy='result-common' >{common}</li>
            <li className={styles.li} >{nsn}</li>
            <li className={styles.li} >{part_number}</li>
            <li className={styles.li} >{accounting}</li>
            <li className={styles.li} >{category}</li>
            <li className={styles.li} >{description}</li>
            <li className={styles.li} ><Button className={styles.editButton} data-cy='edit-button' variant='contained' color='primary' onClick={props.openModal}>Edit</Button></li>
          </ul>
        </Card>
      </div>
    );
  }

}

export default Item
