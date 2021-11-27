import React from 'react';
import { useHistory } from "react-router";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const ListUserAdmin = (props) => {
  const token = localStorage.getItem('authToken');
  const userId = props.userId;
  const history = useHistory();

  //click supprimer
  const handleClickDelete = (e) => {
    e.preventDefault();
    axios.delete("http://localhost:3000/api/auth/" + userId, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        history.push("/admin");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Utilisateur supprimé',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Une erreur s'est produite",
          footer: 'Essayer a nouveau, si cela persiste <a href="">contacter nous</a>'
        })
      });
  }
  return (
    <>
      <td data-label="id">{props.userId}</td>
      <td data-label="Nom">{props.name}</td>
      <td data-label="Prénom">{props.firstname}</td>
      <td data-label="email">{props.email}</td>
      <td data-label="inscrit">{props.time}</td>
      <td data-label="rôle">{props.roles}</td>
      <td data-label="Action">
        <Button variant="danger" onClick={handleClickDelete} title="supprimer">
          <i className="fas fa-trash-alt"> </i>
        </Button>
      </td>
    </>
  );
};
 
export default ListUserAdmin;