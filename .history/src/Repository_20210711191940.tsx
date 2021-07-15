import { RepoData } from "./models/RepoData";

export const Repository = ({ data, errors }: { data: RepoData, errors: Array<{ message: string }> }) => {
    if(errors.length) {
        return (
            <div>
                <strong>Something went wrong!</strong>
                {
                    errors.map(error => <p>{ error.message }</p>)
                }
            </div>
        );
    }

    return (
        <div>
            <p>
                <strong>Repository: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
            </p>
        </div>
    );
};