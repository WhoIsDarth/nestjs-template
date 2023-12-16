import { ApiErrorItemDto } from './api-error-item.dto';
import { ValidationApiErrorItemDto } from './validation-api-error-item.dto';

export type ApiErrorItem = ApiErrorItemDto | ValidationApiErrorItemDto;

export class ApiErrorDto {
  readonly message: string;
  readonly errors?: ApiErrorItem[];
}
