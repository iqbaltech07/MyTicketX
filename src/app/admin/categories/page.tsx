// src/app/admin/categories/page.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import CategoryTable from "~/components/admin/CategoryTable";
import CategoryFormModal from "~/components/admin/CategoryFormModal";
import PageContainer from "~/components/layouts/PageContainer";

const AdminCategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manajemen Kategori
          </h1>
          <p className="mt-1 text-zinc-400">
            Kelola kategori untuk event Anda.
          </p>
        </div>
        <Button 
          className="bg-[#5AE3A8] text-zinc-900 font-bold"
          onPress={handleOpenModal}
        >
          <FaPlus />
          Tambah Kategori
        </Button>
      </div>

      <div className="mt-8">
        <CategoryTable />
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Tambah Kategori Baru"
      />
    </PageContainer>
  );
};

export default AdminCategoriesPage;