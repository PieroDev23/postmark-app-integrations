import { ServerClient, TemplatedMessage } from 'postmark';
import { apiHandler, createBatches } from '../../helpers';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import { MessageService } from './message-service';
import { ContextReciepentsConfig, MessageReceipent } from './messages.types';
import { log } from '../../logger';




export class SendMessagesAPI {

    constructor(
        private readonly _serverClient: ServerClient,
    ) { }

    async sendBatchWithTemplates(receipents: MessageReceipent[], config: ContextReciepentsConfig) {
        // generate the messages by formatting to a certain structure
        const messages = MessageService.generateMessages(receipents, config);

        // segment the messages by batches of 500 size
        const batchMessages = createBatches(500, messages);

        // iterating through all the batch messages and send it
        for (const messages of batchMessages) {
            try {
                const response = await this._serverClient.sendEmailBatchWithTemplates(messages as TemplatedMessage[]);
                log('SUCCESS', 'sended', response);
                if (response[0].ErrorCode) {
                    
                }
                return response;
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.name);
                    console.log(error.cause);
                    console.log(error.message);
                }
            }


        }
    }

    async sendEmailWithTemplate(email: string): Promise<MessageSendingResponse | undefined> {
        const [data, error] = await apiHandler(this._serverClient.sendEmailWithTemplate, email);

        if (error) {
            console.log('It might be an error somewhere');
            return;
        }

        return data;
    }
}