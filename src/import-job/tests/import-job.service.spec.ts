import { Test, TestingModule } from '@nestjs/testing';
import { ImportJobService } from '../import-job.service';
import { ImportJobMapperService } from '../mapper/import-job-mapper.service';

describe('ImportJobService', () => {
  let service: ImportJobService;
  let mockMapper;
  let mockDocument;
  let mockModel;

  beforeEach(async () => {
    mockDocument = {
      save: jest.fn(),
    };

    mockModel = jest.fn().mockReturnValue(mockDocument); // this will make it act like a constructor
    mockModel.save = jest.fn();
    mockModel.find = jest.fn().mockReturnThis();
    mockModel.exec = jest.fn();

    mockMapper = {
      entityToDto: jest.fn(),
      groupEntitesByStateToDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportJobService,
        {
          provide: 'ImportJobModel',
          useValue: mockModel,
        },
        {
          provide: ImportJobMapperService,
          useValue: mockMapper,
        },
      ],
    }).compile();

    service = module.get<ImportJobService>(ImportJobService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all import jobs', async () => {
    const mockJobs = [
      {
        bookId: '888',
        type: 'word',
        state: 'pending',
        url: 'http://book.com',
        created_at: '2023-10-20T20:28:37.643Z',
      },
      {
        bookId: '3333',
        type: 'evernote',
        state: 'finished',
        url: 'http://book.com',
        created_at: '2023-10-20T19:14:45.438Z',
        updated_at: '2023-10-20T19:15:45.423Z',
      },
    ];
    const mockGroupedJobsResponse = {
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
    };

    mockModel.find.mockReturnThis();
    mockModel.exec.mockResolvedValueOnce(mockJobs);
    mockMapper.groupEntitesByStateToDto.mockReturnValue(
      mockGroupedJobsResponse,
    );

    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalled();
    expect(mockMapper.groupEntitesByStateToDto).toHaveBeenCalledWith(mockJobs);
    expect(result).toBe(mockGroupedJobsResponse);
  });
});
