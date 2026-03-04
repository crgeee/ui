import { cn } from '../utils/cn';
import { Chip } from './Chip';

export interface ChipGroupProps<T extends string> {
  label?: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}

export function ChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: ChipGroupProps<T>) {
  return (
    <div className={cn('flex items-center gap-1 overflow-x-auto flex-shrink-0', className)}>
      {label && (
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mr-1 flex-shrink-0">
          {label}
        </span>
      )}
      {options.map((o) => (
        <Chip key={o.value} active={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </Chip>
      ))}
    </div>
  );
}
