import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import { authors, books, publishers } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const authorCollection = await authors();
  const bookCollection = await books();
  const publisherCollection = await publishers();

  const allAuthors = await authorCollection.insertMany([
    //filler author data
    {
      _id: new ObjectId(),
      name: 'Lilli',
      bio: 'Best Author Ever',
      dateOfBirth: "09/23/2002",
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Katie',
      bio: 'Second Best Author Ever',
      dateOfBirth: "11/01/2002",
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Aditi',
      bio: 'Cool Author',
      dateOfBirth: "12/04/2003",
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Ayushi',
      bio: 'Genuis Author',
      dateOfBirth: "09/14/2003",
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Colleen',
      bio: 'Rich Author',
      dateOfBirth: "12/04/2002",
      books: []
    }
  ]);

  const allPublishers = await publisherCollection.insertMany([
    //filler publisher data
    {
      _id: new ObjectId(),
      name: 'Mary Beth',
      establishedYear: 2002,
      location: 'NJ',
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Michael',
      establishedYear: 1990,
      location: 'NJ',
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Karla',
      establishedYear: 2000,
      location: 'CA',
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Alex',
      establishedYear: 2020,
      location: 'PA',
      books: []
    },
    {
      _id: new ObjectId(),
      name: 'Casey',
      establishedYear: 2023,
      location: 'DE',
      books: []
    }
  ]);

  let allBooks;
  const newBook = {
    _id: new ObjectId(),
    title: "Book 1",
    publicationDate: "09/23/2001",
    genre: "FICTION",
    authorId: allAuthors.insertedIds[0],
    publisherId: allPublishers.insertedIds[0],
    chapters: ["Chapter 1", "Chapter 2", "Chapter 3"]
  };

  allBooks = await bookCollection.insertOne(newBook);

  console.log(allBooks);
  console.log('Done seeding database');
  await closeConnection();
};

main().catch(console.log);