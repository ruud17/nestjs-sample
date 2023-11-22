import { ImportType, JobState } from '../../common/enums/state.enum';

export interface CreateImportJobResponseDto {
  bookId: string;
  type: ImportType;
  url: string;
  state: JobState;
  created_at: Date;
  updated_at?: Date;
}

interface GetImportResponse {
  bookId: string;
  type: ImportType;
  url: string;
  created_at: Date;
  updated_at?: Date;
}

export interface GetImportJobResponseDto {
  [JobState.Pending]: GetImportResponse[];
  [JobState.Finished]: GetImportResponse[];
}
