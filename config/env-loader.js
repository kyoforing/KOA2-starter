const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    dotenv.config({ path: '.env.development' });
} else if (env === 'production') {
    dotenv.config({ path: '.env.production' });
}