import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from './constants';

export const validateFile = (file) => {
  if (!file) return { isValid: false, error: 'No file selected' };
  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'File type not supported. Please upload PDF or Word documents.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size exceeds 2MB limit' };
  }
  return { isValid: true, error: null };
};
