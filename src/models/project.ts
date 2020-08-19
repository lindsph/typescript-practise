
export enum ProjectStatus { Active, Finished }

// don't want to use an interface here because we want to instantiate it
export class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {

    }
}