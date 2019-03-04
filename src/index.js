import React, { PureComponent } from 'react';
import { DatePicker } from 'antd'
import styles from './style/timeTables.less'
// import styles from './style/index.css'

class CourseTable extends PureComponent {
    componentDidMount() {
        console.log(123)
    }

    render() {
        return(
            <div className={styles.coursesTable}>
                new TimeTables
                <DatePicker />
            </div>
        )
    }
}
export default CourseTable;
