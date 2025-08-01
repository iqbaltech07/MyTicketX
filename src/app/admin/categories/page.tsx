"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Skeleton } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import CategoryTable from "~/components/admin/CategoryTable";
import CategoryFormModal from "~/components/admin/CategoryFormModal";
import axiosInstance from "~/libs/axiosInstance";

type Category = {
    id: string;
    name: string;
    _count: {
        events: number;
    };
};

const AdminCategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSuccess = () => {
    fetchCategories();
    handleCloseModal();
  };

  return (
    <div className="h-screen">
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
          onPress={() => handleOpenModal()}
        >
          <FaPlus />
          Tambah Kategori
        </Button>
      </div>

      <div className="mt-8">
        {loading ? (
            <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
                <Skeleton className="h-12 w-full rounded-lg bg-zinc-800" />
            </div>
        ) : (
            <CategoryTable 
              categories={categories} 
              onEdit={handleOpenModal}
              onDeleteSuccess={fetchCategories}
            />
        )}
      </div>

      {isModalOpen && (
        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          category={editingCategory}
        />
      )}
    </div>
  );
};

export default AdminCategoriesPage;