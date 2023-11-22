import { Controller, Get, Post, Body } from '@nestjs/common';
import { ImportJobService } from './import-job.service';
import { CreateImportJobRequestDTO } from './dto/import-job-request.dto';

@Controller('import')
export class ImportJobController {
  constructor(private readonly importService: ImportJobService) {}

  @Post()
  create(@Body() body: CreateImportJobRequestDTO) {
    return this.importService.create(body);
  }

  @Get()
  findAll() {
    return this.importService.findAll();
  }
}
