import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, type Column } from '../../src/composed';

interface Row {
  id: string;
  name: string;
  count: number;
}

const columns: Column<Row>[] = [
  { key: 'name', header: 'Name', render: (r) => r.name },
  { key: 'count', header: 'Count', render: (r) => r.count },
];

const data: Row[] = [
  { id: '1', name: 'Alpha', count: 5 },
  { id: '2', name: 'Beta', count: 3 },
];

describe('DataTable', () => {
  it('renders headers and rows', () => {
    render(<DataTable columns={columns} data={data} keyExtractor={(r) => r.id} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows empty message', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={(r) => r.id}
        emptyMessage="Nothing here"
      />,
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('calls onRowClick', () => {
    const onClick = vi.fn();
    render(
      <DataTable columns={columns} data={data} keyExtractor={(r) => r.id} onRowClick={onClick} />,
    );
    fireEvent.click(screen.getByText('Alpha'));
    expect(onClick).toHaveBeenCalledWith(data[0]);
  });

  it('calls onRowClick on Enter key', () => {
    const onClick = vi.fn();
    render(
      <DataTable columns={columns} data={data} keyExtractor={(r) => r.id} onRowClick={onClick} />,
    );
    const row = screen.getByText('Alpha').closest('tr')!;
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledWith(data[0]);
  });

  it('calls onRowClick on Space key', () => {
    const onClick = vi.fn();
    render(
      <DataTable columns={columns} data={data} keyExtractor={(r) => r.id} onRowClick={onClick} />,
    );
    const row = screen.getByText('Alpha').closest('tr')!;
    fireEvent.keyDown(row, { key: ' ' });
    expect(onClick).toHaveBeenCalledWith(data[0]);
  });

  it('gives clickable rows role="button" and tabIndex', () => {
    const onClick = vi.fn();
    render(
      <DataTable columns={columns} data={data} keyExtractor={(r) => r.id} onRowClick={onClick} />,
    );
    const row = screen.getByText('Alpha').closest('tr')!;
    expect(row).toHaveAttribute('role', 'button');
    expect(row).toHaveAttribute('tabindex', '0');
  });
});
