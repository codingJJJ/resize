# 支持拖拽 column 列宽组件

- Antd Table

```jsx
import ResizeTableHOC from "./components/ResizeTable";
import React from "react";
import { Table } from "antd";

const ResizeTable = ResizeTableHOC(Table);

const Demo = () => {
  // ...
  return <ResizeTable />;
};
```

- ProTable

```jsx
import ResizeTableHOC from "./components/ResizeTable";
import React from "react";
import ProTable from "@ant-design/pro-table";

const ResizeTable = ResizeTableHOC(ProTable);

const Demo = () => {
  // ...
  return <ResizeTable />;
};
```
