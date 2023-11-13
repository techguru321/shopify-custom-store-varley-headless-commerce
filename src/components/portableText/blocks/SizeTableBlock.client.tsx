import {useState} from 'react';
import Heading from '../../global/Heading.client';
import {Switch} from '@headlessui/react';

export default function SizeTableBlock({node}) {
  const [tableData, setTableData] = useState(node.tables[0]);
  const toggleOptions = node.tables.map((table: any) => table.unit);
  const [enabled, setEnabled] = useState(false);
  const handleToggle = () => {
    setEnabled(!enabled);
    setTableData(!enabled ? node.tables[1] : node.tables[0]);
  }
  return (
    <div className="mx-auto  max-w-[1240px]">
      <div className="mt-7.5 mb-5 flex justify-between">
        <Heading item={node.info[0]} />
        <div className="flex items-center space-x-[10px]">
          <span
            className={`${
              enabled ? 'text-darkGray' : 'text-black'
            } font-nhaasMd text-md`}
          >
            {toggleOptions[0].toUpperCase()}
          </span>
          <Switch
            checked={enabled}
            onChange={handleToggle}
            className="relative inline-flex h-4 w-[50px] items-center rounded-[34px] bg-[#5b5d62]"
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-[22px]' : 'translate-x-0'
              } inline-block h-[28px] w-[28px] transform rounded-full border-[2px] bg-white transition `}
            />
          </Switch>
          <span
            className={`${
              !enabled ? 'text-darkGray' : 'text-black'
            } font-nhaasMd text-md`}
          >
            {toggleOptions[1].toUpperCase()}
          </span>
        </div>
      </div>
      <table className="w-full">
        {tableData.table.rows.map((row: any, index: number) => {
          const cols = new Array(tableData.table.rows[0].cells.length);
          return (
            <tr key={row.id}>
              {[...cols.keys()].map((col: number) => {
                if (col < row.cells.length) {
                  const cell = row.cells[col];
                  return (
                    <>
                      {index === 0 && (
                        <th
                          key={col}
                          className="min-w-25 h-[50px] border-b border-lightGrey2 p-[7px] text-center font-nhaasReg text-md"
                        >
                          {cell}
                        </th>
                      )}
                      {index > 0 && (
                        <td
                          key={col}
                          className="min-w-25 h-[50px] border-b border-lightGrey2 p-[7px] text-center font-nhaasReg text-[15px]"
                        >
                          {cell}
                        </td>
                      )}
                    </>
                  );
                } else {
                  return (
                    <td
                      className="h-[50px] border-b border-lightGrey2 p-[7px] font-nhaasReg text-[15px]"
                      key={col}
                    ></td>
                  );
                }
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
