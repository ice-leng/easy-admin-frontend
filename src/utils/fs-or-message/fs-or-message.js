/* import { ExclamationCircleTwoTone } from 'antd'; */
import Notification from 'rc-notification';
import { InfoCircleTwoTone, CheckCircleTwoTone, CloseCircleTwoTone, QuestionCircleTwoTone } from "@ant-design/icons";
import classnames from 'classnames'
import successicon from '@/assets/images/success.svg'
import erroricon from '@/assets/images/error.svg'
import warningicon from '@/assets/images/warning.svg'
import closeicon from '@/assets/images/close.svg'
import './index.less'

const FsOrMessage = (() => {
  let notification = null
  const adapterPos = {
    topLeft: {
      top: '24px',
      left: '24px'
    },
    topRight: {
      top: '24px',
      right: '24px'
    },
    bottomLeft: {
      bottom: '24px',
      left: '24px'
    },
    bottomRight: {
      bottom: '24px',
      right: '24px'
    },
    topMiddle: {
      top: '24px',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }

  const iconType = {
    success: successicon,
    warning: warningicon,
    error: erroricon
  }

  let globalPlacement = ''
  /**
     * notice类型弹窗
     *   @param {config}  object 通知框配置属性
     *   @param {type} string 通知窗类型
     *   @param {btn}  ReactNode 自定义关闭按钮
     *   @param {bottom}  number 消息从底部弹出时，距离底部的位置，单位像素
     *   @param {className}  string 自定义 CSS class
     *   @param {description}  string|ReactNode 通知提醒内容，必选
     *   @param {duration}  number 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭
     *   @param {getContainer}  HTMLNode 配置渲染节点的输出位置
     *   @param {icon}  ReactNode 自定义图标
     *   @param {key}  string 当前通知唯一标志
     *   @param {message}  string|ReactNode 通知提醒标题，必选
     *   @param {onClose}  func 点击默认关闭按钮时触发的回调函数
     *   @param {onClick}  func 点击通知时触发的回调函数
     *   @param {top}  number 消息从顶部弹出时，距离顶部的位置，单位像素
     *   @param {closeIcon}  ReactNode 自定义关闭图标
     */
  const pop = (config) => {
    const {
      type,
      bottom,
      className,
      description,
      duration = 5000,
      getContainer = () => document.body,
      icon,
      key,
      message,
      onClose,
      onClick,
      top,
      closable = true,
      closeIcon = <img src={closeicon} style={{width: "14px", height: "14px"}}/>
    } = config
    console.log('onClose', onClose)
    notification.notice({
      content: <div className={classnames('xNotice', type )}>
        {
          (icon || ['info', 'success', 'error', 'warning'].indexOf(type) > -1) &&
          <div className={classnames('iconWrap', type, 'flex')}>
            {
              <img src={iconType[type]} style={{width: '14px', height: '14px'}}/>
            }
          </div>
        }
        <div>
          <div className="xNoticeTit">
            { message }
          </div>
        </div>
      </div>,
      key,
      closable,
      getContainer,
      /* 弹出框的关闭操作 */
      onClose() {
        /* 移除pop框，触发父级的方法 */
        let a  = document.querySelector('.rc-notification-notice');
        a.remove()
        onClose && onClose()
      },
      /* 弹出框的点击操作 */
      onClick() {
        console.log(456)
        onClick && onClick()
      },
      closeIcon,
      duration,
      style: { top, bottom }
    })
  }

  /**
     * 通知提示组件, 全局参数
     * @param {bottom} number 消息从底部弹出时，距离底部的位置，单位像素， 默认24
     * @param {duration} number 默认自动关闭延时，单位秒
     * @param {getContainer} HTMLNode 配置渲染节点的输出位置，默认document.body
     * @param {placement} string 弹出位置，可选 topLeft topRight bottomLeft bottomRight
     * @param {top} number 消息从顶部弹出时，距离顶部的位置，单位像素
     * @param {closeIcon} HTMLNode 自定义关闭图标
  */
  const config = (config) => {
    const { duration, getContainer, placement, closeIcon } = config
    // 赋值给全局的placement
    globalPlacement = placement

    Notification.newInstance({
      style: {...adapterPos[placement] },
      getContainer: getContainer,
      duration: duration || 4.5,
      closeIcon
    }, (notice) => notification = notice)
  }

  const remove = (key) => {
    notification.removeNotice(key)
  }

  const destroy = () => {
    notification.destroy()
  }

  if(notification) {
    return {
      config,
      pop,
      remove,
      destroy
    }
  }
  // 如果为创建实例，则创建默认实例
  Notification.newInstance({
    style: { right: '24px', top: '24px' }
  }, (notice) => notification = notice)

  return {
    config,
    pop,
    remove,
    destroy
  }
})()

export { FsOrMessage }