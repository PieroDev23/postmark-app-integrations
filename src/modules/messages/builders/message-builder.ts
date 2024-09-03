import { Attachment } from "postmark";
import { Message } from "../models";

interface MessageBuilderModel {
    withFrom(from: string): MessageBuilder;
    withTo(to: string): MessageBuilder;
    withTemplateModel(model: Record<string, any>): MessageBuilder;
    withTag(tag: string): MessageBuilder;
    withMessageStream(stream: string): MessageBuilder;
    withTemplateId(templateId: number): MessageBuilder;
    withAttachments(attachments: Attachment[]): MessageBuilder;
    buildMessage(): Message;
}

export class MessageBuilder implements MessageBuilderModel {

    private message: Message;

    constructor() {
        this.message = new Message();
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

    buildMessage(): Message {
        return this.message;
    }


}