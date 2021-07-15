export interface RepoData {
    name: string;
    url: string;
    issues: IssueData;
}

export interface IssueData {
    edges: Edge[];
}

interface Edge {
    node: Node;
}

interface Node {
    id: string;
    title: string;
    url: string;
}