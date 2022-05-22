import { ServeExecutorSchema } from './schema';

export default async function runExecutor(options: ServeExecutorSchema) {
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
}
