import 'dotenv/config';

import { SendMessagesAPI } from './modules/messages';
import { ServerClient } from 'postmark';

(async () => {
    const serverClient = new ServerClient(process.env.MERCH_SERVER_TOKEN!);
    const sender = new SendMessagesAPI(serverClient);
})();