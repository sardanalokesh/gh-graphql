import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Organization } from './Organization';
import { Repository } from './Repository';

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
    }
  }
`;

const GET_REPO = `
  {
    organization(login: "atlassian") {
      name
      url
      repository(name: "escalator) {
        name 
        url
      }
    }
  }
`;

function App() {

  const [path, setPath] = useState<string>('atlassian/escalator');
  const [organisation, setOrganisation] = useState<any>(null);
  const [errors, setErrors] = useState([]);

  const fetchData = useCallback(() => {
    axiosGihubGraphQL
      .post('', { query: GET_REPO })
      .then(res => {
        const { data: _data, errors: _errors  } = res.data;
        if (_data) {
          setOrganisation(_data.organization);
        }
        if(_errors) {
          setErrors(_errors);
        }
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
       {/* <Organization data={ organisation } errors={ errors } /> */}
       <Repository data={ organisation?.repository } errors={ errors } /> 
     </div>
    </div>
  );
}

export default App;
