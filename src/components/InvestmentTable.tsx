import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ComputedInvestment } from '../types';

const columnHelper = createColumnHelper<ComputedInvestment>();

const columns = [
  columnHelper.accessor('stock_code', {
    header: 'Stock',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('investment_type', {
    header: 'Type',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('stock_quantity', {
    header: 'Qty',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('investment_value_USD', {
    header: 'Value (USD)',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('investment_value_INR', {
    header: 'Value (INR)',
    cell: info => `₹${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('total_dividend_USD', {
    header: 'Dividends',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
];

interface Props {
  data: ComputedInvestment[];
}

export function InvestmentTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-sm text-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}