import 'dotenv/config';

import { SendMessagesAPI } from './modules/messages';
import { ServerClient } from 'postmark';

(async () => {
    const serverClient = new ServerClient(process.env.MERCH_SERVER_TOKEN!);
    const sender = new SendMessagesAPI(serverClient);

    sender.sendBatchWithTemplates(
        [
            { email: 'pdavila@pchujoy.com' },
        ],
        {
            From: 'P. Chu Joy <merch@pchujoy.com>',
            Tag: 'prueba-merch',
            MessageStream: 'merch',
            TemplateId: 34051368,
        });
})();