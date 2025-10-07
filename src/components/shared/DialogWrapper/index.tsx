"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";

interface IProps {
    title: string;
    label: string;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    close: () => void;
}

export function DialogWrapper({
    title,
    label,
    children,
    open,
    onOpenChange,
}: IProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[475px]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        close(); // closes after submit
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">{children}</div>

                    <DialogFooter className="flex justify-end gap-2">

                        <Button type="submit">{label}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
