"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const categories = [
  { id: 1, name: "Musik", eventCount: 5 },
  { id: 2, name: "Olahraga", eventCount: 3 },
  { id: 3, name: "Seminar", eventCount: 8 },
  { id: 4, name: "Seni & Teater", eventCount: 4 },
];

const columns = [
  { name: "NAMA KATEGORI", uid: "name" },
  { name: "JUMLAH EVENT", uid: "eventCount" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CategoryTable() {

  const renderCell = React.useCallback((category: typeof categories[0], columnKey: React.Key) => {
    const cellValue = category[columnKey as keyof typeof category];

    switch (columnKey) {
      case "name":
        return <p className="font-bold">{cellValue}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit kategori">
              <Button isIconOnly size="sm" variant="light">
                <FaEdit className="text-lg text-zinc-400" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Hapus kategori">
               <Button isIconOnly size="sm" variant="light" color="danger">
                <FaTrashAlt className="text-lg" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Tabel Kategori" className="bg-[#202027] border border-zinc-800 rounded-xl">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className="bg-zinc-800 text-white">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={categories}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className="text-black">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}