import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportJobModule } from './import-job/import-job.module';
import { ExportJobModule } from './export-job/export-job.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ImportJobModule,
    ExportJobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
