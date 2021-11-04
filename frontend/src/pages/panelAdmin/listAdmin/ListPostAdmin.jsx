import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const ListPostAdmin = (props) => {
  return (
    <>
      <td>{props.postId}</td>
      <td>{props.name}</td>
      <td>{props.firstname}</td>
      <td>{props.title}</td>
      <td>{props.content}</td>
      <td>{props.time}</td>
      <td>
        <ButtonGroup size="sm">
          <Button variant="warning">
            <i className="fas fa-edit" title="modifier"></i>
          </Button>
          <Button variant="danger">
            <i className="fas fa-trash-alt" title="supprimer"></i>
          </Button>
        </ButtonGroup>
      </td>
    </>
  );
};

export default ListPostAdmin;