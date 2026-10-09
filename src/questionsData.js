// Bank Pertanyaan 4 Dimensi School Well-being & Respon Fasilitator Digital

export const DIMENSIONS = {
  health: {
    id: 'health',
    name: 'HEALTH',
    label: 'Kesehatan & Energi Diri',
    color: '#ef4444',
    bgLight: 'bg-red-500/10',
    border: 'border-red-500',
    text: 'text-red-400',
    icon: '❤️',
    description: 'Perasaan hati, energi tubuh, kebugaran fisik, dan kenyamanan dirimu hari ini.',
  },
  having: {
    id: 'having',
    name: 'HAVING',
    label: 'Kondisi & Fasilitas Sekolah',
    color: '#fbbf24',
    bgLight: 'bg-amber-500/10',
    border: 'border-amber-400',
    text: 'text-amber-300',
    icon: '🏫',
    description: 'Kenyamanan kelas, kebersihan, fasilitas sekolah, dan rasa aman di lingkunganmu.',
  },
  loving: {
    id: 'loving',
    name: 'LOVING',
    label: 'Pertemanan & Kebersamaan',
    color: '#22c55e',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    icon: '🤝',
    description: 'Hubungan dengan sahabat, saling tolong menolong, dan rasa diterima di kelas.',
  },
  being: {
    id: 'being',
    name: 'BEING',
    label: 'Potensi & Percaya Diri',
    color: '#3b82f6',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500',
    text: 'text-blue-400',
    icon: '⭐',
    description: 'Peluang berkarya, berani berekspresi, rasa percaya diri, dan mencoba hal baru.',
  },
};

