export type Post = {
    _id: string;
    artisanId: string,
    content: string,
    imageUrl?: string,
    linkUrl?: string,
    createdAt: Date,
}