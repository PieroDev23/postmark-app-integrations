import { TemplatedMessage } from "postmark";
import { MessageBuilder } from "./builders";
import { ContextReciepentsConfig, MessageReceipent } from "./messages.types";


export class MessageService {

    constructor() { }

    static createMessages(input: MessageReceipent[], config: ContextReciepentsConfig): TemplatedMessage[] {
        return input.map(item => {
            const messageBuilder = new MessageBuilder();
            return messageBuilder
                .basicTemplatedMessage({ ...item, ...config })
                .buildMessage();
        });
    }

    static createMessage(input: MessageReceipent, config: ContextReciepentsConfig): TemplatedMessage {
        const messageBuilder = new MessageBuilder();
        return messageBuilder
            .basicTemplatedMessage({ ...input, ...config })
            .buildMessage();
    }
}