import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportJobService } from './import-job.service';
import { ImportJobController } from './import-job.controller';
import { ImportJob, ImportSchema } from './schema/import-job.schema';
import { ImportJobMapperService } from './mapper/import-job-mapper.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ImportJob.name, schema: ImportSchema }]),
  ],
  controllers: [ImportJobController],
  providers: [ImportJobService, ImportJobMapperService],
})
export class ImportJobModule {}