export const QUESTIONS_BY_DIMENSION = {
  health: [
    {
      id: 'h1',
      question: 'Bagaimana kondisi energi dan semangat tubuhmu di sekolah hari ini?',
      options: [
        { text: 'Penuh energi & siap beraktivitas ceria! ⚡', type: 'positive', feedback: 'Luar biasa! Energi positifmu menghangatkan seluruh ruangan kelas hari ini! ✨' },
        { text: 'Cukup nyaman dan santai menikmati hari 😊', type: 'positive', feedback: 'Bagus sekali! Ketenangan hati membuat belajar jadi lebih menyenangkan. 🌿' },
        { text: 'Agak mengantuk atau pegal-pegal 🥱', type: 'recovery', feedback: 'Terima kasih sudah jujur ya. Tubuhmu sedang memberi sinyal butuh rehat sejenak. 💙' },
        { text: 'Merasa lelah dan butuh istirahat tenang 🛌', type: 'recovery', feedback: 'Wajar sekali merasa lelah. Kamu hebat sudah berusaha sebaik mungkin hari ini! 🤗' },
      ],
      followUp: {
        prompt: 'Langkah pemulihan apa yang paling ingin kamu lakukan sekarang?',
        choices: [
          'Minum segelas air putih segar 💧',
          'Tarik napas dalam 3 kali perlahan 🌬️',
          'Peregangan lengan dan pundak 5 detik 🤸',
          'Duduk rileks sambil memejamkan mata sejenak 😌'
        ]
      }
    },
    {
      id: 'h2',
      question: 'Saat menghadapi tugas atau ujian, apa yang biasanya kamu rasakan?',
      options: [
        { text: 'Tertantang dan penasaran ingin mencoba! 🎯', type: 'positive', feedback: 'Keren banget! Rasa ingin tahu adalah kunci kehebatanmu! 🚀' },
        { text: 'Tenang saja, berusaha semampunya 📘', type: 'positive', feedback: 'Sikap yang bijak! Usaha terbaik selalu patut dirayakan. 🌟' },
        { text: 'Agak deg-degan atau khawatir sedikit 💓', type: 'recovery', feedback: 'Deg-degan itu tanda kamu peduli! Tapi ingat, nilaimu tidak menentukan kebaikan hatimu. 🌈' },
        { text: 'Cepat lelah kalau terlalu tegang 😣', type: 'recovery', feedback: 'Kamu tidak sendiri! Tarik napas, semua bisa dihadapi selangkah demi selangkah. 🌸' },
      ],
      followUp: {
        prompt: 'Bagaimana caramu menenangkan hati saat deg-degan?',
        choices: [
          'Tersenyum dan berkata: "Aku pasti bisa berusaha!" 💬',
          'Mengobrol sebentar dengan teman sebangku 🗣️',
          'Minum air hangat / air putih 🍵',
          'Menggoyangkan jari tangan agar santai 🖐️'
        ]
      }
    },
    {
      id: 'h3',
      question: 'Bagaimana rasanya waktu istirahat sekolah bagimu hari ini?',
      options: [
        { text: 'Sangat seru, main bareng dan tertawa riang! 🎈', type: 'positive', feedback: 'Senang mendengarnya! Tawa ceria adalah vitamin terbaik bagi jiwa! 🌻' },
        { text: 'Makan bekal dengan nikmat & kenyang 🍱', type: 'positive', feedback: 'Mantap! Perut kenyang bikin otak segar dan siap fokus lagi! 🥪' },
        { text: 'Bingung mau ngapain, waktu terasa cepat ⏳', type: 'neutral', feedback: 'Tidak apa-apa, hari esok selalu ada kesempatan seru lainnya! ⛅' },
        { text: 'Merasa agak sepi atau ingin menyendiri 🕊️', type: 'recovery', feedback: 'Menikmati waktu tenang sendirian juga hal yang sangat menyejukkan hati. 🌼' },
      ],
      followUp: {
        prompt: 'Kegiatan istirahat mana yang paling bikin kamu bahagia?',
        choices: [
          'Duduk santai di bawah pohon rindang 🌳',
          'Berbagi camilan bareng sahabat 🍪',
          'Membaca komik atau buku seru 📖',
          'Melangkah jalan-jalan keliling koridor 🚶'
        ]
      }
    }
  ],
  having: [
    {
      id: 'hv1',
      question: 'Bagaimana kenyamanan ruang kelas dan meja belajarmu hari ini?',
      options: [
        { text: 'Sangat bersih, rapi, dan sejuk! 🍃', type: 'positive', feedback: 'Wah hebat! Kelas yang bersih bikin kita betah belajar seharian! 🧹✨' },
        { text: 'Cukup nyaman untuk menyimak pelajaran 📖', type: 'positive', feedback: 'Bagus! Ruang yang tenang membantu kita lebih mudah memahami materi. 💡' },
        { text: 'Agak gerah atau bising sedikit ☀️', type: 'recovery', feedback: 'Terima kasih masukannya! Mengatur sirkulasi udara bisa membantu ya. 🪟' },
        { text: 'Meja agak berantakan atau sempit 📦', type: 'recovery', feedback: 'Sedikit merapikan barang bisa bikin pikiran langsung terasa lega lho! 🧺' },
      ],
      followUp: {
        prompt: 'Hal kecil apa yang bisa bikin kelasmu makin nyaman?',
        choices: [
          'Merapikan alat tulis ke dalam tempat pensil ✏️',
          'Membuang bungkus sampah ke tempatnya 🗑️',
          'Membuka jendela agar udara segar masuk 🪟',
          'Menyusun buku catatan dengan rapi 📚'
        ]
      }
    },
    {
      id: 'hv2',
      question: 'Fasilitas sekolah mana yang paling sering membuat harimu menyenangkan?',
      options: [
        { text: 'Perpustakaan dengan buku-buku menarik 📚', type: 'positive', feedback: 'Kutu buku sejati! Membaca membuka jendela ke dunia petualangan baru! 🧭' },
        { text: 'Lapangan olahraga untuk berlari bebas ⚽', type: 'positive', feedback: 'Asyik sekali! Menggerakkan badan bikin hati jadi gembira dan bugar! 🏃' },
        { text: 'Kantin sekolah dengan makanan favorit 🍛', type: 'positive', feedback: 'Yummy! Makanan enak dan teman ngobrol adalah kombinasi sempurna! 🍜' },
        { text: 'Taman sekolah atau sudut hijau yang asri 🌺', type: 'positive', feedback: 'Damai sekali ya! Warna hijau tanaman menyejukkan mata dan pikiran. 🌱' },
      ],
      followUp: {
        prompt: 'Bagaimana caramu menjaga fasilitas favoritmu itu?',
        choices: [
          'Mengembalikan barang ke tempat semula 🔄',
          'Tidak mencoret-coret meja atau dinding 🖍️',
          'Ikut merawat tanaman dan kebersihan 🌸',
          'Mengajak teman lain menjaga bersama 🤝'
        ]
      }
    },
    {
      id: 'hv3',
      question: 'Apakah kamu merasa aman dan terlindungi saat berada di lingkungan sekolah?',
      options: [
        { text: 'Sangat aman! Guru & teman selalu menjaga 🛡️', type: 'positive', feedback: 'Indah sekali! Sekolah yang aman adalah rumah kedua tempat kita tumbuh! 🏠' },
        { text: 'Merasa aman dan tahu tempat mencari bantuan 🤝', type: 'positive', feedback: 'Pintar! Mengetahui ke mana harus melapor membuat kita lebih percaya diri. 🌟' },
        { text: 'Kadang merasa cemas jika ada keributan 😣', type: 'recovery', feedback: 'Perasaanmu valid. Ingat kamu selalu berhak bercerita kepada guru terpercaya ya! 💛' },
        { text: 'Ingin lingkungan yang lebih ramah & adil ⚖️', type: 'recovery', feedback: 'Keinginan yang mulia! Kebaikan kecil yang kamu mulai bisa menular ke yang lain. 🕊️' },
      ],
      followUp: {
        prompt: 'Siapa sosok di sekolah yang paling membuatmu merasa aman?',
        choices: [
          'Wali kelas atau guru yang ramah 🧑‍🏫',
          'Sahabat setia di sampingku 👫',
          'Petugas keamanan / staf sekolah 👮',
          'Semua teman yang kompak dan saling jaga 🌟'
        ]
      }
    }
  ],
  loving: [
    {
      id: 'l1',
      question: 'Hal baik apa yang kamu rasakan dari teman-temanmu di sekolah?',
      options: [
        { text: 'Mereka mengajakku tertawa dan bermain bersama! 😄', type: 'positive', feedback: 'Betapa indahnya pertemanan! Sahabat yang tulus adalah harta berharga! 💎' },
        { text: 'Ada teman yang mau mendengarkan ceritaku 👂', type: 'positive', feedback: 'Menyenangkan sekali didengarkan! Itu bukti bahwa kehadiranmu sangat berarti! 💕' },
        { text: 'Kami saling meminjamkan alat tulis saat butuh ✏️', type: 'positive', feedback: 'Tolong-menolong yang manis! Kebaikan kecil menciptakan keakraban besar. 🤝' },
        { text: 'Hari ini belum banyak ngobrol dengan teman 😶', type: 'recovery', feedback: 'Tak apa, senyuman hangat pada teman sebangku bisa jadi awal obrolan seru esok hari! 😊' },
      ],
      followUp: {
        prompt: 'Sapaan hangat apa yang ingin kamu berikan pada temanmu?',
        choices: [
          '"Terima kasih ya sudah jadi teman baikku hari ini!" 🙏',
          '"Ayo nanti istirahat kita main bareng lagi!" ⚽',
          '"Semangat ya, kita belajar bareng-bareng!" 💪',
          'Memberikan tos atau lambaian tangan ceria! ✋'
        ]
      }
    },
    {
      id: 'l2',
      question: 'Bagaimana perasaanmu jika melihat teman sekelas sedang sedih atau murung?',
      options: [
        { text: 'Ingin menghibur dan mengajaknya tersenyum 🎈', type: 'positive', feedback: 'Hati yang sangat lembut! Empatimu adalah anugerah terindah bagi kelasmu! 💖' },
        { text: 'Mendekatinya dan bertanya apakah dia baik-baik saja 💬', type: 'positive', feedback: 'Hebat! Pertanyaan sederhana itu bisa jadi penyelamat harinya lho! 🌈' },
        { text: 'Memberinya ruang dulu sampai dia merasa tenang 🕊️', type: 'positive', feedback: 'Sangat pengertian! Kadang orang butuh sedikit waktu untuk bernapas. 🍃' },
        { text: 'Bingung harus berbuat apa tapi ikut prihatin 🥺', type: 'recovery', feedback: 'Kepedulian di dalam hatimu sudah sangat berharga! Kehadiranmu saja sudah cukup. 🌸' },
      ],
      followUp: {
        prompt: 'Bantuan sederhana apa yang paling nyaman kamu berikan?',
        choices: [
          'Duduk menemani tanpa banyak bicara 🪑',
          'Berbagi camilan atau minum 🧃',
          'Mengajak guru untuk ikut membantu 🧑‍🏫',
          'Mengirimkan stiker gambar lucu 🎨'
        ]
      }
    },
    {
      id: 'l3',
      question: 'Ketika kamu merasa kesulitan dalam pelajaran, apa yang kamu lakukan?',
      options: [
        { text: 'Berani bertanya pada guru atau teman sebangku! 🙋', type: 'positive', feedback: 'Berani bertanya itu tanda anak cerdas dan percaya diri! 👏' },
        { text: 'Belajar kelompok bersama teman-teman 👥', type: 'positive', feedback: 'Seru sekali! Belajar bersama terasa lebih ringan dan menyenangkan! 📚' },
        { text: 'Mencoba membaca ulang sendiri perlahan 🔍', type: 'positive', feedback: 'Kemandirian yang hebat! Pantang menyerah sampai mengerti! 💡' },
        { text: 'Kadang malu bertanya karena takut salah 🫣', type: 'recovery', feedback: 'Tidak ada pertanyaan yang salah! Semua orang di kelas juga sedang belajar. Kamu hebat! 🌷' },
      ],
      followUp: {
        prompt: 'Kata penyemangat apa yang paling ingin kamu dengar?',
        choices: [
          '"Tidak apa-apa salah, kita pelajari lagi bareng ya!" 🌻',
          '"Kamu sudah berusaha hebat kok!" 🌟',
          '"Aku siap membantumu kapan saja!" 🤝',
          '"Tenang, pelan-pelan pasti paham!" 🌿'
        ]
      }
    }
  ],
  being: [
    {
      id: 'b1',
      question: 'Kapan kamu merasa paling bangga atau puas dengan dirimu sendiri di sekolah?',
      options: [
        { text: 'Saat berhasil menyelesaikan tugas sulit! 🏆', type: 'positive', feedback: 'Hore! Kerja kerasmu terbayar tuntas! Rasa bangga itu layak kamu nikmati! 🎉' },
        { text: 'Saat berani angkat tangan dan mengemukakan pendapat 🙋', type: 'positive', feedback: 'Keren sekali! Suaramu berharga dan ide-idemu unik! 🌟' },
        { text: 'Saat bisa membantu teman yang sedang kesusahan 🤝', type: 'positive', feedback: 'Kebaikan hatimu adalah kebanggaan terbesar sekolah ini! ❤️' },
        { text: 'Masih sering merasa belum ada hal istimewa 🙈', type: 'recovery', feedback: 'Setiap usahamu berharga! Datang ke sekolah dan berusaha saja sudah pencapaian hebat! 🏅' },
      ],
      followUp: {
        prompt: 'Bakat atau hal yang kamu sukai apa yang ingin kamu kembangkan?',
        choices: [
          'Menggambar, melukis, atau membuat kerajinan 🎨',
          'Menyanyi, bermusik, atau menari riang 🎵',
          'Olahraga, lari, atau permainan ketangkasan 🏃',
          'Membaca, menulis cerita, atau bercerita seru ✍️'
        ]
      }
    },
    {
      id: 'b2',
      question: 'Jika kamu memiliki ide baru untuk kelas, bagaimana caramu mengekspresikannya?',
      options: [
        { text: 'Langsung menceritakannya ke guru dan teman! 💡', type: 'positive', feedback: 'Jiwa kepemimpinan yang hebat! Ide-ide segar membuat kelas makin seru! 🚀' },
        { text: 'Mengajak sahabat terdekat berdiskusi dulu 🗣️', type: 'positive', feedback: 'Langkah cerdas! Kolaborasi membuat ide biasa jadi luar biasa! 🤝' },
        { text: 'Menuliskannya di buku catatan pribadi 📝', type: 'positive', feedback: 'Bagus! Menyusun ide dalam tulisan membantu mematangkan konsepmu. 📖' },
        { text: 'Khawatir ideku dianggap aneh oleh orang lain 🥺', type: 'recovery', feedback: 'Ide yang berbeda justru sering kali paling kreatif! Jadilah dirimu sendiri yang unik! 🦄' },
      ],
      followUp: {
        prompt: 'Karya kreatif apa yang paling membuatmu merasa bebas berekspresi?',
        choices: [
          'Mewarnai gambar dengan warna-warni cerah 🌈',
          'Merakit balok atau origami kertas 🧩',
          'Menciptakan yel-yel seru bersama teman 📣',
          'Menceritakan pengalaman liburan / cita-cita 🚀'
        ]
      }
    },
    {
      id: 'b3',
      question: 'Apa harapan terbesarmu untuk dirimu dan teman-teman di kelas?',
      options: [
        { text: 'Semua saling rukun dan tidak ada yang diejek 🕊️', type: 'positive', feedback: 'Harapan yang mulia! Kelas damai membuat semua anak bahagia bersekolah! 🌍' },
        { text: 'Bisa lulus dan meraih prestasi bersama-sama 🎓', type: 'positive', feedback: 'Target luar biasa! Melangkah bersama membuat perjalanan lebih seru! 🌟' },
        { text: 'Bisa menemukan hal baru yang menyenangkan tiap hari 🎁', type: 'positive', feedback: 'Semangat petualang! Setiap hari adalah lembaran cerita baru! 📖' },
        { text: 'Semoga setiap hari tidak terlalu banyak beban 🎈', type: 'recovery', feedback: 'Doa yang bijak. Keseimbangan antara belajar dan bermain adalah kunci bahagia! 🌈' },
      ],
      followUp: {
        prompt: 'Pesan afirmasi diri apa yang ingin kamu simpan di hatimu?',
        choices: [
          '"Aku berharga apa adanya!" ✨',
          '"Aku berani mencoba hal baru tanpa takut gagal!" 🦁',
          '"Aku disayangi oleh orang-orang di sekitarku!" 💖',
          '"Hari ini aku bertumbuh jadi lebih baik!" 🌱'
        ]
      }
    }
  ]
};

export function getRandomQuestion(dimension) {
  const list = QUESTIONS_BY_DIMENSION[dimension] || QUESTIONS_BY_DIMENSION.health;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
