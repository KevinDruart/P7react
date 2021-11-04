import React from 'react';
import Button from 'react-bootstrap/Button';

const ListUserAdmin = (props) => {
  return (
    <>
      <td>{props.userId}</td>
      <td>{props.name}</td>
      <td>{props.firstname}</td>
      <td>{props.email}</td>
      <td>{props.time}</td>
      <td>{props.roles}</td>
      <td>
        <Button variant="danger">
          <i className="fas fa-trash-alt" title="supprimer"></i>
        </Button>
      </td>
    </>
  );
};

export default ListUserAdmin;