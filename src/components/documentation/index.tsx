// src/components/documentation/index.tsx

"use client";
import React from 'react';
import { Icon } from '@iconify/react'; // Kita akan menggunakan ikon

// Data untuk setiap kartu fitur agar mudah dikelola
const featuresData = [
    {
        icon: "mdi:bulletin-board",
        title: "Mading Suara",
        description: "Bagikan keluh kesah dan ceritamu secara anonim di ruang yang aman dan didengar oleh komunitas yang peduli."
    },
    {
        icon: "mdi:account-heart-outline",
        title: "Konseling Profesional",
        description: "Jadwalkan sesi konseling pribadi dengan psikolog berpengalaman untuk mendapatkan dukungan dan solusi yang tepat."
    },
    {
        icon: "mdi:clipboard-text-outline",
        title: "Test Psikologi",
        description: "Kenali dirimu lebih dalam melalui berbagai tes psikologi online yang dirancang untuk membantumu memahami kepribadian dan potensimu."
    }
];

// Pastikan Anda mengekspor komponennya dengan benar
export const Documentation = () => {
    return (
        <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* 1. Bagian Judul Utama (Hero) */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Fitur Jiwabelajar.id
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Semua yang Anda butuhkan untuk mendukung kesehatan mental dan pengembangan diri Anda.
                    </p>
                </div>

                {/* 2. Bagian Grid untuk Kartu Fitur */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuresData.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                                <Icon icon={feature.icon} className="h-6 w-6" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-base text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};