import { Test, TestingModule } from '@nestjs/testing';
import { ProductGradeController } from './product-grade.controller';
import { ProductGradeService } from './product-grade.service';

describe('ProductGradeController', () => {
  let controller: ProductGradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductGradeController],
      providers: [ProductGradeService],
    }).compile();

    controller = module.get<ProductGradeController>(ProductGradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
