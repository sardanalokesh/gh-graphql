import { RepoData } from "./models/RepoData";

export const Repository = ({ data, onFetchMoreIssues, onStar }: { data: RepoData, onFetchMoreIssues: () => void, onStar: (id: string, isAlreadyStarred: boolean) => void; }) => {

    if (!data) {
        return (
            <div>
                No such repository
            </div>
        );
    }
   
    return (
        <div>
            <p>
                <strong>Repository: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
            </p>
            <button type="button" onClick={ () => onStar(data.id, data.viewerHasStarred) }>{ data.viewerHasStarred ? 'Unstar' : 'Star' }</button>
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
            <button onClick={onFetchMoreIssues} disabled={ !data.issues.pageInfo.hasNextPage }>More</button>
        </div>
    );
};