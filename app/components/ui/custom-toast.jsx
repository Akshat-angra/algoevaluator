"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { toast as sonnerToast } from "sonner";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full font-medium",
    {
        variants: {
            variant: {
                default: "border-border bg-background text-foreground",
                success:
                    "border-green-500/20 bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300 dark:border-green-500/30",
                info:
                    "border-blue-500/20 bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-500/30",
                warning:
                    "border-amber-500/20 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-500/30",
                error:
                    "border-red-500/20 bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 dark:border-red-500/30",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export function CustomToaster() {
    return (
        <SonnerToaster
            position="top-right"
            toastOptions={{
                classNames: {
                    toast: "group font-medium text-sm p-4 rounded-md shadow-lg border",
                    title: "text-base font-semibold",
                    description: "text-sm opacity-90 mt-1",
                    actionButton: "bg-primary text-primary-foreground",
                    cancelButton: "bg-muted text-muted-foreground",
                    error: "bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 border-red-500/20 dark:border-red-500/30",
                    success: "bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300 border-green-500/20 dark:border-green-500/30",
                    info: "bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30",
                    warning: "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-500/20 dark:border-amber-500/30",
                },
                closeButton: true,
                duration: 5000,
            }}
        />
    );
}

export const toast = {
    default: ({ title, description, action, className, duration }) =>
        sonnerToast(title, {
            description,
            action,
            duration: duration || 5000,
            className: cn(toastVariants({ variant: "default" }), className),
        }),
    success: ({ title, description, action, className, duration }) =>
        sonnerToast.success(title, {
            description,
            action,
            duration: duration || 5000,
            className: cn(toastVariants({ variant: "success" }), className),
        }),
    info: ({ title, description, action, className, duration }) =>
        sonnerToast.info(title, {
            description,
            action,
            duration: duration || 5000,
            className: cn(toastVariants({ variant: "info" }), className),
        }),
    warning: ({ title, description, action, className, duration }) =>
        sonnerToast.warning(title, {
            description,
            action,
            duration: duration || 5000,
            className: cn(toastVariants({ variant: "warning" }), className),
        }),
    error: ({ title, description, action, className, duration }) =>
        sonnerToast.error(title, {
            description,
            action,
            duration: duration || 5000,
            className: cn(toastVariants({ variant: "error" }), className),
        }),
    dismiss: sonnerToast.dismiss,
};
