import { Test, TestingModule } from '@nestjs/testing';
import { ProductStorageController } from './product-storage.controller';
import { ProductStorageService } from './product-storage.service';

describe('ProductStorageController', () => {
  let controller: ProductStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStorageController],
      providers: [ProductStorageService],
    }).compile();

    controller = module.get<ProductStorageController>(ProductStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
