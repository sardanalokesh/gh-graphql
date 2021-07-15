export interface RepoData {
    name: string;
    url: string;
    issues: Graph<IssueNode>;
    id: string;
    viewerHasStarred: boolean;
}

interface Graph<T> {
    edges: Edge<T>[];
    totalCount: number;
    pageInfo: PageInfo;
}

interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
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