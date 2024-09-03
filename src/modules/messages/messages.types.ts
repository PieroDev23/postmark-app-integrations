import { Attachment, TemplatedMessage } from "postmark";
import { MessageBuilder } from "./builders";

export type Result<T> = [T, null] | [null, Error];
export type ContextReciepentsConfig = Required<Pick<TemplatedMessage, 'From' | 'MessageStream' | 'TemplateId' | 'Tag'>>
export type MessageReceipent = {
    email: string;
    Attachments?: Attachment[]
    TemplateModel?: Record<string, any>
}

export interface MessageBuilderModel {
    withFrom(from: string): MessageBuilder;
    withTo(to: string): MessageBuilder;
    withTemplateModel(model: Record<string, any>): MessageBuilder;
    withTag(tag: string): MessageBuilder;
    withMessageStream(stream: string): MessageBuilder;
    withTemplateId(templateId: number): MessageBuilder;
    withAttachments(attachments: Attachment[]): MessageBuilder;
    buildMessage(): TemplatedMessage;
}