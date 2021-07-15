import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const axiosGihubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const GET_ORG = `
  {
    organization(login: "atlassian") {
      name
      url
      repository()
    }
  }
`;

function App() {

  const [path, setPath] = useState<string>('atlassian/escalator');
  const [organisation, setOrganisation] = useState("");
  const [errors, setErrors] = useState([]);

  const fetchData = useCallback(() => {
    axiosGihubGraphQL
      .post('', { query: GET_ORG })
      .then(res => {
        const { data } = res;
        setOrganisation(data.data.organization);
        setErrors(data.errors);
      })
  }, []);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    fetchData();
  }, [fetchData]);

  const handleChange = useCallback(e => {
    setPath(e.target.value);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div className="App">
     <form onSubmit={ handleSubmit }>
       <label htmlFor="url">Show open issues for https://gihub.com/</label>
       <input id="url" type="text" onChange={ handleChange } style={{ width: 300 }} value={path} />
       <input type="submit" value="Submit"/>
     </form>
     <hr/>
     <div>
       <p>Organization: { organisation }</p>
     </div>
    </div>
  );
}

export default App;
