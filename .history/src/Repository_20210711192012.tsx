import { RepoData } from "./models/RepoData";

export const Repository = ({ data }: { data: RepoData }) => {
   
    return (
        <div>
            <p>
                <strong>Repository: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
            </p>
        </div>
    );
};