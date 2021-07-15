import { OrgData } from "./models/Organization";

export const Organization = ({ data }: { data: OrgData }) => {
    return (
        <div>
            <p>
                <strong> Issues from Organization: </strong>
                <a href={ data?.url ?? "" }>{ data?.name ?? "" }</a>
            </p>
        </div>
    );
};