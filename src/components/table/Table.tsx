import Button from "../button/Button";

interface IColumn<T> {
  header: string;
  accessor: keyof T;
}

interface ITableProps<T> {
  columns: IColumn<T>[];
  data: T[];
  onDetails?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function Table<T>({
  columns,
  data,
  onDetails,
  onDelete,
}: ITableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
      <table className="min-w-full text-sm text-white bg-[#1B2A33]">
        <thead className="bg-[#24343d]">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-3 text-left font-semibold text-gray-100"
              >
                {col.header}
              </th>
            ))}

            {onDetails && (
              <th className="px-4 py-3 text-left font-semibold text-gray-100">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-[#2c3e50] transition-colors duration-200"
            >
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-2">
                  {String(row[col.accessor])}
                </td>
              ))}
              {(onDetails || onDelete) && (
                <td className="flex px-4 py-2 space-x-2">
                  {onDelete && (
                    <Button
                      className="py-1 px-3"
                      variant="danger"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </Button>
                  )}
                  {onDetails && (
                    <Button
                      className="py-1 px-5"
                      variant="secondary"
                      onClick={() => onDetails(row)}
                    >
                      Details
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
