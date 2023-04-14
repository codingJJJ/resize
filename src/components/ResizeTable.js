import React, { forwardRef, useState } from "react";
import { Resizable } from "react-resizable";

import styled from "styled-components";

const Th = styled.th`
  position: relative;
  background-clip: padding-box;
`;

const ResizableHandle = styled.span`
  position: absolute;
  right: -5px;
  bottom: 0;
  z-index: 1;
  width: 10px;
  height: 100%;
  cursor: col-resize;
`;

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <ResizableHandle
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <Th {...restProps} />
    </Resizable>
  );
};

const ResizeTableHOC = (TableFC) =>
  forwardRef((props, ref) => {
    const { columns: cls, ...restProps } = props;
    const [columns, setColumns] = useState(cls);
    const handleResize =
      (index) =>
      (_, { size }) => {
        const newColumns = [...columns];
        newColumns[index] = {
          ...newColumns[index],
          width: size.width,
        };
        setColumns(newColumns);
      };

    const mergeColumns = columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }));

    return (
      <TableFC
        ref={ref}
        components={{
          ...(props?.components || {}),
          header: {
            ...(props?.components?.header || {}),
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        {...restProps}
      />
    );
  });

export default ResizeTableHOC;
