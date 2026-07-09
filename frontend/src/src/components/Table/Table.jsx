export default function Table({
  columns,
  data,
  actions,
  emptyMessage = "No existen registros.",
}) {
  if (!data.length) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left"
              >
                {column.title}
              </th>
            ))}

            {actions && (
              <th className="px-4 py-3 text-center">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row._id}
              className="border-t"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>
              ))}

              {actions && (
                <td className="px-4 py-3 text-center">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}