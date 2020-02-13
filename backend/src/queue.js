import 'dotenv/config';

import Queue from './lib/Queue';

// as filas rodam separadamente da aplicacao, por isso tem essa outra "main"
Queue.processQueue();
