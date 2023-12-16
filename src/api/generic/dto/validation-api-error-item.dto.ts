import { ApiErrorItemDto } from './api-error-item.dto';

export class ValidationApiErrorItemDto extends ApiErrorItemDto {
  readonly invalidField: string;
}
