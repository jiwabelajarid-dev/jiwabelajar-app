// Definisikan struktur data untuk sebuah cerita
export interface Story {
  id: number;
  created_at: string;
  title: string;
  content: string;
  user_id: string | null;
  likes: number;
}
