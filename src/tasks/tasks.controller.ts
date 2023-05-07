import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterTaskStatusDto } from './dto/filter-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    public index(@Query() filterTaskStatus: FilterTaskStatusDto): Task[] {
        return this.taskService.getAllTasks(filterTaskStatus);
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
        @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ): Task {
        const { status } = updateTaskStatusDto;

        return this.taskService.updateTaskStatusById(id, status);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): void {
        return this.taskService.deleteTaskById(id);
    }
}
