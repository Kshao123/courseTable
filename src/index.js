import React, { PureComponent } from 'react';

import {
  Modal,
  Form,
  Radio,
  Spin,
  Popover,
  DatePicker,
} from 'antd';
import classNames from 'classnames'
import moment from 'moment'
import styles from './index.less';
import { parseTime } from './utils';

const RadioGroup = Radio.Group;
const defaultCourseType = [
  {
    time: '8:00',
    index: 0,
  },
  {
    time: '9:00',
    index: 1
  },
  {
    time: '10:00',
    index: 2
  },
  {
    time: '11:00',
    index: 3
  },
  {
    time: '12:00',
    index: 4
  },
  {
    time: '13:00',
    index: 5
  },
  {
    time: '14:00',
    index: 6
  },
  {
    time: '15:00',
    index: 7
  },
  {
    time: '16:00',
    index: 8
  },
  {
    time: '17:00',
    index: 9
  },
  {
    time: '18:00',
    index: 10
  },
  {
    time: '19:00',
    index: 11
  },
  {
    time: '20:00',
    index: 12
  },
  {
    time: '21:00',
    index: 13
  },
  {
    time: '22:00',
    index: 14
  },
];

@Form.create()
class CourseTables extends PureComponent{
  constructor() {
    super();
    this.state = {
      currentEl: undefined,
      currentDay: new Date().getTime(),
      timeLineWidth: undefined,
      courseContentWidth: undefined,
      contentItemWidth: undefined,
      movedPos: undefined,
      nearTime: undefined,
      visible: false,
    }
  }

  componentDidMount() {
    this.setState({
      courseContentWidth: this.coursesContent.offsetWidth,
      contentItemWidth: parseInt((this.coursesContent.offsetWidth - this.timeLineWidth.offsetWidth) / 7, 10),
      timeLineWidth: this.timeLineWidth.offsetWidth,
    })
  }

  renderWeek = () => {
    const { currentDay: xDay } = this.state;
    const data = xDay ? new Date(xDay) : new Date();
    let week = data.getDay();
    if (week === 0) {
      week = 6
    } else {
      week -= 1
    }
    const currentDay = week !== 0 ? data.getTime() - (24 * week) * 60 * 60 * 1000 : data.getTime();
    const content = [];
    for (let i = 0; i < 7; i += 1) {
      content.push({
        date: currentDay + (24 * i) * 60 * 60 * 1000
      })
    }
    return content;
  };

  renderBorderList = () => {
    const list = [];
    const { courseContentWidth, timeLineWidth } = this.state;
    const { courseType } = this.props;
    const MAX = (courseType || defaultCourseType).length * 4;
    for (let i = 0; i < MAX; i += 1) {
      if ((i+1) % 4 === 0 && i !== 0) {
        // 这里的 15 为当前需要边框的元素的高度，28 为星期的高度
        list.push(
            <div
                style={{ position: 'absolute', width: '100%', height: 15, top: 15 * i + 28, left: 0, borderBottom: '1px solid rgb(238, 238, 238)' }}
                key={`${i}`}
            />
        )
      }else {
        list.push(
            <div
                style={{ position: 'absolute', width: courseContentWidth - timeLineWidth, height: 15, top: 15 * i + 28, left: timeLineWidth, borderBottom: '1px dashed  rgb(238, 238, 238)' }}
                key={`${i}`}
            />
        )
      }
    }
    return list;
  };

  renderRectEl = (courseTables) => {
    let arr = [];
    const list = Object.keys(courseTables);
    if (!list.length || !Object.keys(this.weekPos).length) return;
    const { courseType } = this.props;
    const timeType = {};
    courseType || defaultCourseType.forEach((item, index) => {
      const num = item.time.split(':')[0];
      timeType[num] = item.index
    });
    arr = list.map(item => {
      const data = courseTables[item];
      return data.map(items => {
        const date = new Date(items.startTime);
        const TOP = date.getHours();
        if (timeType[TOP] !== 0 && !timeType[TOP]) return [];
        const top = `${this.timePos[timeType[TOP]].top + date.getMinutes()}px`;
        const left = `${this.weekPos[parseInt(item, 10) - 1].left}px`;
        const height = `${(items.endTime - items.startTime) / 1000 / 60}px`;
        const content = (
            <div>
              <ul className={styles.rectList}>
                <li>
                  教师姓名：{items.teaName}
                </li>
                <li>
                  学生姓名：{items.stuNameList.join('，')}
                </li>
              </ul>
            </div>
        );
        return (
            <Popover key={items.startTime} placement="bottom" content={content} title={items.teaName}>
              <div
                  className={styles.courseRect}
                  style={{
                    top,
                    left,
                    width: 122,
                    height,
                    backgroundColor: '#def3fc',
                  }}
                  onMouseDown={this.mouseDown}
                  onContextMenu={this.ContextMenu}
              >
                <p>
                  课程：{items.courseName}
                </p>
                <p>
                  学生：{items.stuNameList[0]}
                </p>
              </div>
            </Popover>
        )
      })
    });
    return arr;
  };

