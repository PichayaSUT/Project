import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config = () => {
  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: process.env.NODE_ENV === 'development',
  } as TypeOrmModuleOptions;
};
