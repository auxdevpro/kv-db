import kvDB from './scr/kv-db.js';

kvDB.set('Hello', 'World');

console.log('Get value from key "Hello":', kvDB.get('Hello'));


//kvDB.getByPrefix(keyPrefix, isClone = true)
//kvDB.getByPrefixArr(keyPrefix, isClone = true)
//kvDB.clean()
//kvDB.backup()
//kvDB.restore(json)
//kvDB.merge(kvObj) {

//kvDB.clone(obj)  // yes it's a public!



console.log('Count of stored keys:', kvDB.count());
