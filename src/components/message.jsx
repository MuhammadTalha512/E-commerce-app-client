import { message } from 'antd'

const Toastify = (text, type = 'info') => {
  switch (type) {
    case 'success':
      message.success(text)
      break
    case 'error':
      message.error(text)
      break
    case 'warning':
      message.warning(text)
      break
    default:
      message.info(text)
  }
}

export default Toastify
