import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const ListPostAdmin = (props) => {
  return (
    <>
      <td  data-label="id">{props.postId}</td>
      <td data-label="Nom">{props.name}</td>
      <td data-label="Prénom">{props.firstname}</td>
      <td data-label="Titre">{props.title}</td>
      <td data-label="Contenu">{props.content}</td>
      <td data-label="Publier">{props.time}</td>
      <td data-label="Action">
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