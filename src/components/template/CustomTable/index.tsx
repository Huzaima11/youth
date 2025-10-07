// Import Dependencies
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
} from "@tanstack/react-table";
import { Fragment, memo } from "react";

// Local Imports
import { Card, Table, THead, TBody, Th, Tr, Td, Checkbox } from "@/components/ui";
import { PaginationSection } from "@/components/shared/table/PaginationSection";

// ----------------------------------------------------------------------

type Order = {
    order_id: number;
    customer: string;
    status: string;
    total: number;
};

function OrdersDatatableV2Component() {
    // Dummy data
    const data: Order[] = [
        { order_id: 1, customer: "John Doe", status: "Pending", total: 120 },
        { order_id: 2, customer: "Jane Smith", status: "Completed", total: 250 },
        { order_id: 3, customer: "Alice Johnson", status: "Shipped", total: 175 },
    ];

    // Dummy columns
    const columns: ColumnDef<Order>[] = [
        {
            id: "select",
            header: () => <Checkbox />,
            cell: () => <Checkbox />,
        },
        {
            accessorKey: "order_id",
            header: "Order ID",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "customer",
            header: "Customer",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "total",
            header: "Total ($)",
            cell: (info) => `$${info.getValue()}`,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card className="relative mt-3 flex grow flex-col border">
            {/* 👇 This wrapper allows scrolling but doesn’t create a stacking context */}
            <div className="min-w-full grow">
                <div className="overflow-x-auto">
                    <Table
                        hoverable
                        dense={false}
                        sticky={false}
                        className="w-full text-left rtl:text-right"
                    >
                        <THead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th
                                            key={header.id}
                                            className="dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </THead>
                        <TBody>
                            {table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <Tr className="dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200">
                                        {row.getVisibleCells().map((cell) => (
                                            <Td
                                                key={cell.id}
                                                className="relative dark:bg-dark-900"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        ))}
                                    </Tr>
                                </Fragment>
                            ))}
                        </TBody>
                    </Table>
                </div>
            </div>

            <div className="px-4 pb-4 sm:px-5 sm:pt-4">
                <PaginationSection />
            </div>
        </Card>
    );
}

const OrdersDatatableV2 = memo(OrdersDatatableV2Component);
export default OrdersDatatableV2;
