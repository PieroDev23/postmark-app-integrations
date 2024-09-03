import { Attachment, TemplatedMessage } from "postmark";
import { ContextReciepentsConfig, MessageBuilderModel, MessageReceipent } from "../messages.types";



export class MessageBuilder implements MessageBuilderModel {

    private message: TemplatedMessage;

    constructor() {
        this.message = new TemplatedMessage('default', 111, {});
    }

    withFrom(from: string) {
        this.message.From = from;
        return this;
    }

    withTo(to: string) {
        this.message.To = to;
        return this;
    }

    withTemplateModel(model: Record<string, any>) {
        this.message.TemplateModel = model;
        return this;
    }

    withTag(tag: string) {
        this.message.Tag = tag;
        return this;
    }

    withTemplateId(templateId: number) {
        this.message.TemplateId = templateId;
        return this;
    }

    withMessageStream(stream: string): MessageBuilder {
        this.message.MessageStream = stream;
        return this;
    }

    withAttachments(attachments: Attachment[]): MessageBuilder {
        this.message.Attachments = attachments;
        return this;
    }

    basicTemplatedMessage(receipent: MessageReceipent & ContextReciepentsConfig) {
        this.withFrom(receipent.From)
            .withTo(receipent.email)
            .withMessageStream(receipent.MessageStream)
            .withTemplateId(receipent.TemplateId)
            .withTag(receipent.Tag);

        // has variables
        if (receipent.TemplateModel) {
            this.
                withTemplateModel(receipent.TemplateModel)
        }

        // has some documents
        if (receipent.Attachments) {
            this
                .withAttachments(receipent.Attachments)
        }

        return this;
    }

    buildMessage(): TemplatedMessage {
        return this.message;
    }


}