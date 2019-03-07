/*!

 * 思路：先确认表格如何组成
 * 1：头部 部分， 获取当前的时间来寻找当前这周的周一的时间戳
 * 2：表格渲染分为两步：
 *    1： 渲染每行的边框，因为前面定好了每个box的高为60，分4行 所以每条线间隔应为15px，有15个时间所以需要渲染60根
 *    2： 每列的左右边框为和头部同等宽度与wrap同等高度的7列元素，渲染此元素时同时储存了每个的left值和当前的时间与第一步做了同样的操作
 * 3: 课程的渲染
 *    1：
 *
 *
 * 所需参数描述：
 *   courseTables：对象，接受的为 以星期为key，value为那天的数据数组
 *   courseType: 数组，描述课程表时间所用
 *   loading: 表格加载的状态
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
 *    如需设置表格的宽高，请自行修改demo内的代码， 之后运行 yarn build 即可使用

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
