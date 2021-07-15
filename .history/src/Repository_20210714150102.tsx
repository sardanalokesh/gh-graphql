import { RepoData } from "./models/RepoData";

export const Repository = ({ data, onFetchMoreIssues }: { data: RepoData, onFetchMoreIssues: () => void }) => {
   
    return (
        <div>
            <p>
                <strong>Repository: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
            </p>
            <ul>
                {
                    data.issues.edges.map(edge => (
                        <li key={edge.node.id}>
                            <a href={edge.node.url}>{ edge.node.title }</a>
                            <span>[{ edge.node.reactions.edges.length } likes]</span>
                        </li>
                    ))
                }
            </ul>
            <div style={{ marginBottom: 10}}>Total issues: { data.issues.totalCount }</div>
            <button onClick={onFetchMoreIssues}>More</button>
        </div>
    );
};