import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// fungsi upload gambar
export const uploadAvatar = async (file: File, userId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  // upload ke bucket
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  // ambil URL publik
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
};
