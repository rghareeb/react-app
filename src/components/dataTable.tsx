// components/DataTable.tsx
"use client";

import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => React.ReactNode);
  className?: string;
}

interface Action<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (row: T) => void;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  actions = [],
}: DataTableProps<T>) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {actions.map((action, i) => (
            <th
              key={`action-${i}`}
              className="px-4 py-2 border border-gray-300 font-semibold text-center"
            >
              {action.label}
            </th>
          ))}
          {columns.map((col, i) => (
            <th
              key={i}
              className={`px-4 py-2 border border-gray-300 font-semibold ${col.className || ""}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} className="hover:bg-gray-50 transition">
            {actions.map((action, i) => (
              <td
                key={`action-cell-${i}`}
                className="px-4 py-2 border border-gray-300 text-center"
              >
                <button
                  onClick={() => action.onClick(row)}
                  className={`p-2 rounded-md transition ${action.className}`}
                >
                  {action.icon}
                </button>
              </td>
            ))}
            {columns.map((col, i) => (
              <td
                key={`col-cell-${i}`}
                className={`px-4 py-2 border border-gray-300 ${col.className || ""}`}
              >
                {typeof col.accessor === "function"
                  ? col.accessor(row, index)
                  : (row[col.accessor] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
