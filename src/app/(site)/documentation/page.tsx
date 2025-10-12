// src/app/(site)/documentation/page.tsx
import { Documentation } from "@/components/documentation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fitur | Jiwabelajar.id",
};

export default function Page() {
    return (
        <>
            <Documentation/>
        </>
    );
};