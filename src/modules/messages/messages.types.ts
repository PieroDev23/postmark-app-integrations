import { Attachment, TemplatedMessage } from "postmark";

export type Result<T> = [T, null] | [null, Error];
export type ContextReciepentsConfig = Required<Pick<TemplatedMessage, 'From' | 'MessageStream' | 'TemplateId' | 'Tag'>>
export type MessageReceipent = {
    email: string;
    attachments?: Attachment[]
    TemplateModel?: Record<string, any>
}