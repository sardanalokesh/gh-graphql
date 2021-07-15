import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Organization } from './Organization';
import { Repository } from './Repository';
import { OrgData } from './models/Organization';

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
      repository(name: "escalator") {
        name
        url
      }
    }
  }
`;

const GET_ISSUES_FOR_REPO = `
  query ($org: String!, $repo: String!, $cursor: String) {
    organization(login: $org) {
      name
      url
      repository(name: $repo) {
        name
        url
        issues(last: 5, states: [OPEN], after: $cursor) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

const getIssuesOfRepo = (path: string, cursor: string) => {
  const [org, repo] = path.split("/");
  return axiosGihubGraphQL
      .post('', { query:  GET_ISSUES_FOR_REPO, variables: { org, repo, cursor } });
};

function App() {

  const [path, setPath] = useState<string>('atlassian/escalator');
  const [organisation, setOrganisation] = useState<OrgData>();
  const [errors, setErrors] = useState([]);

  const fetchData = useCallback((path: string, cursor: string) => {
    getIssuesOfRepo(path, cursor)
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
    fetchData(path);
  }, [fetchData, path]);

  const handleChange = useCallback(e => {
    setPath(e.target.value);
  }, []);

  const handleFetchMoreIssues = useCallback(
   () => {
      const { endCursor } = organisation!.repository.issues.pageInfo;
      fetchData(path, endCursor);
   }, [fetchData, organisation, path]
  );

  useEffect(() => {
    fetchData(path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
       <Organization data={ organisation } errors={ errors } onFetchMoreIssues={handleFetchMoreIssues} />
     </div>
    </div>
  );
}

export default App;
