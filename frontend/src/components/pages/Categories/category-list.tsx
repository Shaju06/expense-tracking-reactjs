import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCategories,
  useDeleteCategory,
} from '../../../api/categories';
import PageWrapper from '../../layout/page-wrapper';
import Button from '../../ui/button';
import Card from '../../ui/card';
import Modal from '../../ui/modal';
import DeleteCategoryConfirm from './delete-category-confirm';
import EditCategoryForm from './edit-category';

export default function CategoryList() {
  const { data: categories, isLoading } = useCategories();
  const deleteCategory = useDeleteCategory();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<any>(null);

  if (isLoading)
    return <p className="p-6 text-gray-400">Loading...</p>;

  const openEdit = (cat: any) => {
    setSelected(cat);
    setEditOpen(true);
  };

  const openDelete = (cat: any) => {
    setSelected(cat);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    deleteCategory.mutate(selected.id, {
      onSuccess: () => {
        setDeleteOpen(false);
      },
    });
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          Categories
        </h1>
        <Button
          onClick={() => {
            navigate('/add-category');
          }}
        >
          Add Category
        </Button>
      </div>

      <Card>
        {categories.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No categories yet.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="text-gray-400">
              <tr>
                <th className="py-3">Color</th>
                <th className="py-3">Name</th>
                <th className="py-3">Description</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat: any) => (
                <tr
                  key={cat.id}
                  className="border-t border-border-dark hover:bg-gray-900/20"
                >
                  <td className="py-3">
                    <span
                      className="inline-block w-6 h-6 rounded-md"
                      style={{ backgroundColor: cat.color }}
                    />
                  </td>

                  <td className="py-3 font-medium">
                    {cat.name}
                  </td>
                  <td className="py-3 text-gray-300">
                    {cat.description}
                  </td>
                  <td className="py-3 text-right space-x-4">
                    <button
                      className="text-indigo-400 hover:text-indigo-300"
                      onClick={() => openEdit(cat)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => openDelete(cat)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Modal
        title="Edit Category"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <EditCategoryForm
          category={selected}
          setEditOpen={setEditOpen}
        />
      </Modal>

      <Modal
        title="Delete Category"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <DeleteCategoryConfirm
          categoryName={selected?.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      </Modal>
    </PageWrapper>
  );
}
