import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
import { Todo } from 'containers/Home/store';
import { Member } from 'containers/Member/store';

type Data = {
  members: Member[];
  todos: Todo[];
};

const file = join(__dirname, 'db.json');
const adapter = new JSONFile<Data>(file);
const db = new Low(adapter);

export default db;
