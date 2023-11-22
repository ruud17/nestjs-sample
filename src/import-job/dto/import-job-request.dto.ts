import { IsString, IsUrl, IsIn } from 'class-validator';
import { ImportType } from '../../common/enums/state.enum';

export class CreateImportJobRequestDTO {
  @IsString()
  bookId: string;

  @IsIn(Object.values(ImportType))
  type: string;

  @IsUrl()
  url: string;
}
