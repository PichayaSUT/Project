import { Test, TestingModule } from '@nestjs/testing';
import { PaymentListController } from './payment-list.controller';
import { PaymentListService } from './payment-list.service';

describe('PaymentListController', () => {
  let controller: PaymentListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentListController],
      providers: [PaymentListService],
    }).compile();

    controller = module.get<PaymentListController>(PaymentListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
