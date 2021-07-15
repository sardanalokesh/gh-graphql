import { RepoData } from "./RepoData";

export interface OrgData {
    name: string;
    url: string;
    repository: RepoData;
}