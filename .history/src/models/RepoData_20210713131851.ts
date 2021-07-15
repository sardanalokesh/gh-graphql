export interface RepoData {
    name: string;
    url: string;
    issues: Graph<IssueNode>;
}

interface Graph<T> {
    edges: Edge<T>[];
}

interface Edge<T> {
    node: T;
}

interface IssueNode {
    id: string;
    title: string;
    url: string;
    reactions: Graph<ReactionNode>;
}

interface ReactionNode {
    id: string;
    content: string;
}