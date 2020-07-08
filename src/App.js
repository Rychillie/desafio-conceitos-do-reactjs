import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    try {

      const response = await api.post('repositories', {
        url: "https://github.com/Rychillie/desafio-conceitos-do-reactjs",
        title: "GoStack ReactJS",
        techs: ["JavaScript", "ReactJS"]
      });

      setRepositories([...repositories, response.data]);
    } catch(err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {

    try {

      await api.delete(`repositories/${id}`);
      const newRepositories = repositories;
      const repositoryIndex = newRepositories.findIndex(repository => repository.id === id);

      if(repositoryIndex !== -1) {
        newRepositories.splice(repositoryIndex, 1);
        setRepositories([...newRepositories]);
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
