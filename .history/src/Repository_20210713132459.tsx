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
                            <ul>
                               {
                                   edge.node.reactions.edges.map(re => (
                                       <li key={re.node.id}>{ re.node.content }</li>
                                   ))
                               }
                            </ul>
                        </li>
                    ))
                }
            </ul>
            <button onClick={onFetchMoreIssues}>More</button>
        </div>
    );
};