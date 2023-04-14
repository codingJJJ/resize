import ResizeTableHOC from "./components/ResizeTable";
import ProTable from "@ant-design/pro-table";
import React from "react";

const ResizeProTable = ResizeTableHOC(ProTable);

class Demo1 extends React.Component {
  state = {
    data: [
      {
        key: 0,
        date: "2018-02-11",
        amount: 120,
        type: "xxxxxxxx",
        note: "transfer",
      },
      {
        key: 1,
        date: "2018-03-11",
        amount: 243,
        type: "income",
        note: "transfer",
      },
      {
        key: 2,
        date: "2018-04-11",
        amount: 98,
        type: "income",
        note: "transfer",
      },
    ],
    columns: [
      {
        title: "Date",
        dataIndex: "date",
        width: 200,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: 100,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: "Type",
        dataIndex: "type",
        width: 100,
      },
      {
        title: "Note",
        dataIndex: "note",
        width: 100,
      },
      {
        title: "Action",
        key: "action",
        render: () => <a>Delete</a>,
      },
    ],
  };
  render() {
    return (
      <ResizeProTable
        id={`id-pro-table-name`}
        style={{ minHeight: 500 }}
        showSorterTooltip={false}
        recordCreatorProps={false}
        className={"table-auto common-table"}
        toolBarRender={false}
        columns={this.state.columns}
        // scroll={{ x: 1200 }}
        dataSource={this.state.data}
        rowKey="sfid"
        search={false}
        toolbar={false}
        options={{
          setting: {
            draggable: true,
            checkable: true,
            checkedReset: false,
            extra: [<a key="confirm">confirm</a>],
          },
        }}
      />
    );
  }
}

// const Demo1 = () => {
//   const data = [
//     {
//       key: 0,
//       date: "2018-02-11",
//       amount: 120,
//       type: "xxxxxxxx",
//       note: "transfer",
//     },
//     {
//       key: 1,
//       date: "2018-03-11",
//       amount: 243,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 2,
//       date: "2018-04-11",
//       amount: 98,
//       type: "income",
//       note: "transfer",
//     },
//   ];
//   const ;

//   return (
//     <ResizeProTable
//       id={`id-pro-table-name`}
//       style={{ minHeight: 500 }}
//       showSorterTooltip={false}
//       recordCreatorProps={false}
//       className={"table-auto common-table"}
//       toolBarRender={false}
//       columns={columns}
//       // scroll={{ x: 1200 }}
//       dataSource={data}
//       rowKey="sfid"
//       search={false}
//       toolbar={false}
//       options={{
//         setting: {
//           draggable: true,
//           checkable: true,
//           checkedReset: false,
//           extra: [<a key="confirm">confirm</a>],
//         },
//       }}
//     />
//   );
// };

export default Demo1;
