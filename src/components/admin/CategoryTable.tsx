"use client";

import React, { useCallback, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axiosInstance from "~/libs/axiosInstance";

type Category = {
  id: string;
  name: string;
  _count: {
    events: number;
  };
};

type CategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDeleteSuccess: () => void;
};

const columns = [
  { name: "NAMA KATEGORI", uid: "name" },
  { name: "JUMLAH EVENT", uid: "eventCount" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CategoryTable({ categories, onEdit, onDeleteSuccess }: CategoryTableProps) {

  const handleDelete = useCallback(
    async (categoryId: string) => {
      if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        try {
          await axiosInstance.delete(`/categories/${categoryId}`);
          onDeleteSuccess();
        } catch (error: any) {
          alert(
            error.response?.data?.message ||
            "Gagal menghapus kategori. Silakan coba lagi."
          );
        }
      }
    },
    [onDeleteSuccess]
  );

  const renderCell = React.useCallback((category: Category, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <p className="font-bold text-black">{category.name}</p>;
      case "eventCount":
        return <p className="text-zinc-900">{category._count.events}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit kategori" classNames={{ content: "!text-black" }}>
              <Button isIconOnly size="sm" variant="light" onPress={() => onEdit(category)}>
                <FaEdit className="text-lg text-zinc-400" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Hapus kategori">
              <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => handleDelete(category.id)}>
                <FaTrashAlt className="text-lg" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, [onEdit, onDeleteSuccess]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <Table aria-label="Tabel Kategori" className="bg-[#202027] border border-zinc-800 rounded-xl">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className="bg-zinc-800 text-white">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={memoizedCategories} emptyContent={"Belum ada kategori."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}