import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export function applySecurity(app) {
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 120, // limit each IP to 120 requests per windowMs
  });

  app.use(limiter);
}
