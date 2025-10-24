import Link from "next/link";
import Image from "next/image";
import Logo from "../Header/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { headerData } from "../Header/Navigation/menuData";

const footer = () => {
  return (
    <footer className="bg-deepSlate py-10">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* DIUBAH: Menghapus 'sm:grid-cols-2' karena Anda hanya minta 
          perilaku mobile (grid-cols-1) dan desktop (lg:grid-cols-12).
        */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-16 lg:grid-cols-12 xl:gap-x-8">
          {/* DIUBAH: Disederhanakan. Cukup 'lg:col-span-4'.
            Di mobile, ini akan otomatis mengambil 1 kolom penuh.
          */}
          <div className='lg:col-span-4'>
            <Logo />
            <div className='flex items-center gap-4'>
              <Link href="https://www.tiktok.com/@jiwabelajar.id" className='hover:text-primary text-black text-3xl'>
                <Icon
                  icon="ic:baseline-tiktok"
                />
              </Link>
              <Link href="https://x.com/Berjiwabelajar?t=9mSBIGcdAUDWQGz4h_fnjA&s=08 " className='hover:text-primary text-black text-3xl'>
                <Icon
                  icon="ri:twitter-x-fill"
                />
              </Link>
              <Link href="https://www.instagram.com/jiwabelajar.id/" className='hover:text-primary text-black text-3xl'>
                <Icon
                  icon="tabler:brand-instagram"
                />
              </Link>
            </div>
          </div>
          {/* DIUBAH: Disederhanakan. Cukup 'lg:col-span-2'.
          */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Links</h3>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="mb-2 text-black/50 hover:text-primary w-fit">
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* DIUBAH: Disederhanakan. Cukup 'lg:col-span-2'.
          */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Other</h3>
            <ul>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <Link href="/KeluhKesah">
                  Keluh Kesah
                </Link>
              </li>
              {/* ... item lainnya ... */}
            </ul>
          </div>
          {/* DIUBAH: Disederhanakan. Cukup 'lg:col-span-4'.
          */}
          <div className='lg:col-span-4'>
            {/* ... item lainnya ... */}
            <div className="flex gap-2 mt-10">
              <Icon
                icon="tabler:phone"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">+62 --</h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon="mdi:email-outline"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">jiwabelajar.id@gmail.com</h5>
            </div>
          </div>
        </div>

        <div className='mt-10 text-center'>
          <h4 className='text-black/50 text-sm font-normal'>
            ©2025 Agency. All Rights Reserved by jiwabelajar.id
          </h4>
        </div>
      </div>
    </footer>
  )
}

export default footer;
