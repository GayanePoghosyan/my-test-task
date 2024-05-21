import { toast, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum NotificationTypeEnum {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export const showNotification = (
  content: ToastContent,
  options?: ToastOptions
) => {
  return toast(content, options)
};
