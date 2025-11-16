import Button from '../../ui/button';

export default function DeleteCategoryConfirm({
  categoryName,
  onConfirm,
  onCancel,
}: {
  categoryName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-white">
          {categoryName}
        </span>
        ?
      </p>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-border-dark hover:bg-gray-800"
        >
          Cancel
        </button>

        <Button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
