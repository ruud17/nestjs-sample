/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ImportJob } from '../schema/import-job.schema';
import {
  CreateImportJobResponseDto,
  GetImportJobResponseDto,
} from '../dto/import-job-response.dto';
import { ImportType, JobState } from '../../common/enums/state.enum';
import { groupImportJobsByState } from '../helpers/import-job.helper';

@Injectable()
export class ImportJobMapperService {
  entityToDto(importEntity: ImportJob): CreateImportJobResponseDto {
    return {
      bookId: importEntity.bookId,
      url: importEntity.url,
      type: importEntity.type as ImportType,
      state: importEntity.state as JobState,
      created_at: importEntity.created_at,
      updated_at: importEntity.updated_at,
    };
  }

  groupEntitesByStateToDto(jobs: ImportJob[]): GetImportJobResponseDto {
    const mappedData: GetImportJobResponseDto = {
      [JobState.Pending]: [],
      [JobState.Finished]: [],
    };
    if (jobs.length > 0) {
      for (const job of jobs) {
        if (job.state === JobState.Pending || job.state === JobState.Finished) {
          mappedData[job.state].push(groupImportJobsByState(job));
        }
      }
    }
    return mappedData;
  }
}
