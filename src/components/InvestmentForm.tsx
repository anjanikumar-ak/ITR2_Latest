import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Investment } from '../types';

const investmentSchema = z.object({
  investments: z.array(z.object({
    stock_code: z.string().min(1, 'Required'),
    investment_type: z.enum(['espp', 'RSU']),
    stock_quantity: z.number().min(1, 'Min 1'),
    stock_price: z.string().min(1, 'Required'),
    investment_date: z.string().min(1, 'Required'),
  }))
});

type InvestmentFormData = z.infer<typeof investmentSchema>;

interface Props {
  onSubmit: (data: Investment[]) => void;
  isLoading: boolean;
}

export function InvestmentForm({ onSubmit, isLoading }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investments: [{ stock_code: '', investment_type: 'espp', stock_quantity: 0, stock_price: '', investment_date: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'investments'
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.investments))} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <input
                {...register(`investments.${index}.stock_code`)}
                placeholder="Stock Code"
                className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
              />
              {errors.investments?.[index]?.stock_code && (
                <span className="text-xs text-red-500">{errors.investments[index]?.stock_code?.message}</span>
              )}
            </div>

            <div>
              <select
                {...register(`investments.${index}.investment_type`)}
                className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
              >
                <option value="espp">ESPP</option>
                <option value="RSU">RSU</option>
              </select>
            </div>

            <div>
              <input
                type="number"
                {...register(`investments.${index}.stock_quantity`, { valueAsNumber: true })}
                placeholder="Quantity"
                className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
              />
              {errors.investments?.[index]?.stock_quantity && (
                <span className="text-xs text-red-500">{errors.investments[index]?.stock_quantity?.message}</span>
              )}
            </div>

            <div>
              <input
                {...register(`investments.${index}.stock_price`)}
                placeholder="Price ($)"
                className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                {...register(`investments.${index}.investment_date`)}
                className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => append({ stock_code: '', investment_type: 'espp', stock_quantity: 0, stock_price: '', investment_date: '' })}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          disabled={isLoading}
        >
          + Add Investment
        </button>

        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Computing...' : 'Calculate'}
        </button>
      </div>
    </form>
  );
}