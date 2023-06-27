import {message} from 'antd'

class Notification {
    static success(text) {
        message.success(text)
    }

    static warning(text) {
        message.warning(text)
    }

    static error(text) {
        // message.error(errors['error-messages'][text] && this.translate ? this.translate(`error-messages.${text}`) : text)
        message.error(text)
    }
}

export default Notification
