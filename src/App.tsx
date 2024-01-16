import { Amplify } from 'aws-amplify';

import './App.css'
import React from 'react';
import useAppData from "./hooks";

function App({ isPassedToWithAuthenticator, signOut, connectedUser }: any) {
  const { users, handleDeleteUser, handleCreateUser, handleSaveUser, handleEditUser, editingUser, newUser, setNewUser, handleEditUserChange } = useAppData();

  return (
              <div>
                  <button onClick={signOut}>Sign out</button>
                  <h1 className="title">Liste des Utilisateurs</h1>
                  <table>
                      <thead>
                      <tr>
                          <th>Pseudo</th>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Âge</th>
                          <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {users.map((user, index) => (
                          <tr key={index}>
                              {editingUser === user.id ? (
                                  <React.Fragment>
                                      <td>
                                          <input
                                              type="text"
                                              value={user.username}
                                              onChange={(e) => handleEditUserChange(user.id, 'username', e.target.value)}
                                          />
                                      </td>
                                      <td>
                                          <input
                                              type="text"
                                              value={user.lastname}
                                              onChange={(e) => handleEditUserChange(user.id, 'lastname', e.target.value)}
                                          />
                                      </td>
                                      <td>
                                          <input
                                              type="text"
                                              value={user.firstname}
                                              onChange={(e) => handleEditUserChange(user.id, 'firstname', e.target.value)}
                                          />
                                      </td>
                                      <td>
                                          <input
                                              type="text"
                                              value={user.age}
                                              onChange={(e) => handleEditUserChange(user.id, 'age', e.target.value)}
                                          />
                                      </td>
                                      <td>
                                          <button onClick={() => handleSaveUser(user.id)}>Enregistrer</button>
                                      </td>
                                  </React.Fragment>
                              ) : (
                                  <React.Fragment>
                                      <td>{user.username}</td>
                                      <td>{user.lastname}</td>
                                      <td>{user.firstname}</td>
                                      <td>{user.age}</td>
                                      <td>
                                          <button className="button" onClick={() => handleEditUser(user.id)}>Modifier</button>
                                          <button className="button" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                                      </td>
                                  </React.Fragment>
                              )}
                          </tr>
                      ))}
                      </tbody>
                  </table>
                  <h2>Créer un nouvel utilisateur</h2>
                  <div className="create-input">
                      <label>Pseudo : </label>
                      <input className="input"
                          type="text"
                          value={newUser.username}
                          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      />
                  </div>
                  <div className="create-input">
                      <label>Nom : </label>
                      <input className="input"
                          type="text"
                          value={newUser.lastname}
                          onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
                      />
                  </div>
                  <div className="create-input">
                      <label>Prénom : </label>
                      <input className="input"
                          type="text"
                          value={newUser.firstname}
                          onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
                      />
                  </div>
                  <div className="create-input">
                      <label>Âge : </label>
                      <input className="input"
                          type="text"
                          value={newUser.age}
                          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                      />
                  </div>
                  <button className="button" onClick={handleCreateUser}>Créer un utilisateur</button>
              </div>
  );
}

export default App;

export async function getStaticProps() {
    return {
        props: {
            isPassedToWithAuthenticator: true,
        },
    };
}
