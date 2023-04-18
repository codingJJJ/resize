import React, { forwardRef, useRef, useState } from "react";
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
  return (
    <Resizable
      width={width || 20}
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
  forwardRef(function Wrap(props, ref) {
    const { columns: cls, ...restProps } = props;
    const [columns, setColumns] = useState(cls);
    const endIndexRef = useRef();
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

    const onMouseMove = (e, index) => {
      const newColumns = [...columns];
      if (!newColumns[index].width) {
        newColumns[index] = {
          ...newColumns[index],
          width: findTH(e.target).clientWidth,
        };
        setColumns(newColumns);
      }
    };

    const columnsIndexChange = (startIndex, endIndex) => {
      if (endIndex >= 0 && startIndex != endIndex) {
        var tempColumns = [...columns];
        var temp = tempColumns[startIndex];
        tempColumns?.splice(startIndex, 1);
        tempColumns?.splice(endIndex, 0, temp);
        setColumns(tempColumns);
      }
    };

    const dragEvent = {
      onDragEnd: (e) => {
        const startIndex = findTH(e.target).cellIndex;
        const endIndex = endIndexRef.current;
        if (startIndex !== endIndex) {
          columnsIndexChange(startIndex, endIndex);
        }
      },
      onDragEnter: (e) => {
        // 拖拽结束位置
        endIndexRef.current = findTH(e.target).cellIndex;
      },
      onDragOver: (e) => {
        if (e.preventDefault) {
          e.preventDefault();
          // 设置拖拽图标
          if (e.dataTransfer?.dropEffect) {
            e.dataTransfer.dropEffect = "move";
          }
        } else {
          e.returnValue = false;
        }
      },
    };

    const mergeColumns = columns.map((col, index) => ({
      ...col,
      title: (
        <div draggable={true} style={{ marginRight: 10 }} {...dragEvent}>
          {col.title}
        </div>
      ),
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
        onMouseMove: (e) => onMouseMove(e, index),
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

/**
 * 寻找当前元素的最近父级顶级节点
 */

function findTH(el) {
  let resEl = el;
  while (resEl.tagName !== "TH") {
    resEl = resEl.parentNode;
  }
  return resEl;
}
