// src/utils/storage.js

/**
 * Local Storage Utilities
 * Cung cấp các functions để làm việc với localStorage một cách an toàn
 */

// Constants
export const STORAGE_KEYS = {
  FLASH_CARDS: 'flashcard_app_cards',
  USER_PROGRESS: 'flashcard_app_progress',
  STUDY_HISTORY: 'flashcard_app_history',
  SETTINGS: 'flashcard_app_settings',
  DAILY_GOAL: 'flashcard_app_daily_goal',
  STUDY_STREAK: 'flashcard_app_streak',
  LAST_STUDY_DATE: 'flashcard_app_last_study_date',
  APP_VERSION: 'flashcard_app_version'
};

/**
 * Kiểm tra localStorage có khả dụng không
 * @returns {boolean}
 */
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, 'test');
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};

/**
 * Lưu dữ liệu vào localStorage
 * @param {string} key - Key để lưu
 * @param {any} value - Giá trị cần lưu
 * @returns {boolean} - Success status
 */
export const setItem = (key, value) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Lấy dữ liệu từ localStorage
 * @param {string} key - Key cần lấy
 * @param {any} defaultValue - Giá trị mặc định nếu không tìm thấy
 * @returns {any} - Dữ liệu đã parse hoặc defaultValue
 */
export const getItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Xóa một item khỏi localStorage
 * @param {string} key - Key cần xóa
 * @returns {boolean} - Success status
 */
export const removeItem = (key) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Xóa tất cả dữ liệu của app khỏi localStorage
 * @returns {boolean} - Success status
 */
export const clearAppData = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing app data:', error);
    return false;
  }
};

/**
 * Lấy kích thước dữ liệu đã sử dụng (tính bằng KB)
 * @returns {number} - Kích thước tính bằng KB
 */
export const getStorageSize = () => {
  if (!isLocalStorageAvailable()) {
    return 0;
  }

  try {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += new Blob([item]).size;
      }
    });
    return Math.round(totalSize / 1024 * 100) / 100; // KB with 2 decimal places
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};

/**
 * Kiểm tra localStorage có gần đầy không (>80%)
 * @returns {boolean}
 */
export const isStorageNearFull = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    // Test write a large string to estimate available space
    const testKey = '__storage_test__';
    const testData = 'x'.repeat(1024 * 1024); // 1MB
    
    try {
      localStorage.setItem(testKey, testData);
      localStorage.removeItem(testKey);
      return false; // Still have space
    } catch (e) {
      return true; // Storage is full or near full
    }
  } catch (error) {
    console.error('Error checking storage capacity:', error);
    return false;
  }
};

/**
 * Export tất cả dữ liệu app để backup
 * @returns {Object|null} - Dữ liệu đã export hoặc null nếu lỗi
 */
export const exportAppData = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const exportData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      data: {}
    };

    Object.entries(STORAGE_KEYS).forEach(([keyName, storageKey]) => {
      const item = localStorage.getItem(storageKey);
      if (item) {
        exportData.data[keyName] = JSON.parse(item);
      }
    });

    return exportData;
  } catch (error) {
    console.error('Error exporting app data:', error);
    return null;
  }
};

/**
 * Import dữ liệu app từ backup
 * @param {Object} importData - Dữ liệu cần import
 * @returns {boolean} - Success status
 */
export const importAppData = (importData) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    if (!importData || !importData.data) {
      throw new Error('Invalid import data format');
    }

    // Validate version compatibility if needed
    if (importData.version && importData.version !== '1.0.0') {
      console.warn('Import data version mismatch, proceeding anyway...');
    }

    // Import each key
    Object.entries(importData.data).forEach(([keyName, value]) => {
      const storageKey = STORAGE_KEYS[keyName];
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    });

    return true;
  } catch (error) {
    console.error('Error importing app data:', error);
    return false;
  }
};

/**
 * Tạo backup file và download
 * @param {string} filename - Tên file backup
 */
export const downloadBackup = (filename = 'flashcard-backup.json') => {
  const data = exportAppData();
  if (!data) {
    throw new Error('Failed to export data');
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Migrate dữ liệu từ version cũ (nếu cần)
 * @param {string} currentVersion - Version hiện tại
 */
export const migrateData = (currentVersion = '1.0.0') => {
  const storedVersion = getItem(STORAGE_KEYS.APP_VERSION, '0.0.0');
  
  if (storedVersion === currentVersion) {
    return; // No migration needed
  }

  try {
    // Migration logic would go here
    // For now, just update the version
    setItem(STORAGE_KEYS.APP_VERSION, currentVersion);
    console.log(`Data migrated from ${storedVersion} to ${currentVersion}`);
  } catch (error) {
    console.error('Error during data migration:', error);
  }
};

/**
 * Compress dữ liệu trước khi lưu (simple compression)
 * @param {any} data - Dữ liệu cần compress
 * @returns {string} - Dữ liệu đã compress
 */
export const compressData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    // Simple compression: remove unnecessary whitespace
    return jsonString.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error compressing data:', error);
    return JSON.stringify(data);
  }
};

/**
 * Decompress dữ liệu sau khi lấy
 * @param {string} compressedData - Dữ liệu đã compress
 * @returns {any} - Dữ liệu đã decompress
 */
export const decompressData = (compressedData) => {
  try {
    return JSON.parse(compressedData);
  } catch (error) {
    console.error('Error decompressing data:', error);
    return null;
  }
};

/**
 * Watch localStorage changes
 * @param {string} key - Key cần watch
 * @param {function} callback - Callback khi có thay đổi
 * @returns {function} - Cleanup function
 */
export const watchStorage = (key, callback) => {
  const handleStorageChange = (e) => {
    if (e.key === key) {
      callback(e.newValue, e.oldValue);
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

/**
 * Batch operations để giảm số lần truy cập localStorage
 */
export class StorageBatch {
  constructor() {
    this.operations = [];
  }

  set(key, value) {
    this.operations.push({ type: 'set', key, value });
    return this;
  }

  remove(key) {
    this.operations.push({ type: 'remove', key });
    return this;
  }

  execute() {
    if (!isLocalStorageAvailable()) {
      return false;
    }

    try {
      this.operations.forEach(({ type, key, value }) => {
        if (type === 'set') {
          localStorage.setItem(key, JSON.stringify(value));
        } else if (type === 'remove') {
          localStorage.removeItem(key);
        }
      });
      
      this.operations = [];
      return true;
    } catch (error) {
      console.error('Error executing batch operations:', error);
      return false;
    }
  }
}

// Helper functions cho specific app data
export const flashCardStorage = {
  save: (cards) => setItem(STORAGE_KEYS.FLASH_CARDS, cards),
  load: (defaultCards = []) => getItem(STORAGE_KEYS.FLASH_CARDS, defaultCards),
  clear: () => removeItem(STORAGE_KEYS.FLASH_CARDS)
};

export const progressStorage = {
  save: (progress) => setItem(STORAGE_KEYS.USER_PROGRESS, progress),
  load: (defaultProgress = {}) => getItem(STORAGE_KEYS.USER_PROGRESS, defaultProgress),
  clear: () => removeItem(STORAGE_KEYS.USER_PROGRESS)
};

export const settingsStorage = {
  save: (settings) => setItem(STORAGE_KEYS.SETTINGS, settings),
  load: (defaultSettings = {}) => getItem(STORAGE_KEYS.SETTINGS, defaultSettings),
  clear: () => removeItem(STORAGE_KEYS.SETTINGS)
};