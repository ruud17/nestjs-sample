import { Test, TestingModule } from '@nestjs/testing';
import { ImportJobController } from '../import-job.controller';
import { ImportJobService } from '../import-job.service';
import { CreateImportJobRequestDTO } from '../dto/import-job-request.dto';

describe('ImportJobController', () => {
  let controller: ImportJobController;
  let service: ImportJobService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportJobController],
      providers: [
        {
          provide: ImportJobService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ImportJobController>(ImportJobController);
    service = module.get<ImportJobService>(ImportJobService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new import job and return the result', async () => {
      const importJobDto: CreateImportJobRequestDTO = {
        bookId: '888',
        type: 'word',
        url: 'http://book.com',
      };
      const result = {
        bookId: '888',
        url: 'http://book.com',
        type: 'word',
        state: 'pending',
        created_at: '2023-10-20T20:28:37.643Z',
      };

      // Explicitly type the mock
      (service.create as jest.Mock).mockResolvedValue(result);

      const createdJob = await controller.create(importJobDto);

      expect(createdJob).toBe(result);
      expect(service.create).toHaveBeenCalledWith(importJobDto);
    });
  });

  describe('findAll', () => {
    it('should retrieve all import jobs', async () => {
      const result = [
        {
          pending: [
            {
              bookId: '888',
              type: 'word',
              url: 'http://book.com',
              created_at: '2023-10-20T20:28:37.643Z',
            },
          ],
          finished: [
            {
              bookId: '3333',
              type: 'evernote',
              url: 'http://book.com',
              created_at: '2023-10-20T19:14:45.438Z',
              updated_at: '2023-10-20T19:15:45.423Z',
            },
          ],
        },
      ];

      // Explicitly type the mock
      (service.findAll as jest.Mock).mockResolvedValue(result);

      const jobs = await controller.findAll();

      expect(jobs).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
