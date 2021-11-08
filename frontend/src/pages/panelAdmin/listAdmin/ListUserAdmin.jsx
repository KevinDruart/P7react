import React from 'react';
import { useHistory } from "react-router";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ListUserAdmin = (props) => {
  const token = localStorage.getItem('authToken');
  const userId = props.userId;
  const history = useHistory();

  //click supprimer
  const handleClickDelete = (e) => {
    e.preventDefault();
    console.log("utilisateur supprimer");
    console.log(userId);
    axios.delete("http://localhost:3000/api/auth/" + userId, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {

        alert("l'utilisateur a bien etait supprimer");
        history.push("/admin");

      })
      .catch((error) => {
        console.log('erreur suppresion post');
      });
  }
  return (
    <>
      <td>{props.userId}</td>
      <td>{props.name}</td>
      <td>{props.firstname}</td>
      <td>{props.email}</td>
      <td>{props.time}</td>
      <td>{props.roles}</td>
      <td>
        <Button variant="danger" onClick={handleClickDelete} title="supprimer">
          <i className="fas fa-trash-alt"> </i>
        </Button>
      </td>
    </>
  );
};

export default ListUserAdmin;