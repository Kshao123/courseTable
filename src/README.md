
<h1 align="center">Course Table</h1>


[![](https://cdn-images-1.medium.com/max/2000/1*NIlj0-TdLMbo_hzSBP8tmg.png)](http://ant.design)


## ✨ Features

- 可移动的 课程表
- 代码简单，欢迎优化



| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 📦 Install

```bash
npm i course-table
npm i course-table -S
```


## 🔨 Usage

```jsx
import CourseTable from 'course-table';

const courseTables = {
      1: [
        {
          startTime:1551920827000,
          endTime:1551924427000,
          stuNameList: ['123'],
          teaName: '312'
        }
      ]
    };

const handleConfirm = (data,handleOK) => {
    handleOK()
};

ReactDOM.render(
    <CourseTable 
        courseTables={courseTables}
        handleConfirm={handleConfirm}
    />, 
    mountNode);
```
