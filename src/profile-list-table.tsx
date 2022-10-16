import React from "react";
import { Profile } from "simple-family-tree-model";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface ProfileList {
  profileList: Profile[];
}

const familyColumnHelper = createColumnHelper<Profile>();

export function ProfileListTable(props: ProfileList) {
  const [data, setData] = React.useState(() => [...props.profileList]);

  const columns = [
    // familyColumnHelper.accessor(row => row.profileId.itemLink, {
    //   id: 'profileId',
    //   cell: info => info.getValue(),
    //   header: () => <span>Profile Id</span>,
    //   footer: info => info.column.id,
    // }),
    familyColumnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    familyColumnHelper.accessor("birthDate", {
      cell: (info) => info.getValue(),
      header: () => <span>Birth Date</span>,
    }),
    familyColumnHelper.accessor("birthPlace", {
      cell: (info) => info.getValue(),
      header: () => <span>Birth Place</span>,
    }),
    familyColumnHelper.accessor("deathDate", {
      cell: (info) => info.getValue(),
      header: () => <span>Death Date</span>,
    }),
    familyColumnHelper.accessor("deathPlace", {
      cell: (info) => info.getValue(),
      header: () => <span>Death Place</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