  mouseDown = (e) => {
    this.disX = 0;
    this.disY = 0;
    this.top = 0;
    this.left = 0;
    if (e.button === 0) {
      let el = e.target;
      let cEl;
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      if (el.parentNode.className.split(' ').includes(classNames(styles.courseRect))) {
        el = el.parentNode;
      }
      this.disX = e.clientX + this.scrollLeft - el.offsetLeft;
      this.disY = e.clientY + this.scrollTop - el.offsetTop;
      cEl = el.cloneNode(true);
      el.style.opacity = 0.5;
      if (cEl) {
        cEl.id = 'cEl';
        cEl.style.zIndex = 4;
        this.courseWrapper.appendChild(cEl);
      }
      this.movedcElPos = { top: parseFloat(el.style.top), left: parseFloat(el.style.left) };
      document.onmousemove = e => this.mouseMove(e, el);
      document.onmouseup = e => this.mouseUp(e, el);
      this.props.mouseDown && this.props.mouseDown()
    }
    e.preventDefault();
  };

  mouseMove = (e) => {
    const height = this.coursesContent.offsetHeight;
    const width = this.coursesContent.offsetWidth;
    const cEl = document.getElementById('cEl');
    const left = Math.min(Math.max(e.clientX + this.scrollLeft - this.disX, 66), width - 120);
    const Top = Math.min(Math.max(e.clientY + this.scrollTop - this.disY, 28), height - 2);
    this.top = Top;
    this.left = left;
    this.props.mouseMove && this.props.mouseMove();
    if (cEl) {
      cEl.style.left = `${left}px`;
      cEl.style.top = `${Top}px`;
    }
  };

  mouseUp = (e, el) => {
    const cEl = document.getElementById('cEl');
    if (cEl) {
      const top = this.top || parseFloat(cEl.style.top);
      const left = this.left || parseFloat(cEl.style.left);
      const movedPos = this.checkPos({ top, left }, this.timePos, this.weekPos);
      this.courseWrapper.removeChild(cEl);
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      const { top: oldTop, left: oldLeft } = this.movedcElPos;
      this.props.mouseUp && this.props.mouseUp();
      if (oldLeft) {
        if (!(oldLeft === left) || !(oldTop === top)) {
          this.handleMoveConfirm(el, movedPos, { top, left });
        }
      }
    }
    el.style.opacity = 1;
    document.onmouseup = document.onmousemove = null;
  };

  checkPos = (nowPos, timePos, weekPos) => {
    const { left, top } = nowPos;
    const length1 = Object.keys(timePos).length;
    const length = Object.keys(weekPos).length;
    let T = 0;
    let L = 0;
    for (let i = 0; i < length1; i += 1 ) {
      if (i >= length1 - 1) {
        T = length1 -1;
        break;
      }
      if (timePos[i].top === top) {
        T = i;
        break;
      }
      if (timePos[i].top < top && timePos[i + 1].top > top) {
        T = i;
        break;
      }
    }
    for (let j = 0; j < length; j += 1 ) {
      if (j >= length - 1) {
        L = length -1;
        break;
      }
      if (weekPos[j].left === left) {
        L = j;
        break;
      }
      if (weekPos[j].left < left + 60 && weekPos[j + 1].left > left + 60) {
        L = j;
        break;
      }
    }
    return { top: T, left: L }
  };

  handleMoveConfirm = (el, movedPos, newPos) => {
    const { top } = movedPos;
    const { top: newTop } = newPos;
    const oldTime = this.timePos[top].top;
    const currentTime = this.timePos[top].time;
    const nearTime = Math.min( Math.round((newTop - oldTime)/5)*5, 55);
    this.setState({
      visible: true,
      currentEl: el,
      currentTime,
      nearTime,
      movedPos,
    });
  };

  handleOk = () => {
    const { form, handleConfirm } = this.props;
    const { resetFields } = form;
    const { currentEl, movedPos } = this.state;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((error, values) => {
      if (error) return;
      const { startTime, timeDate } = values;
      const Day = timeDate.toDate();
      const Hours = this.timePos[movedPos.top].time.split(':')[0];
      Day.setHours(Hours);
      Day.setMinutes(parseInt(startTime, 10));
      Day.setSeconds(0);
      const getTime = Day.getTime(); // 获取移动后的开始时间
      const top = `${this.timePos[movedPos.top].top + startTime}px`;
      const left = `${this.weekPos[movedPos.left].left}px`;
      currentEl.style.top = top;
      currentEl.style.left = left;
      if (handleConfirm) {
        handleConfirm(
            {
              startTime: getTime,
            },
            () => {
              resetFields();
              this.setState({
                visible: false
              });
            }
        )
      } else {
        this.setState({
          visible: false
        });
        resetFields()
      }
    });
  };

