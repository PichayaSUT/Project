import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number(),
});

/**
 * เป็นตัวดูว่าค่าที่ควรใส่ใน .env ต้องเป็นค่าไหน (ไม่ได้เอาไป check ตอนนี้ )
 */
export const validateDatabase = Joi.object({
  DATABASE_TYPE: Joi.string().valid('postgres'), // ต้องเป็น postgres
  DATABASE_HOST: Joi.string(),
  DATABASE_NAME: Joi.string().valid('JJStore'), // ต้องเป็น JJStore
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_PORT: Joi.number(),
  DATABASE_USER: Joi.string(),
  DATABASE_SYNCHRONIZE: Joi.boolean(), // ต้องเป็น false ตอน deploy
});
