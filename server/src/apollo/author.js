import Book from './book';

const Author = `
  type Author {
    name: String
    books: [Book]
  }
`;

// we export have to export Author and all types it depends on in order to make it reusable
export default () => [Author, Book];
