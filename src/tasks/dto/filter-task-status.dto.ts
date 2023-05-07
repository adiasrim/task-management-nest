import { TaskStatus } from '../task.model';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterTaskStatusDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    public status: TaskStatus;
}
