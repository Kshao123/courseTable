/*!
 * 所需参数描述：
 *   courseTables：对象，接受的为 以星期为key，value为那天的数据数组
 *   courseType: 数组，描述课程表时间所用
 *   loading: 表格加载的状态
 *   handleConfirm: 弹出框确认函数，接受两个参数，1.移动的那节课数据，2.状态框关闭函数，可用来异步请求完成时执行的函数
 *
 * 参数：
 *   courseTables 必传，表格数据
 *      courseTables = { // key 为星期， value 为当天的课程内容
 *          1：[
 *              startTime: 1551920827000, // 必传 开始时间 （根据开始时间结束时间 计算元素高度）
 *              endTime: 1551920827000, // 必传 结束时间
 *              stuNameList: ['123'], // 可选，但是使用的话需要传，可以在index文件里的 renderRectEl 函数内修改
                teaName: '312' // 同上
 *          ]
 *      }
 *   courseType 可传 时间轴渲染所需的数组，不传为默认的 8.00-22.00
 *
 * 表格 state 描述：
 *   currentEl：当前点击的元素，
 *   currentDay：当前日期，
 *   timeLineWidth: 渲染时间元素的宽度，
 *   courseContentWidth: 课程表内容宽度
 *   contentItemWidth: 由课程表内容宽度得出的每列的宽度
 *   movedPos: 鼠标点击元素移动后的大概方位
 *   nearTime: 鼠标抬起后 元素处于的时间
 *   visible: 弹出框的显隐
 *
 *
 *  tip:
 *    默认高度为60px为一小时
 *    逻辑简单，因为公司业务逻辑到这结束，所以也没有继续做右键添加课程的逻辑，可以自行修改。
 *
*/
import * as React from 'react';

interface TableProps {
  courseTables: object,
  courseType?: Array<object>,
  loading?: boolean,
  mouseDown?: () => void,
  mouseMove?: () => void,
  mouseUp?: () => void,
  handleConfirm?: () => void,
}

interface TableState {
  currentEl: JSX.Element,
  currentDay: number,
  timeLineWidth: number,
  courseContentWidth: number,
  contentItemWidth: number,
  movedPos: object,
  nearTime: number,
  visible: boolean,
}

declare class timeTable extends React.Component<TableProps, TableState> {
    mouseDown: (e: HTMLElementEventMap) => void;
    mouseMove: (e: HTMLElementEventMap) => void;
    mouseUp: (e: HTMLElementEventMap, el: HTMLElement) => void;
    ContextMenu: (e) => void;
    renderBorderList: (MAX: number) => Array<JSX.Element>;
    renderWeek: () => Array<number>;
    checkPos: (nowPos: object, timePos: object, weekPos: object) => object;
    renderRadioList: () => Array<JSX.Element>;
    renderRectEl: (courseTables: object) => Array<JSX.Element>;
    handleOk: () => void;
    handleCancel: () => void;
    render(): JSX.Element
}

export default timeTable
