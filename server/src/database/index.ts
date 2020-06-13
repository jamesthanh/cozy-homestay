import { MongoClient } from 'mongodb';
const user = 'thanhnguyen';
const userPassword = 'Tanthanh1';
const cluster = 'cozy-homestay-tmfo4';
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/<dbname>?retryWrites=true&w=majority`;
export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('main');
  return {
    listings: db.collection('test_listings'),
  };
};