import { Test, TestingModule } from '@nestjs/testing';
import { ProductCompanyController } from './product-company.controller';
import { ProductCompanyService } from './product-company.service';

describe('ProductCompanyController', () => {
  let controller: ProductCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCompanyController],
      providers: [ProductCompanyService],
    }).compile();

    controller = module.get<ProductCompanyController>(ProductCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
