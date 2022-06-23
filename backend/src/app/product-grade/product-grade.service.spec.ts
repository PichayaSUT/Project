import { Test, TestingModule } from '@nestjs/testing';
import { ProductGradeService } from './product-grade.service';

describe('ProductGradeService', () => {
  let service: ProductGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductGradeService],
    }).compile();

    service = module.get<ProductGradeService>(ProductGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
