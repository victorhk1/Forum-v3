export class User {
    _id: string;
    username: string;
    password: string;
    mail: string;
    role: string;
}

export class Category {
    _id: string;
    name: string;
    description: string;
}

export class Post {
    _id: String
    userId: String;
    categoryId: String;
    postId: String;
    commentId: String;
    title: String;
    content: String;
    publishedDate: Date;
    editedDate: Date;
}