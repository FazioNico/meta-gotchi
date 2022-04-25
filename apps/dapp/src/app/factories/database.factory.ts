export const databaseFactory = (provider: Storage) => {
  console.log('[INFO]', 'databaseFactory'); 
  return {
    setItem<T>(key: string, value: T): Promise<boolean> {
      console.log('[INFO]', 'databaseFactory.setItem', key, value); 
      return new Promise((resolve, reject) => {
        try {
          const data = JSON.stringify(value);
          provider.setItem(key, data);
          resolve(true);
        } catch (error) {
          reject(error); 
        }
      });
    },
    getItem<T>(key: string): Promise<T> {
      console.log('[INFO]', 'databaseFactory.getItem', key); 
      return new Promise((resolve, reject) => {
        const value = provider.getItem(key);
        try {
          const data = JSON.parse(value||'{}');          
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },
    removeItem(key: string): Promise<boolean> {
      console.log('[INFO]', 'databaseFactory.removeItem', key); 
      return new Promise((resolve, reject) => {
        provider.removeItem(key);
        resolve(true);
      });
    }
  } 
};