import { Test, TestingModule } from '@nestjs/testing';
import { ProductStorageService } from './product-storage.service';

describe('ProductStorageService', () => {
  let service: ProductStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductStorageService],
    }).compile();

    service = module.get<ProductStorageService>(ProductStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
