import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImportJobRequestDTO } from './dto/import-job-request.dto';
import { JobState } from '../common/enums/state.enum';
import { ImportJob } from './schema/import-job.schema';
import {
  GetImportJobResponseDto,
  CreateImportJobResponseDto,
} from './dto/import-job-response.dto';
import { ImportJobMapperService } from './mapper/import-job-mapper.service';

@Injectable()
export class ImportJobService {
  constructor(
    @InjectModel(ImportJob.name) private importModel: Model<ImportJob>,
    private readonly importMapper: ImportJobMapperService,
  ) {}

  async create(
    body: CreateImportJobRequestDTO,
  ): Promise<CreateImportJobResponseDto> {
    const createdJob = new this.importModel(body);
    const savedJob = await createdJob.save();

    const completionTime = this.getCompletionTime();
    setTimeout(async () => {
      savedJob.state = JobState.Finished;
      savedJob.updated_at = new Date();
      await savedJob.save();
    }, completionTime);

    return this.importMapper.entityToDto(savedJob);
  }

  async findAll(): Promise<GetImportJobResponseDto> {
    const allJobs = await this.importModel.find().exec();

    return this.importMapper.groupEntitesByStateToDto(allJobs);
  }

  private getCompletionTime(): number {
    return 60 * 1000;
  }
}
