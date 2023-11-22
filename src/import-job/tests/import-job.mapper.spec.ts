/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ImportJobMapperService } from '../mapper/import-job-mapper.service';
import { ImportJob } from '../schema/import-job.schema';
import { JobState } from '../../common/enums/state.enum';

describe('ImportJobMapperService', () => {
  let service: ImportJobMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportJobMapperService],
    }).compile();

    service = module.get<ImportJobMapperService>(ImportJobMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('entityToDto', () => {
    it('should map ImportJob entity to CreateImportJobResponseDto', () => {
      const mockEntity: any = {
        bookId: '123',
        url: 'http://example.com',
        type: 'epub',
        state: 'pending',
        created_at: new Date('2023-10-20T20:00:00.000Z'),
        updated_at: new Date('2023-10-20T20:10:00.000Z'),
      };
      const expectedDto = {
        bookId: '123',
        url: 'http://example.com',
        type: 'epub',
        state: 'pending',
        created_at: new Date('2023-10-20T20:00:00.000Z'),
        updated_at: new Date('2023-10-20T20:10:00.000Z'),
      };
      const result = service.entityToDto(mockEntity);
      expect(result).toEqual(expectedDto);
    });
  });

  describe('groupEntitesByStateToDto', () => {
    it('should group ImportJob entities by their state', () => {
      const mockEntities: ImportJob[] = [
        {
          state: JobState.Pending,
          bookId: '111',
          type: 'word',
          url: 'http://book.com',
          created_at: '2023-10-20T20:28:37.643Z',
          updated_at: '2023-10-20T20:28:37.643Z',
        },
        {
          state: JobState.Finished,
          bookId: '222',
          type: 'word',
          url: 'http://book.com',
          created_at: '2023-10-20T20:28:37.643Z',
          updated_at: '2023-10-20T20:28:37.643Z',
        },
        {
          state: JobState.Pending,
          bookId: '333',
          type: 'word',
          url: 'http://book.com',
          created_at: '2023-10-20T20:28:37.643Z',
          updated_at: '2023-10-20T20:28:37.643Z',
        },
      ] as any[];

      const removeState = (arr) => arr.map(({ state, ...rest }) => rest);
      const expectedDto = {
        [JobState.Pending]: [mockEntities[0], mockEntities[2]],
        [JobState.Finished]: [mockEntities[1]],
      };
      const expectedDtoWithoutState = {
        [JobState.Pending]: removeState(expectedDto[JobState.Pending]),
        [JobState.Finished]: removeState(expectedDto[JobState.Finished]),
      };

      const result = service.groupEntitesByStateToDto(mockEntities);
      expect(result).toEqual(expectedDtoWithoutState);
    });
  });
});
