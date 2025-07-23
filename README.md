# Deskripsi Proyek
  Website ini merupakan aplikasi berbasis React yang menampilkan berbagai informasi seputar anime seperti daftar anime populer, yang akan datang, dan yang sedang tayang. pengguna juga dapat melakukan pencarian anime dan melihat detail setiap anime. 

# API yang digunakan
  website ini menggunakan Jikan appi v4
  https://api.jikan.moe/v4
  
# Fitur-Fitur Utama
- pencarian anime berdasarkan judul
- daftar anime popular
- daftar anime yang akan datang (upcoming)
- daftar anime yang sedang tayang (airing)
- halaman detail anime

# Struktur Halaman dan Routing
- / : komponen <Homepage />
      sub-komponen : - <Popular /> : daftar anime populer
                     - <Upcoming /> : anime yang akan datang
                     - <Airing /> : anime yang sedang tayang
- /anime/:id : komponen <AnimeDetail />
               Menampilkan data detail anime berdasar id di URL
- Sidebar (pencarian)
  Komponen global (<Sidebar />) yang selalu ada untuk menangani input pencarian.

# Cara Menjalankan Secara Lokal
  1. Clone repository 
     git clone https://github.com/username/website_anime_uas.git
  2. Masuk ke folder proyek
     cd website_anime_uas
  3. Install semua dependency
     npm install
  4. Jalankan aplikasi
     npm start

# link Demo
https://kuro-play-anime-tcj5.vercel.app/



  
