//
// Key:value database (in memory)
// [Singleton]
// TODO: full tests !!! auto tests, cover all !!!
//
class CKeyValueDB {
  #db = {}; // DB as object

  constructor() {
    if (!CKeyValueDB._instance)
      CKeyValueDB._instance = this;

    return CKeyValueDB._instance; // Singleton
  }

  /**
   * Set value to a key. If key exists, replace it by new value.
   * Note: creates a deep clone of array/object
   * 
   * @param {string} key -
   * @param {any} val - 
   */
  set(key, val) {
    this.#db[key] = (typeof val === 'object') ? this.clone(val) : val;
  }

  /**
   * Get value by key
   * 
   * @param {string} key - Key to get value
   * @param {bool} isClone - If true: return cloned value array/object. (Default is true)
   * @returns {any|null} - Return's value if key found. Otherwise NULL.
   */
  get(key, isClone = true) {
    if ((this.#db[key] || null) === null) 
      return null; // Key nof found

    return isClone 
      ? ((typeof this.#db[key] === 'object') ? this.clone(this.#db[key]) : this.#db[key] ) // Clone if value is array/object
      : this.#db[key] // primitive data type
      ;
  }

  /**
   * Get list of keys & values as object, matching by key prefix.
   * Example: getByPrefix('mr') will returns all data with keys starting from "mr"
   * Note: [keyPrefix] are case-sensetive
   * 
   * @param {string} keyPrefix - Key prefix to search
   * @param {bool} isClone - If true: return cloned value array/object. (Default is true)
   * @returns {object} - Return's object of keys:values. If none founded, return an empty object
   */
  getByPrefix(keyPrefix, isClone = true) {
    let matched = {};
    for (let key in this.#db)
      if (key.indexOf(keyPrefix, 0) === 0)
        matched[key] = this.#db[key]; // TODO: isClone ? this.clone... : ... / or / replace by this.get

    return matched;
  }

  /**
   * Get list of keys & values as array, matching by key prefix.
   * Example: getByPrefixArr('mr') will returns all data with keys starting from "mr"
   * Note: [keyPrefix] are case-sensetive
   * 
   * @param {string} keyPrefix - Key prefix to search
   * @param {bool} isClone - If true: return cloned value array/object. (Default is true)
   * @returns {array} - Return's array of objects key:value. If none founded, return an empty array
   */
  getByPrefixArr(keyPrefix, isClone = true) {
    let matched = [];
    for (let key in this.#db)
      if (key.indexOf(keyPrefix, 0) === 0)
        matched.push(this.#db[key]); // TODO: isClone ? this.clone... : ... / or / replace by this.get

    return matched;
  }

  /**
   * Clean key:value database
   * 
   * @return void
   */
  clean() {
    this.#db = {}; // New empty object
  }

  /**
   * Doing backup of databese in JSON string
   * @returns {string} - Return's JSON string of whole database
   */
  backup() {
    return JSON.stringify(this.#db);
  }

  /**
   * Restore database from JSON string (previosly backuped)
   * WARNING! Replase all exitings data
   * TODO: restore, validate json try{}catch(error){}, error processing...
   * 
   * @param {string} json - Valid JOSN backup
   * @returns 
   */
  restore(json) {
    //return this.count();
    // return [ count, error_message json ]
  }

  /**
   * Merge a new object (keys:values) to current DB (key by key)
   * Note: makes a deep-clone for each value if it an array/object
   * 
   * @param {object} kvObj - Keys:values object to merge with current DB.
   * @returns {number} - Return count of merged keys. Returns -1 if [kvObj] is not valid object
   */
  merge(kvObj) {
    if (typeof kvObj != 'object' || Array.isArray(kvObj))
      return -1;

    let count = 0;
    for (let i in kvObj) {
      this.set(`${i}`, kvObj[i]);
      count ++;
    }

    return count;
  }

  /**
   * Get count of items stored in DB
   * 
   * @returns {number} - Return's count of stored items
   */
  count() {
    return Object.keys(this.#db).length;
  }

  /**
   * Create deep clone of object. 
   * Using JSON parse ( stringify )
   * NOTE: Use this method only for data, not for functions or other methods.
   * 
   * @param {object} obj - Object to clone
   * @return {object} - Return newly cloned object
   */
  clone(obj) {
    // NOTE: we don't use method [structuredClone] because we work only with data and 
    // if (typeof structuredClone === 'function') return structuredClone(obj);
    return JSON.parse(JSON.stringify(obj));
  }
}

const kvDB = new CKeyValueDB();

export default kvDB;