import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    public index(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    public show(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    public store(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.storeTask(createTaskDto);
    }

    @Patch('/:id/status')
    public updateStatusById(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.taskService.updateTaskStatusById(id, status)
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): void {
        return this.taskService.deleteTaskById(id);
    }
}
