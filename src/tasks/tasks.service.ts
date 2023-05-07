import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskStatusDto } from './dto/filter-task-status.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(filterTaskStatus: FilterTaskStatusDto): Task[] {
        const tasks = this.tasks;

        if (filterTaskStatus.status) {
            return tasks.filter(task => task.status === filterTaskStatus.status);
        }

        return tasks;
    }

    public getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return task;
    }

    public storeTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    public updateTaskStatusById(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);

        task.status = status;

        return task;
    }

    public deleteTaskById(id: string): void {
        const found = this.getTaskById(id);

        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }
}
