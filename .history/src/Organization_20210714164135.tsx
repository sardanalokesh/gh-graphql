import { OrgData } from "./models/Organization";
import { Repository } from "./Repository";

export const Organization = ({ data, errors, onFetchMoreIssues, onStar  }: { data: OrgData, errors: Array<{ message: string }>, onFetchMoreIssues: () => void, onStar: (id: string, isAlreadyStarred: boolean) => void  }) => {
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

    if (!data) {
        return (
            <div>
                <strong>No Data</strong>
            </div>
        );
    }

    return (
        <div>
            <p>
                <strong> Issues from Organization: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
                <Repository data={ data.repository } onFetchMoreIssues={onFetchMoreIssues} onStar={ onStar } />
            </p>
        </div>
    );
};