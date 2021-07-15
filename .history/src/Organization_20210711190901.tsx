import { OrgData } from "./models/Organization";

export const Organization = ({ data, errors }: { data: OrgData, errors: Array<{ message: string }> }) => {
    if(errors) {
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
                <strong> Issues from Organization: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
            </p>
        </div>
    );
};