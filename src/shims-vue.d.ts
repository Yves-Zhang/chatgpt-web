/*
 * @Author: yvesyfzhang
 * @Date: 2022-04-07 13:40:54
 * @LastEditors: yvesyfzhang
 * @LastEditTime: 2022-04-07 13:50:00
 * @Description: file content
 * @FilePath: /temptate/shims-vue.d.ts
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}