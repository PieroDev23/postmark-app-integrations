import { ServerClient } from 'postmark';
import { createBatches } from '../../helpers';
import { log } from '../../logger';
import { MessageService } from './message-service';
import { ContextReciepentsConfig, MessageReceipent } from './messages.types';


export class SendMessagesAPI {

    constructor(
        private readonly _serverClient: ServerClient,
    ) { }

    async sendBatchWithTemplates(receipents: MessageReceipent[], config: ContextReciepentsConfig) {
        // generate the messages by formatting to a certain structure
        const messages = MessageService.createMessages(receipents, config);
        // segment the messages by batches of 500 size
        const batchMessages = createBatches(500, messages);
        // iterating through all the batch messages and send it
        for (const messages of batchMessages) {
            try {
                const response = await this._serverClient.sendEmailBatchWithTemplates(messages);
                log('SUCCESS', 'sended', response);
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = `[${error.name}]: ${error.message} - causaed by ${error.cause ? error.cause : 'not-defined'}`
                    log('ERROR', errorMessage, { error, batchMessages });
                }
            }
        }
    }

    async sendEmailWithTemplate(receipent: MessageReceipent, config: ContextReciepentsConfig) {
        const message = MessageService.createMessage(receipent, config);
        try {
            const response = await this._serverClient.sendEmailWithTemplate(message);
            if (response.ErrorCode) {
                log('ERROR', response.ErrorCode.toString(), response);
                return;
            }
            log('SUCCESS', 'sended', response);
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `[${error.name}]: ${error.message} - causaed by ${error.cause ? error.cause : 'not-defined'}`
                log('ERROR', errorMessage, { error, message });
            }
        }
    }
}