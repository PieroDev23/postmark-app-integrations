import { TemplatedMessage } from "postmark";
import { MessageBuilder } from "./builders";
import { ContextReciepentsConfig, MessageReceipent } from "./messages.types";
import { Message } from "./models";



export class MessageService {

    constructor() { }

    static generateMessages(input: MessageReceipent[], config: ContextReciepentsConfig): Partial<TemplatedMessage>[] {
        const { From, MessageStream, TemplateId, Tag } = config;

        return input.map(item => {
            const messageBuilder = new MessageBuilder();

            messageBuilder
                .withFrom(From)
                .withTo(item.email)
                .withMessageStream(MessageStream)
                .withTemplateId(TemplateId)
                .withTag(Tag);

            // has variables on template
            if (item.TemplateModel) {
                messageBuilder
                    .withTemplateModel(item.TemplateModel)
            }

            // has some documents
            if (item.attachments) {
                messageBuilder
                    .withAttachments(item.attachments)
            }

            // build message
            return messageBuilder.buildMessage();
        });
    }

}