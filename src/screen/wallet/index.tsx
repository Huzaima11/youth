"use client";
import React, { useState } from "react";
import Form from "./Form";
import { DialogWrapper } from "@/components/shared/DialogWrapper";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CollapsibleSearch } from "@/components/shared/CollapsibleSearch";
import CustomTable from "@/components/template/CustomTable";
import { Button } from "@/components/ui";


const Wallet = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="dark:text-dark-100 text-base font-medium tracking-wide text-gray-800">
                    Wallet Details
                </h2>

                <div className="flex items-center gap-3">
                    <CollapsibleSearch placeholder="Search here..." />
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="uppercase flex items-center gap-2"
                    >
                        Add Balance
                    </Button>

                </div>
            </div>

            {/* Table */}
            <CustomTable />

            <DialogWrapper
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Add Amount"
                label="Add"
                close={() => setIsDialogOpen(false)}
            >
                <Form />
            </DialogWrapper>
        </div>
    );
};

export default Wallet;
