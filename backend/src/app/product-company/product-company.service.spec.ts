import { Test, TestingModule } from '@nestjs/testing';
import { ProductCompanyService } from './product-company.service';

describe('ProductCompanyService', () => {
  let service: ProductCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCompanyService],
    }).compile();

    service = module.get<ProductCompanyService>(ProductCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
