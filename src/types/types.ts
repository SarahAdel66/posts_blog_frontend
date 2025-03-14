export interface Post {
    _id: string;
    title: string;
    content: string;
    author: {
      _id: string;
      name: string;
    };
    createdAt: Date;
    comments : Array<[]>
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    token: string;

  }
  