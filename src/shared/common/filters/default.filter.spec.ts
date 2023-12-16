import { HttpException } from '@nestjs/common';

import { DefaultFilter } from './default.filter';

describe('DefaultFilter', () => {
  let filter: DefaultFilter;
  let mockHost;

  beforeEach(() => {
    filter = new DefaultFilter();
    mockHost = createMockHost();
  });

  it('should catch HttpException and return response with status and message', () => {
    const message = 'Error message';
    const errors = ['Error 1', 'Error 2'];
    const status = 400;
    const httpException = new HttpException({ message, errors }, status);

    filter.catch(httpException, mockHost);

    expect(mockHost.getResponse().status).toHaveBeenCalledWith(status);
    expect(mockHost.getResponse().json).toHaveBeenCalledWith({
      message,
      errors,
    });
  });

  it('should catch generic Error and return response with 500 status and a message', () => {
    const message = 'Generic error message';
    const error = new Error(message);

    filter.catch(error, mockHost);

    expect(mockHost.getResponse().status).toHaveBeenCalledWith(500);
    expect(mockHost.getResponse().json).toHaveBeenCalledWith({
      message: 'Something went wrong',
      errors: [],
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMockHost(): any {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  return {
    switchToHttp: jest.fn().mockReturnThis(),
    getResponse: jest.fn().mockReturnValue(response),
  };
}
