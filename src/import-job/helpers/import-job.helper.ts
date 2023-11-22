import { ImportJob } from '../../import-job/schema/import-job.schema';
import { ImportType } from '../../common/enums/state.enum';

export const groupImportJobsByState = (job: ImportJob) => ({
  bookId: job.bookId,
  type: job.type as ImportType,
  url: job.url,
  created_at: job.created_at,
  updated_at: job.updated_at,
});
