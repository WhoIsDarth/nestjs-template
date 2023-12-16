import { Test } from '@nestjs/testing';

import { FiltersModule } from './filters.module';

describe('FiltersModule', () => {
  it('should compile the module', async () => {
    const exceptionFiltersModule: FiltersModule =
      await Test.createTestingModule({
        imports: [FiltersModule],
      }).compile();

    expect(exceptionFiltersModule).toBeDefined();
  });
});
