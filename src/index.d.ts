import * as React from 'react';

export interface TableProps {
    timetables?: any[];
}

declare class CourseTable extends React.PureComponent<TableProps, any> {}

export default CourseTable
