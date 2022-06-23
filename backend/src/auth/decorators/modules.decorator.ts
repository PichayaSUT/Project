import { SetMetadata } from '@nestjs/common';
import { ModulesAllowed } from '../models/role.enum';
// ต้องใช้
export const MODULES_KEY = 'modules';
export const Modules = (...args: ModulesAllowed[]) =>
  SetMetadata(MODULES_KEY, args);
