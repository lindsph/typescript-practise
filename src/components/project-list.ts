import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import { ComponentBase } from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

export class ProjectList
    extends ComponentBase<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        // calls the constructor of the base class
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    // fires when you enter a draggable area with an item attached to mouse
    dragOverHandler(event: DragEvent) {
        // is the data attached to the drag event of this format?
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            // the default for JS drag and drop events is to NOT allow dropping, have to prevent default in dragOverHandler to tell JS you want to allow a drop (will allow the dropHandler to fire)
            event.preventDefault();
            const listElement = this.element.querySelector('ul')! as HTMLUListElement;
            listElement.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            prjId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listElement = this.element.querySelector('ul')! as HTMLUListElement;
        listElement.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects: Project[]) => {
            // filter would return true or false and if false would drop the item, and if true would add the item to the new list - relevantProjects
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                } else {
                    return project.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;

        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} Projects`;
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listElement.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }

    }


}