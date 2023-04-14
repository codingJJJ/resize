import ResizeTableHOC from "./components/ResizeTable";
import React from "react";
import { Table } from "antd";

const ResizeTable = ResizeTableHOC(Table);

const Demo1 = () => {
  const data = [
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
  ];
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "Action",
      key: "action",
      render: () => <a>Delete</a>,
    },
  ];

  return <ResizeTable columns={columns} dataSource={data} />;
};

export default Demo1;
