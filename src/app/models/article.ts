export class Article {

    id: string;
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link: string, votes?: number) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.link = link;
        this.votes = votes ?? 0;
    }

    addVote() {
        this.votes++;
    }

    removeVote() {
        this.votes--;
    }

    domain() {
        // https://angular.dev/tutorial/tour-of-heroes -> angular.dev

        // https://angular.dev/tutorial/tour-of-heroes -> angular.dev/tutorial/tour-of-heroes
        // angular.dev/tutorial/tour-of-heroes -> angular.dev

        try {
            const domainAndPath = this.link.split('//')[1];
            const domain = domainAndPath.split('/')[0];

            return domain;
        } catch {
            return null;
        }
    }
}