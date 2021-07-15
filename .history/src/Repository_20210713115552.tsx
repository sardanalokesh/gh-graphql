import { RepoData } from "./models/RepoData";

export const Repository = ({ data }: { data: RepoData }) => {
   
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
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};