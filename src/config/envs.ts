import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  API_PORT: get('API_PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}