import { Attachment } from "postmark";

interface MessageModel {
    From: string;
    To: string;
    TemplateModel?: Record<string, any>;
    MessageStream: string;
    Attachments?: Attachment[];
    Tag: string;
    TemplateId: number
}

export class Message implements MessageModel {
    Attachments?: Attachment[];
    From: string;
    To: string;
    TemplateModel?: Record<string, any> | undefined;
    MessageStream: string;
    Tag: string;
    TemplateId: number;
}
