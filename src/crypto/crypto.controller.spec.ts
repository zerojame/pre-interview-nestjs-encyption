// encrypt.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

describe('EncryptController', () => {
  let controller: CryptoController;
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
    service = module.get<CryptoService>(CryptoService);
  });

  describe('encrypt', () => {
    it('should return successful response', () => {
      jest.spyOn(service, 'encryptPayload').mockImplementation(() => ({
        data1: 'mockData1',
        data2: 'mockData2',
      }));
      const result = controller.encrypt({ payload: 'test payload' });

      expect(service.encryptPayload).toHaveBeenCalledWith('test payload');
      expect(result).toEqual({
        successful: true,
        error_code: "",
        data: { data1: 'mockData1', data2: 'mockData2' },
      });
    });

    it('should return error response', () => {
      jest.spyOn(service, 'encryptPayload').mockImplementation(() => {
        throw new Error('test error');
      });
      const result = controller.encrypt({ payload: 'test payload' });

      expect(service.encryptPayload).toHaveBeenCalledWith('test payload');
      expect(result).toEqual({
        successful: false,
        error_code: "INTERNAL_SERVER_ERROR",
        data: null,
      });
    });
  });

  describe('decrypt', () => {
    it('should return successful response', () => {
      jest.spyOn(service, 'decryptPayload').mockImplementation(() => {
        return {
          payload: 'test payload',
        };
      });
      const result = controller.decrypt({ data1: 'mockData1', data2: 'mockData2' });

      expect(service.decryptPayload).toHaveBeenCalledWith('mockData1', 'mockData2');
      expect(result).toEqual({
        successful: true,
        error_code: "",
        data: {
          payload: 'test payload',
        },
      });
    });

    it('should return error response', () => {
      jest.spyOn(service, 'decryptPayload').mockImplementation(() => {
        throw new Error('test error');
      });
      const result = controller.decrypt({ data1: 'mockData1', data2: 'mockData2' });

      expect(service.decryptPayload).toHaveBeenCalledWith('mockData1', 'mockData2');
      expect(result).toEqual({
        successful: false,
        error_code: "INTERNAL_SERVER_ERROR",
        data: null,
      });
    });
  });
});
