interface Repo {
    name: string;
    url: number;
    description: string;
    stargazerCount: number;
    primaryLanguage: {
        color: string;
        name: string;
    };
}

interface User {
    avatarUrl: string;
    name: string;
    url: string;
    bio: string;
}
interface Github {
    repos: Array<Repo>;
    members: Array<User>;
}

export type { Github };
