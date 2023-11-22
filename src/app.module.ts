import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportJobModule } from './import-job/import-job.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), ImportJobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