  handleCancel = () => {
    const { currentEl } = this.state;
    const { top, left } = this.movedcElPos;
    currentEl.style.top = `${top}px`;
    currentEl.style.left = `${left}px`;
    this.props.form.resetFields();
    this.setState({
      visible: false
    });
  };

  renderRadioList = () => {
    const RadioList = [];
    const { currentTime } = this.state;
    if (!currentTime) return;
    const HOURS = currentTime.split(':')[0];
    for (let i = 0; i < 60; i += 5) {
      let MIN = i;
      if (MIN < 10) {
        MIN = `0${  MIN}`;
      }
      RadioList.push(
          <Radio key={i} value={i}>{`${HOURS}:${MIN}`}</Radio>
      )
    }
    return RadioList;
  };

  render() {
    const {
      contentItemWidth,
      timeLineWidth,
      visible,
      nearTime,
      movedPos,
    } = this.state;
    const { renderWeek, renderBorderList, renderRectEl, handleOk, handleCancel } = this;
    const { courseType: TYPE, courseTables, loading, form } = this.props;
    const { getFieldDecorator } = form;
    this.timePos = {};
    this.weekPos = {};
    const courseType = TYPE && TYPE.length ? TYPE : defaultCourseType;
    const defaultHeight = 28; // 默认星期上的高度为 28，可以修改 coursesHead 的样式来调整高度，谨慎修改 QAQ，
    const courseHeight = courseType.length * 60 + defaultHeight;
    const courseWidth = 920;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    return (
        <section style={{ height: courseHeight, width: courseWidth }} className={styles.coursesTable} onContextMenu={e => e.preventDefault()}>
          <div ref={e => { this.courseWrapper = e }} className={styles.courseWrapper} style={{ height: '100%', width: '100%' }}>
            <div className={styles.coursesHead} style={{ height: defaultHeight }}>
              {contentItemWidth ? (
                  renderWeek().map((item, index) => (
                      <div key={item.date} style={{ width: contentItemWidth, left: contentItemWidth * index + timeLineWidth}}>
                        {
                          <div className={new Date().getDate() === new Date(item.date).getDate() ? styles.heightLightWeek : ''} style={{ textAlign: 'center', width: '100%'}}>
                            <span>{`周${parseTime(item.date, '{a}')}`}</span>
                            <span>{`${parseTime(item.date, '{m}-{d}')}`}</span>
                          </div>
                        }
                      </div>
                  ))
              ) : 'loading'}
            </div>

            <div className={styles.rgird}>
              <div style={{ height: defaultHeight, borderBottom: '1px dashed #cbc5c7' }}>
              </div>
              {contentItemWidth ? renderBorderList() : 'loading'}
            </div>

            <div ref={(e) => { this.coursesContent = e }} className={styles.coursesContent} style={{ width: courseWidth }}>
              {contentItemWidth ? (
                  renderWeek().map((item, index) => {
                    const left = contentItemWidth * index + timeLineWidth;
                    this.weekPos[index] = { left, top: 0, time: item.date };
                    return (
                        <div
                            key={item.date}
                            style={{ width: contentItemWidth, left, height: '100%', borderRight: '1px solid  rgb(238, 238, 238)' }}
                            index={index}
                        />
                    )
                  })
              ) : 'loading'}
            </div>

            <div ref={(e) => { this.timeLineWidth = e }} style={{ width: 66 }} className={styles.coursesLeftHand}>
              {
                courseType ? courseType.map((item, num) => {
                  const { time, index } = item;
                  const top = 60 * num + defaultHeight;
                  this.timePos[num] = { left: 0, top, time, index };
                  return (
                      <div
                          key={index}
                          className={styles.timeList}
                          style={{ width: 66, height: 60, lineHeight: '60px', top, }}
                      >
                    <span>
                      {time}
                    </span>
                      </div>
                  )
                }) : 'loading'
              }
            </div>

            <div>
              {renderRectEl(courseTables)}
            </div>
          </div>
          <Modal
              title="选择课程周数"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
          >
            <Spin spinning={!!loading}>
              <Form layout="horizontal">
                <Form.Item label="日期" {...formItemLayout}>
                  {getFieldDecorator('timeDate', {
                    initialValue: movedPos ? moment(parseTime(this.weekPos[movedPos.left].time)) : moment(new Date()),
                    rules: [{ required: true, message: '请选择具体的时间' }],
                  })(
                      // 基本业务逻辑已完成，就没有再去实现选择日期调整位置，简单的操作 再去请求一次数据让他自己刷新吧
                      <DatePicker disabled />
                  )}
                </Form.Item>

                <Form.Item label="开始时间" {...formItemLayout}>
                  {getFieldDecorator('startTime', {
                    initialValue: nearTime || nearTime === 0 ? nearTime : 5,
                    rules: [{ required: true, message: '请选择开始时阿' }],
                  })(
                      <RadioGroup>
                        {this.renderRadioList()}
                      </RadioGroup>
                  )}
                </Form.Item>
              </Form>
            </Spin>
          </Modal>
        </section>
    )
  }
}

export default CourseTables

