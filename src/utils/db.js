
const DB_NAME = 'ai-study-assistant-db';
const DB_VERSION = 3;
const FEEDBACK_STORE_NAME = 'feedback';

let db;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (db.objectStoreNames.contains('chat-history')) {
        db.deleteObjectStore('chat-history');
      }
      if (!db.objectStoreNames.contains(FEEDBACK_STORE_NAME)) {
        db.createObjectStore(FEEDBACK_STORE_NAME, { keyPath: '_id' });
      }
    };
  });
};

export const addFeedback = (feedbackItems) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Database not initialized');
      return;
    }
    const transaction = db.transaction([FEEDBACK_STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(FEEDBACK_STORE_NAME);

    feedbackItems.forEach(item => {
        const getRequest = objectStore.get(item._id);
        getRequest.onsuccess = (event) => {
            const existingItem = event.target.result;
            if (existingItem) {
                objectStore.put(item);
            } else {
                objectStore.add(item);
            }
        };
    });

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject('Error adding feedback to the database');
    };
  });
};

export const getFeedback = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Database not initialized');
      return;
    }
    const transaction = db.transaction([FEEDBACK_STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(FEEDBACK_STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = () => {
      reject('Error getting feedback from the database');
    };
  });
};
