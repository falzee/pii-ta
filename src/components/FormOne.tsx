/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UploadOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';

interface TableRow {
  key: number;
  name: string;
  age: string;
  dropdown: string;
  file: any;
  choices: string[];
}

interface SubSection {
  label: string;
  value: string;
}

interface Section {
  label: string;
  value: string;
  children: SubSection[];
}
  //rules
  // i3 W1 maks 13
  // i4 W1 maks 6
  // i5 W2 maks 5,W4 maks 5,P10 maks 5
  // i6 W1 maks 6,W4 maks 5,P10 maks 5
  
const dataWsatu: Section[]= [
  {
    label: 'W.1.1. - Mengembangkan dan mewujudkan tanggungjawab kecendekiaan dan kepedulian profesi keinsinyuran kepada bangsa, negara dan komunitas internasional',
    value: 'W.1.1.',
    children: [
      { label: 'W.1.1.1. - Menyadari tanggungjawab kecendekiaan Insinyur Profesional bagi memahami dan menjunjung falsafah dan nilai Pancasila sebagai  falsafah dasar masyarakat bangsa Indonesia', value: 'W.1.1.1' },
      { label: 'W.1.1.2. - Menghayati dan senantiasa  berusaha mengamalkan nilai dan jiwa Pancasila dalam menjalankan profesi.', value: 'W.1.1.2' },
      { label: 'W.1.1.3. - Berpedoman kepada konstitusi dan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia dalam menjalankan profesi.', value: 'W.1.1.3' },
      { label: 'W.1.1.4. - Menjunjung rasa kesetiakawanan nasional dan rasa kepedulian sosial dan berusaha mendorong kewirausahaan dan kesejahteraan masyarakat menuju cita-cita Bangsa dan Negara', value: 'W.1.1.4' },
      { label: 'W.1.1.5. - Mengembangkan wawasan kebangsaan yang kuat dan dengan sadar menumbuhkan  kepercayaan  diri  membangun  kemandirian  nasional dalam profesinya dan dalam mengembangkan kerjasama di komunitas internasional.', value: 'W.1.1.5' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.1.2. - Menghayati serta mematuhi Kode Etik Insinyur Indonesia dan tatalaku profesi yang berlaku',
    value: 'W.1.2.',
    children: [
        { label: 'W.1.2.1. -  Menempatkan tanggungjawab pada  kesejahteraan, kesehatan dan keselamatan masyarakat di atas tanggungjawabnya kepada profesi, kepada kepentingan golongan, atau kepada rekan sesama insinyur', value: 'W.1.2.1' },
        { label: 'W.1.2.2. - Bertindak dengan menjunjung tinggi kehormatan, martabat dan nilai luhur profesi.', value: 'W.1.2.2' },
        { label: 'W.1.2.3. - Melakukan pekerjaan, hanya dalam batasan kompetensinya.', value: 'W.1.2.3' },
        { label: 'W.1.2.4. - Mengembangkan nama baik berdasarkan prestasi dan tidak bersaing secara curang.', value: 'W.1.2.4' },
        { label: 'W.1.2.5. - Menerapkan kemampuan profesionalnya untuk kepentingan pemberi kerja keinsinyuran secara penuh amanah.', value: 'W.1.2.5' },
        { label: 'W.1.2.6. - Memberikan keterangan, pendapat atau pernyataan secara obyektif berdasarkan  kebenaran dan dalam cakupan pengetahuannya.', value: 'W.1.2.6' },
        { label: 'W.1.2.7. - Melakukan pengembangan kemampuan profesional secara berkelanjutan.', value: 'W.1.2.7' },
        { label: 'W.1.2.8. - Secara aktif membantu dan mendorong rekan kerjanya untuk memajukan pengetahuan dan pengalaman mereka.', value: 'W.1.2.8' },
        // ... other sub-sections ...
      ],
    },
    {
      label:'W.1.3. - Memahami, menerapkan, serta mengembangkan wawasan dan kaidah-kaidah kelestarian lingkungan',
      value: 'W.1.3.',
      children: [
        { label: 'W.1.3.1. - Menyadari  bahwa saling ketergantungan dan keaneka-ragaman ekosistem adalah dasar bagi  kelangsungan hidup manusia.', value: 'W.1.3.1' },
        { label: 'W.1.3.2. - Menyadari keterbatasan daya dukung lingkungan hidup untuk menyerap perubahan yang dibuat manusia.', value: 'W.1.3.2' },
        { label: 'W.1.3.3. - Menggalakkan tindakan  keinsinyuran yang diperlukan untuk memperbaiki, mempertahankan dan memulihkan  lingkungan hidup.', value: 'W.1.3.3' },
        { label: 'W.1.3.4. - Menggalakkan  penggunaan  yang  bijaksana  atas  sumber-daya  tak  terbarukan  dengan  memperkecil  atau  mendaur-ulang  limbah  dan mengembangkan sumber-daya alternatif lain sejauh mungkin', value: 'W.1.3.4' },
        { label: 'W.1.3.5. - Berusaha  mencapai  tujuan pekerjaan keinsinyurannya dengan penggunaan bahan baku dan enerji secara hemat dan dengan menerapkan kaidah pengelolaan lingkungan berkelanjutan', value: 'W.1.3.5' },
        { label: 'W.1.3.6. - Memperhatikan keseluruhan dampak dari  siklus hidup produk dan proyek terhadap lingkungan hidup.', value: 'W.1.3.6' },
        { label: 'W.1.3.7. - Memperhitungkan pengaruh yang mungkin muncul dari tindakan keinsinyuran terhadap faktor budaya atau warisan sejarah.', value: 'W.1.3.7' },
        // ... other sub-sections ...
      ],
    },
    {
    label:'W.1.4. - Mengemban tanggungjawab profesional atas tindakan dan karyanya.',
    value: 'W.1.4.',
    children: [
      { label: 'W.1.4.1. - Memperhitungkan risiko dan tanggung-gugat (liabilities) profesional, dan sanggup bertanggungjawab untuk itu', value: 'W.1.4.1' },
      { label: 'W.1.4.2. - Menerapkan dengan tepat persyaratan kesehatan dan keselamatan kerja (K-3).', value: 'W.1.4.2' },
      { label: 'W.1.4.3. - Menyelidiki kebutuhan keselamatan masyarakat dan bertindak untuk memecahkan masalah keselamatan yang mungkin timbul.', value: 'W.1.4.3' },
      { label: 'W.1.4.4. - Mengambil tindakan pencegahan yang tepat dalam menangani pekerjaan  yang berbahaya.', value: 'W.1.4.4' },
      { label: 'W.1.4.5. - Memperhatikan kaidah-kaidah pencegahan dan penanganan  bencana alam serta pemulihan akibatnya.', value: 'W.1.4.5' },
        // ... other sub-sections ...
      ],
    },
]
const dataWdua: Section[]= [
  //DONE CROSS CHECK
  {
    label:'W.2.1. - Melaksanakan pekerjaan yang bersifat kecendekiaan dan beragam',
    value: 'W.2.1.',
    children: [
      { label: 'W.2.1.1. - Menggunakan gagasannya sendiri dalam mensintesakan pemecahan yang memuaskan atas masalah keinsinyuran.', value: 'W.2.1.1' },
      { label: 'W.2.1.2. - Menggunakan kearifan yang profesional dalam membuat keputusan keinsinyuran.', value: 'W.2.1.2' },
      { label: 'W.2.1.3. - Melakukan pekerjaan keinsinyuran secara kreatif dan inovatif.', value: 'W.2.1.3' },
      { label: 'W.2.1.4. - Mengenali dan menanggulangi masalah keinsinyuran.', value: 'W.2.1.4' },
      { label: 'W.2.1.5. - Memperluas pengetahuan dalam kejuruan  atau bidang keahlian yang terkait dan memupuk kerjasama antar kejuruan  pada  waktu  bekerja dalam lingkungan aneka-kejuruan', value: 'W.2.1.5' },
      { label: 'W.2.1.6. - Menyelidiki kebutuhan dan memanfaatkan peluang yang khas terdapat dalam sesuatu bidang pekerjaan atau bidang kejuruan.', value: 'W.2.1.6' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.2.2. - Menguasai, memelihara, mengembangkan dan memutakhir-kan keahlian dalam bidang pekerjaan dan kejuruannya',
    value: 'W.2.2.',
    children: [
      { label: 'W.2.2.1. - Menyadari keterbatasan kepakaran dan pengetahuan dirinya dan menggunakan seluruh kemampuan untuk mengenali kekurangan diri, menambah pengetahuan dan mengupayakan bantuan dari pakar yang tepat.', value: 'W.2.2.1' },
      { label: 'W.2.2.2. - Menggunakan kemampuan untuk mencari informasi sehingga dapat mengikuti perkembangan teknologi atau kemajuan lainnya.', value: 'W.2.2.2' },
      { label: 'W.2.2.3. - Memperluas dasar pengetahuan dengan membaca majalah profesional, mengikuti seminar profesional dan menjalin kerjasama antar profesional.', value: 'W.2.2.3' },
      { label: 'W.2.2.4. - Memperdalam dasar pengetahuan secara sistematik dengan melakukan penelitian dan percobaan untuk menyelesaikan masalah keinsinyuran yang khas.', value: 'W.2.2.4' },
      { label: 'W.2.2.5. - Memanfaatkan setiap pengalaman pekerjaan untuk mengembangkan keprofesionalannya.', value: 'W.2.2.5' },
      { label: 'W.2.2.6. - Melakukan pencatatan mengenai kegiatan pengembangan keprofesionalannya.', value: 'W.2.2.6' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.2.3. - Memahami dan menerapkan metoda-metoda perekayasaan',
    value: 'W.2.3.',
    children: [
      { label: 'W.2.3.1. - Menemu-kenali (mengidentifikasi) berbagai penerapan kerekayasaan tepat-guna.', value: 'W.2.3.1' },
      { label: 'W.2.3.2. - Mengajukan konsep untuk melaksanakan penerapan kerekayasaan tepat-guna yang telah terpilih.', value: 'W.2.3.2' },
      { label: 'W.2.3.3. - Merinci penerapan kerekayasaan tepat-guna yang dipilih.', value: 'W.2.3.3' },
      { label: 'W.2.3.4. - Mengendalikan kemutakhiran dokumentasi hasil-hasil penerapannya.', value: 'W.2.3.4' },
      { label: 'W.2.3.5. - Mengkaji persyaratan bagi diperolehnya persetujuan pemberi tugas dan bagi pemenuhan kebutuhan di masa depan.', value: 'W.2.3.5' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.2.4. - Memahami dan menerapkan kaidah-kaidah penjaminan mutu',
    value: 'W.2.4.',
    children: [
      { label: 'W.2.4.1. - Menerapkan sistem mutu.', value: 'W.2.4.1' },
      { label: 'W.2.4.2. - Mendorong diterimanya kaidah-kaidah penjaminan mutu oleh rekan sekerja dan anak-buah.', value: 'W.2.4.2' },
      { label: 'W.2.4.3. - Melaksanakan setiap pekerjaan sesuai dengan bakuan mutu yang tepat.', value: 'W.2.4.3' },
      { label: 'W.2.4.4. - Menerapkan tatacara kendali mutu dan penjaminan mutu.', value: 'W.2.4.4' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.2.5. - Memilih dan menerapkan penggunaan perangkat perekayasaan dan teknologi yang tepat-guna',
    value: 'W.2.5.',
    children: [
      { label: 'W.2.5.1. - Memilih dan menggunakan analisis matematik, ilmu keinsinyuran, simulasi komputer atau teknik pemodelan lainnya.', value: 'W.2.5.1' },
      { label: 'W.2.5.2. - Memilih dan memanfaatkan penerapan sistem komputer.', value: 'W.2.5.2' },
      { label: 'W.2.5.3. - Mengarahkan dan melaksanakan tugas-tugas pemrograman dan penggunaan perangkat lunak.', value: 'W.2.5.3' },
      { label: 'W.2.5.4. - Memilih dan menggunakan alat bantu teknologi dan memantau kinerjanya.', value: 'W.2.5.4' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.2.6. - Melaksanakan uji-coba, pengukuran dan kaji-nilai (evaluasi)',
    value: 'W.2.6.',
    children: [
      { label: 'W.2.6.1. - Merumuskan tujuan uji-coba.', value: 'W.2.6.1' },
      { label: 'W.2.6.2. - Menyusun tatacara dan jadwal uji-coba.', value: 'W.2.6.2' },
      { label: 'W.2.6.3. - Mengembangkan tatacara dan alat-alat pengukuran.', value: 'W.2.6.3' },
      { label: 'W.2.6.4. - Melaksanakan uji-coba dan pengukuran untuk kerja keinsinyuran yang kritis.', value: 'W.2.6.4' },
      { label: 'W.2.6.5. - Mengawasi uji-coba dan pengukuran untuk kerja yang tidak kritis.', value: 'W.2.6.5' },
      { label: 'W.2.6.6. - Mengkaji-nilai hasil uji-coba dan pengukuran.', value: 'W.2.6.6' },
      // ... other sub-sections ...
    ],
  },
]
const dataWempat: Section[]= [
  
  {
    label:'W.4.1. - Menerapkan kaidah-kaidah manajemen atas diri sendiri',
    value: 'W.4.1.',
    children: [
      { label: 'W.4.1.1. - Melakukan pengembangan diri dalam kemampuan di bidang manajemen, termasuk hukum, ekonomi dan sosial.', value: 'W.4.1.1' },
      { label: 'W.4.1.2. - Menentukan sasaran bagi diri sendiri dalam  mencapai tujuan kerja.', value: 'W.4.1.2' },
      { label: 'W.4.1.3. - Menerapkan pengelolaan waktu dan tatakerja yang efektif.', value: 'W.4.1.3' },
      { label: 'W.4.1.4. - Melakukan pengembangan diri dalam kepemimpinan dan kerjasama kelompok', value: 'W.4.1.4' },
      { label: 'W.4.1.5. - Melakukan pengembangan diri dalam cara berpikir yang berwawasan luas, analitis dan kreatif', value: 'W.4.1.5' },

      // ... other sub-sections ...
    ],
  },

  {
    label:'W.4.2. - Memahami dan menerapkan kaidah-kaidah pengelolaan pekerjaan keinsinyuran',
    value: 'W.4.2.',
    children: [
      { label: 'W.4.2.1. - Melakukan tugas perencanaan dan pemantauan proyek.', value: 'W.4.2.1' },
      { label: 'W.4.2.2. - Mengembangkan uraian  rincian pekerjaan yang terstruktur.', value: 'W.4.2.2' },
      { label: 'W.4.2.3. - Menyiapkan jadwal pekerjaan dan jalur kritisnya.', value: 'W.4.2.3' },
      { label: 'W.4.2.4. - Memantau kemajuan, menyelidiki penyimpangan dari jadwal dan memulai tindakan perbaikan.', value: 'W.4.2.4' },

      // ... other sub-sections ...
    ],
  },

  {
    label:'W.4.3. - Memahami dan menerapkan kaidah-kaidah kepemimpinan dalam pekerjaan keinsinyuran',
    value: 'W.4.3.',
    children: [
      { label: 'W.4.3.1. - Melakukan penilaian kinerja bawahan.', value: 'W.4.3.1' },
      { label: 'W.4.3.2. - Mematuhi prinsip keadilan dan kebersamaan.', value: 'W.4.3.2' },
      { label: 'W.4.3.3. - Menggalang lingkungan hubungan kerja yang efektif.', value: 'W.4.3.3' },
      { label: 'W.4.3.4. - Mengorganisasikan kelompok-kelompok kerja.', value: 'W.4.3.4' },
      { label: 'W.4.3.5. - Memimpin insinyur muda, teknisi atau tenaga bawahan lainnya.', value: 'W.4.3.5' },
      { label: 'W.4.3.6. - Menghargai ataupun menghukum sesuai dengan kinerja.', value: 'W.4.3.6' },
      { label: 'W.4.3.7. - Memantau tugas-tugas untuk menjamin bahwa kegiatan dilaksanakan sesuai rencana dan mengambil tindakan perbaikan yang perlu.', value: 'W.4.3.7' },

      // ... other sub-sections ...
    ],
  },

  {
    label:'W.4.4. - Berkomunikasi dengan efektif',
    value: 'W.4.4.',
    children: [
      { label: 'W.4.4.1. - Berkomunikasi dengan baik, benar dan lancar untuk menyampaikan pendapat secara  lisan  maupun tertulis dalam bahasa Indonesia.', value: 'W.4.4.1' },
      { label: 'W.4.4.2. - Menyiapkan, menafsirkan dan memaparkan informasi.', value: 'W.4.4.2' },
      { label: 'W.4.4.3. - Berhubungan dengan rekan dan pakar di dalam dan di luar kalangannya.', value: 'W.4.4.3' },
      { label: 'W.4.4.4. - Mengartikan dengan benar instruksi keinsinyuran yang diterima.', value: 'W.4.4.4' },
      { label: 'W.4.4.5. - Memberikan instruksi yang jelas, cermat dan tepat  kepada bawahan dalam suatu bahasa asing yang lazim dipergunakan di bidang keinsinyuran.', value: 'W.4.4.5' },
      { label: 'W.4.4.6. - Memilih media  dan cara  komunikasi yang tepat guna.', value: 'W.4.4.6' },

      // ... other sub-sections ...
    ],
  },

  {
    label:'W.4.5. - Mengelola informasi keinsinyuran',
    value: 'W.4.5.',
    children: [
      { label: 'W.4.5.1. - Menyiapkan dan menyajikan ceramah (lectures) pada suatu tingkat profesional.', value: 'W.4.5.1' },
      { label: 'W.4.5.2. - Menyiapkan tulisan untuk diterbitkan dalam berkala  keinsinyuran.', value: 'W.4.5.2' },
      { label: 'W.4.5.3. - Menyampaikan informasi keinsinyuran secara efektif kepada kalangan keinsinyuran dan kalangan lainnya.', value: 'W.4.5.3' },
      { label: 'W.4.5.4. - Meneruskan informasi keinsinyuran secara efektif kepada atasan (insinyur maupun bukan).', value: 'W.4.5.4' },
      { label: 'W.4.5.5. - Melakukan perundingan, penyelesaian sengketa, pembinaan, pertukar-pikiran serta menyatakan pendapat dan sikap.', value: 'W.4.5.5' },
      { label: 'W.4.5.6. - Menyiapkan laporan keinsinyuran professional, seperti laporan kemajuan pekerjaan, secara baik dan benar.', value: 'W.4.5.6' },
      { label: 'W.4.5.7. - Menyiapkan dokumen seperti spesifikasi, bakuan dan paparan  grafis.', value: 'W.4.5.7' },
      { label: 'W.4.5.8. - Menyiapkan dokumen yang lebih kompleks seperti analisis dampak lingkungan atau kontrak kerja.', value: 'W.4.5.8' },
      { label: 'W.4.5.9. - Menafsirkan dengan benar gambar teknik serta grafik, spesifikasi, bakuan, peraturan, pedoman praktek dan analisis dampak lingkungan.', value: 'W.4.5.9' },

      // ... other sub-sections ...
    ],
  },
]
const dataPsepuluh: Section[]= [

  {
      label:'P.10.1. - Mengelola sumber-daya keinsinyuran',
      value: 'P.10.1.',
      children: [
        { label: 'P.10.1.1. - Menetapkan dan melaksanakan tujuan dan prioritas kerja.', value: 'P.10.1.1' },
        { label: 'P.10.1.2. - Merumuskan metoda pendekatan untuk pengelolaan sumber-daya.', value: 'P.10.1.2' },
        { label: 'P.10.1.3. - Melakukan analisis rincian tugas (work breakdown analysis) sehingga tersedia dasar bagi perhitungan kebutuhan  sumber-daya.', value: 'P.10.1.3' },
        { label: 'P.10.1.4. - Membuat perkiraan kebutuhan waktu, biaya, bahan dan sumber-daya lainnya untuk suatu pekerjaan.', value: 'P.10.1.4' },
        // ... other sub-sections ...
      ],
    },

  {
      label:'P.10.2. - Mengelola sumber-daya manusia',
      value: 'P.10.2.',
      children: [
        { label: 'P.10.2.1. - Mematuhi ketentuan kesehatan dan keselamatan kerja.', value: 'P.10.2.1' },
        { label: 'P.10.2.2. - Menemu-kenali dan menentukan kebutuhan pelatihan bagi tenaga kerja teknis di tempat pekerjaan.', value: 'P.10.2.2' },
        { label: 'P.10.2.3. - Melaksanakan program pengembangan pengalaman kerja untuk bawahan, termasuk pelatihan-ulang, penyesuaian pada teknologi baru dan pengembangan ketrampilan.', value: 'P.10.2.3' },
        { label: 'P.10.2.4. - Mengkaji efektifitas program pelatihan di tempat kerja.', value: 'P.10.2.4' },
        { label: 'P.10.2.5. - Merumuskan kebutuhan pelatihan tenaga kerja non-teknis.', value: 'P.10.2.5' },
        // ... other sub-sections ...
      ],
    },

  {
      label:'P.10.3. - Melaksanakan pengelolaan kewira-usahaan, keuangan, dan hukum/kontraktual',
      value: 'P.10.3.',
      children: [
        { label: 'P.10.3.1. - Melakukan tugas  kaji-nilai ekonomis atas pekerjaan yang dilaksanakan.', value: 'P.10.3.1' },
        { label: 'P.10.3.2. - Memahami dampak hukum dari tiap pekerjaan yang dilaksanakan.', value: 'P.10.3.2' },
        { label: 'P.10.3.3. - Memahami, menafsirkan dan menerapkan peraturan yang tepat.', value: 'P.10.3.3' },
        { label: 'P.10.3.4. - Menilai kebutuhan pemasaran dan memberikan saran untuk strategi pemasaran.', value: 'P.10.3.4' },
        { label: 'P.10.3.5. - Mengerjakan tugas pengelolaan  risiko.', value: 'P.10.3.5' },
        { label: 'P.10.3.6. - Memahami kebutuhan kewira-usahaan suatu perusahaan dan bertindak sesuai kebutuhan tersebut dalam hal biaya, waktu dan faktor-faktor lainnya.', value: 'P.10.3.6' },
        { label: 'P.10.3.7. - Mengkaji dan menyiapkan rencana usaha.', value: 'P.10.3.7' },
        // ... other sub-sections ...
      ],
    },

  {
      label:'P.10.4. - Mengelola keterangan produk (product knowledge) untuk barang/jasa keinsinyuran',
      value: 'P.10.4.',
      children: [
        { label: 'P.10.4.1. - Menyiapkan dokumen, brosur, uraian teknis dan  spesifikasi mengenai produk barang/jasa keinsinyuran  untuk keperluan pemasaran.', value: 'P.10.4.1' },
        { label: 'P.10.4.2. - Menyiapkan dokumen, pedoman, buku panduan untuk pemakaian operasi, pemeliharaan,  penyetelan dan perbaikan atas produk barang/jasa oleh konsumen.', value: 'P.10.4.2' },
        { label: 'P.10.4.3. - Melakukan pengamatan atas kebutuhan pasar/pelanggan masa-depan terhadap  penyempurnaan dan menemu-kenali perubahan/pembaharuan yang perlu atas produk barang/jasa.', value: 'P.10.4.3' },
        { label: 'P.10.4.4. - Memantau dan mengikuti kinerja dan keandalan produk barang/peralatan dan jasa yang dipakai pelanggan dan melakukan perbaikan dan penyempurnaan untuk kepuasan pelanggan.', value: 'P.10.4.4' },
        // ... other sub-sections ...
      ],
    },

  {
      label:'P.10.5. - Memahami dan menerapkan kaidah-kaidah pemasaran barang/jasa keinsinyuran',
      value: 'P.10.5.',
      children: [
        { label: 'P.10.5.1. - Menyiapkan dan melakukan kajian kebutuhan pasar akan barang/jasa keinsinyuran yang hendak dipasarkan.', value: 'P.10.5.1' },
        { label: 'P.10.5.2. - Menyiapkan strategi dan program pentahapan pemasaran untuk menarik minat pasar/pelanggan.', value: 'P.10.5.2' },
        { label: 'P.10.5.3. - Melakukan promosi dan paparan pengenalan produk barang/jasa keinsinyuran untuk meyakinkan pelanggan dan pasar.', value: 'P.10.5.3' },
        { label: 'P.10.5.4. - Menyiapkan usulan penawaran produk barang/jasa keinsinyuran secara mandiri atau bersama tim proposal, meliputi proposal teknis, komersial dan kontraktual.', value: 'P.10.5.4' },
        { label: 'P.10.5.5. - Melaksanakan klasifikasi, negosiasi dan memberikan saran solusi/aplikasi teknis, penjelasan batasan tanggungjawab masing-masing untuk meyakinkan pelanggan sampai terlaksananya transaksi/kontrak penjualan produk barang/jasa.', value: 'P.10.5.5' },
        // ... other sub-sections ...
      ],
    },

  {
        label:'P.10.6. - Memahami dan menerapkan kaidah-kaidah pelayanan purna-jual',
        value: 'P.10.6.',
        children: [
          { label: 'P.10.6.1. - Merumuskan dan menjelaskan batas syarat tanggungjawab jaminan kinerja dan perbaikan kerusakan purna-jual (warranty dan guarantee fee).', value: 'P.10.6.1' },
          { label: 'P.10.6.2. - Melaksanakan pelayanan teknis purna-jual dan mengatasi masalah  teknis, sesuai tanggungjawab kontraktual.', value: 'P.10.6.2' },
          { label: 'P.10.6.3. - Melaksanakan pelatihan pengembangan keahlian tenaga pemakai (operator) dan pemeliharaan produk.', value: 'P.10.6.3' },
          { label: 'P.10.6.4. - Memelihara persediaan suku-cadang dan mengelola sumber daya untuk pelaksanaan pelayanan purna jual.', value: 'P.10.6.4' },
          { label: 'P.10.6.5. - Melakukan pemantauan ke pelanggan untuk meningkatkan kehandalan pemakaian produk dan kepuasan pelanggan.', value: 'P.10.6.5' },
          // ... other sub-sections ...
        ],
      },

]

{/* <optgroup label="W.2.1. - Melaksanakan pekerjaan yang bersifat kecendekiaan dan beragam">
  <option value="W.2.1.1." selected="selected">W.2.1.1. - Menggunakan gagasannya sendiri dalam mensintesakan pemecahan yang memuaskan atas masalah keinsinyuran.</option><br>
  <option value="W.2.1.2.">W.2.1.2. - Menggunakan kearifan yang profesional dalam membuat keputusan keinsinyuran.</option><br>
  <option value="W.2.1.3.">W.2.1.3. - Melakukan pekerjaan keinsinyuran secara kreatif dan inovatif.</option><br>
  <option value="W.2.1.4.">W.2.1.4. - Mengenali dan menanggulangi masalah keinsinyuran.</option><br>
  <option value="W.2.1.5.">W.2.1.5. - Memperluas pengetahuan dalam kejuruan atau bidang keahlian yang terkait dan memupuk kerjasama antar kejuruan pada waktu bekerja dalam lingkungan aneka-kejuruan</option><br>
  <option value="W.2.1.6.">W.2.1.6. - Menyelidiki kebutuhan dan memanfaatkan peluang yang khas terdapat dalam sesuatu bidang pekerjaan atau bidang kejuruan.</option><br>
</optgroup><br>

<optgroup label="W.2.2. - Menguasai, memelihara, mengembangkan dan memutakhir-kan keahlian dalam bidang pekerjaan dan kejuruannya">
  <option value="W.2.2.1.">W.2.2.1. - Menyadari keterbatasan kepakaran dan pengetahuan dirinya dan menggunakan seluruh kemampuan untuk mengenali kekurangan diri, menambah pengetahuan dan mengupayakan bantuan dari pakar yang tepat</option><br>
  <option value="W.2.2.2." selected="selected">W.2.2.2. - Menggunakan kemampuan untuk mencari informasi sehingga dapat mengikuti perkembangan teknologi atau kemajuan lainnya.</option><br>
  <option value="W.2.2.3.">W.2.2.3. - Memperluas dasar pengetahuan dengan membaca majalah profesional, mengikuti seminar profesional dan menjalin kerjasama antar profesional.</option><br>
  <option value="W.2.2.4.">W.2.2.4. - Memperdalam dasar pengetahuan secara sistematik dengan melakukan penelitian dan percobaan untuk menyelesaikan masalah keinsinyuran yang khas.</option><br>
  <option value="W.2.2.5.">W.2.2.5. - Memanfaatkan setiap pengalaman pekerjaan untuk mengembangkan keprofesionalannya.</option><br>
  <option value="W.2.2.6.">W.2.2.6. - Melakukan pencatatan mengenai kegiatan pengembangan keprofesionalannya.</option><br>
</optgroup><br>

<optgroup label="W.2.3. - Memahami dan menerapkan metoda-metoda perekayasaan">
  <option value="W.2.3.1.">W.2.3.1. - Menemu-kenali (mengidentifikasi) berbagai penerapan kerekayasaan tepat-guna.</option><br>
  <option value="W.2.3.2.">W.2.3.2. - Mengajukan konsep untuk melaksanakan penerapan kerekayasaan tepat-guna yang telah terpilih.</option><br>
  <option value="W.2.3.3." selected="selected">W.2.3.3. - Merinci penerapan kerekayasaan tepat-guna yang dipilih.</option><br>
  <option value="W.2.3.4.">W.2.3.4. - Mengendalikan kemutakhiran dokumentasi hasil-hasil penerapannya.</option><br>
  <option value="W.2.3.5.">W.2.3.5. - Mengkaji persyaratan bagi diperolehnya persetujuan pemberi tugas dan bagi pemenuhan kebutuhan di masa depan.</option><br>
</optgroup><br>

<optgroup label="W.2.4. - Memahami dan menerapkan kaidah-kaidah penjaminan mutu">
  <option value="W.2.4.1.">W.2.4.1. - Menerapkan sistem mutu.</option><br>
  <option value="W.2.4.2.">W.2.4.2. - Mendorong diterimanya kaidah-kaidah penjaminan mutu oleh rekan sekerja dan anak-buah.</option><br>
  <option value="W.2.4.3." selected="selected">W.2.4.3. - Melaksanakan setiap pekerjaan sesuai dengan bakuan mutu yang tepat.</option><br>
  <option value="W.2.4.4.">W.2.4.4. - Menerapkan tatacara kendali mutu dan penjaminan mutu.</option><br>
</optgroup><br>

<optgroup label="W.2.5. - Memilih dan menerapkan penggunaan perangkat perekayasaan dan teknologi yang tepat-guna">
  <option value="W.2.5.1.">W.2.5.1. - Memilih dan menggunakan analisis matematik, ilmu keinsinyuran, simulasi komputer atau teknik pemodelan lainnya.</option><br>
  <option value="W.2.5.2.">W.2.5.2. - Memilih dan memanfaatkan penerapan sistem komputer.</option><br>
  <option value="W.2.5.3.">W.2.5.3. - Mengarahkan dan melaksanakan tugas-tugas pemrograman dan penggunaan perangkat lunak.</option><br>
  <option value="W.2.5.4." selected="selected">W.2.5.4. - Memilih dan menggunakan perangkat keras yang sesuai dengan kebutuhan.</option><br>
  <option value="W.2.5.5.">W.2.5.5. - Merancang dan mengadakan ujicoba terhadap sistem dan perangkat yang telah dibuat atau diterapkan.</option><br>
  <option value="W.2.5.6.">W.2.5.6. - Memilih dan menggunakan teknologi atau metoda perekayasaan baru yang sesuai dengan kebutuhan.</option><br>
</optgroup><br>

<optgroup label="W.2.6. - Melaksanakan uji-coba, pengukuran dan kaji-nilai (evaluasi)">
  <option value="W.2.6.1.">W.2.6.1. - Merumuskan tujuan uji-coba.</option><br>
  <option value="W.2.6.2.">W.2.6.2. - Menyusun tatacara dan jadwal uji-coba.</option><br>
  <option value="W.2.6.3.">W.2.6.3. - Mengembangkan tatacara dan alat-alat pengukuran.</option><br>
  <option value="W.2.6.4.">W.2.6.4. - Melaksanakan uji-coba dan pengukuran untuk kerja keinsinyuran yang kritis.</option><br>
  <option value="W.2.6.5.">W.2.6.5. - Mengawasi uji-coba dan pengukuran untuk kerja yang tidak kritis.</option><br>
  <option value="W.2.6.6.">W.2.6.6. - Mengkaji-nilai hasil uji-coba dan pengukuran.</option><br>
</optgroup><br>

// <optgroup label="W.4.1. - Menerapkan kaidah-kaidah manajemen atas diri sendiri">
  //   <option value="W.4.1.1." selected="selected">W.4.1.1. - Melakukan pengembangan diri dalam kemampuan di bidang manajemen, termasuk hukum, ekonomi dan sosial.</option>
  //   <option value="W.4.1.2.">W.4.1.2. - Menentukan sasaran bagi diri sendiri dalam  mencapai tujuan kerja.</option>
  //   <option value="W.4.1.3.">W.4.1.3. - Menerapkan pengelolaan waktu dan tatakerja yang efektif.</option
  //   ><option value="W.4.1.4.">W.4.1.4. - Melakukan pengembangan diri dalam kepemimpinan dan kerjasama kelompok.</option>
  //   <option value="W.4.1.5.">W.4.1.5. - Melakukan pengembangan diri dalam cara berpikir yang berwawasan luas, analitis dan kreatif.</option>
  // </optgroup>

    // <optgroup label="W.4.2. - Memahami dan menerapkan kaidah-kaidah pengelolaan pekerjaan keinsinyuran">
  //   <option value="W.4.2.1.">W.4.2.1. - Melakukan tugas perencanaan dan pemantauan proyek.</option>
  //   <option value="W.4.2.2." selected="selected">W.4.2.2. - Mengembangkan uraian  rincian pekerjaan yang terstruktur.</option>
  //   <option value="W.4.2.3.">W.4.2.3. - Menyiapkan jadwal pekerjaan dan jalur kritisnya.</option>
  //   <option value="W.4.2.4.">W.4.2.4. - Memantau kemajuan, menyelidiki penyimpangan dari jadwal dan memulai tindakan perbaikan.</option>
  // </optgroup>

  // <optgroup label="W.4.3. - Memahami dan menerapkan kaidah-kaidah kepemimpinan dalam pekerjaan keinsinyuran">
  //   <option value="W.4.3.1.">W.4.3.1. - Melakukan penilaian kinerja bawahan.</option>
  //   <option value="W.4.3.2.">W.4.3.2. - Mematuhi prinsip keadilan dan kebersamaan.</option>
  //   <option value="W.4.3.3." selected="selected">W.4.3.3. - Menggalang lingkungan hubungan kerja yang efektif.</option>
  //   <option value="W.4.3.4.">W.4.3.4. -  Mengorganisasikan kelompok-kelompok kerja.</option>
  //   <option value="W.4.3.5.">W.4.3.5. - Memimpin insinyur muda, teknisi atau tenaga bawahan lainnya.</option>
  //   <option value="W.4.3.6.">W.4.3.6. - Menghargai ataupun menghukum sesuai dengan kinerja (on-merit)</option>
  //   <option value="W.4.3.7.">W.4.3.7. - Memantau tugas-tugas untuk menjamin bahwa kegiatan dilaksanakan sesuai rencana dan mengambil tindakan perbaikan yang perlu.</option>
  // </optgroup>

  // <optgroup label="W.4.4. - Berkomunikasi dengan efektif">
  //   <option value="W.4.4.1.">W.4.4.1. - Berkomunikasi dengan baik, benar dan lancar untuk menyampaikan pendapat secara  lisan  maupun tertulis dalam bahasa Indonesia.</option>
  //   <option value="W.4.4.2.">W.4.4.2. - Menyiapkan, menafsirkan dan memaparkan informasi.</option>
  //   <option value="W.4.4.3.">W.4.4.3. - Berhubungan dengan rekan dan pakar di dalam dan di luar kalangannya.</option>
  //   <option value="W.4.4.4." selected="selected">W.4.4.4. - Mengartikan dengan benar instruksi keinsinyuran yang diterima.</option>
  //   <option value="W.4.4.5.">W.4.4.5. - Memberikan instruksi yang jelas, cermat dan tepat  kepada bawahan dalam suatu bahasa asing yang lazim dipergunakan di bidang keinsinyuran.</option>
  //   <option value="W.4.4.6.">W.4.4.6. - Memilih media  dan cara  komunikasi yang tepat guna.</option>
  // </optgroup>

  // <optgroup label="W.4.5. - Mengelola informasi keinsinyuran">
  //   <option value="W.4.5.1.">W.4.5.1. - Menyiapkan dan menyajikan ceramah (lectures) pada suatu tingkat profesional.</option>
  //   <option value="W.4.5.2.">W.4.5.2. - Menyiapkan tulisan untuk diterbitkan dalam berkala  keinsinyuran.</option>
  //   <option value="W.4.5.3.">W.4.5.3. - Menyampaikan informasi keinsinyuran secara efektif kepada kalangan keinsinyuran dan kalangan lainnya.</option>
  //   <option value="W.4.5.4.">W.4.5.4. - Meneruskan informasi keinsinyuran secara efektif kepada atasan (insinyur maupun bukan).</option>
  //   <option value="W.4.5.5." selected="selected">W.4.5.5. - Melakukan perundingan, penyelesaian sengketa, pembinaan, pertukar-pikiran serta menyatakan pendapat dan sikap.</option>
  //   <option value="W.4.5.6.">W.4.5.6. - Menyiapkan laporan keinsinyuran professional, seperti laporan kemajuan pekerjaan, secara baik dan benar.</option>
  //   <option value="W.4.5.7.">W.4.5.7. - Menyiapkan dokumen seperti spesifikasi, bakuan dan paparan  grafis.</option>
  //   <option value="W.4.5.8.">W.4.5.8. - Menyiapkan dokumen yang lebih kompleks seperti analisis dampak lingkungan atau kontrak kerja.</option>
  //   <option value="W.4.5.9.">W.4.5.9. - Menafsirkan dengan benar gambar teknik serta grafik, spesifikasi, bakuan, peraturan, pedoman praktek dan analisis dampak lingkungan.</option>
  // </optgroup>

  // <optgroup label="P.10.1. - Mengelola sumber-daya keinsinyuran">
  //   <option value="P.10.1.1." selected="selected">P.10.1.1. - Menetapkan dan melaksanakan tujuan dan prioritas kerja.</option>
  //   <option value="P.10.1.2.">P.10.1.2. - Merumuskan metoda pendekatan untuk pengelolaan sumber-daya.</option>
  //   <option value="P.10.1.3.">P.10.1.3. - Melakukan analisis rincian tugas (work breakdown analysis) sehingga tersedia dasar bagi perhitungan kebutuhan  sumber-daya.</option>
  //   <option value="P.10.1.4.">P.10.1.4. - Membuat perkiraan kebutuhan waktu, biaya, bahan dan sumber-daya lainnya untuk suatu pekerjaan.</option>
  // </optgroup>

  // <optgroup label="P.10.2. - Mengelola sumber-daya manusia">
  //   <option value="P.10.2.1.">P.10.2.1. - Mematuhi ketentuan kesehatan dan keselamatan kerja.</option>
  //   <option value="P.10.2.2." selected="selected">P.10.2.2. - Menemu-kenali dan menentukan kebutuhan pelatihan bagi tenaga kerja teknis di tempat pekerjaan.</option>
  //   <option value="P.10.2.3.">P.10.2.3. - Melaksanakan program pengembangan pengalaman kerja untuk bawahan, termasuk pelatihan-ulang, penyesuaian pada teknologi baru dan pengembangan ketrampilan.</option>
  //   <option value="P.10.2.4.">P.10.2.4. - Mengkaji efektifitas program pelatihan di tempat kerja.</option>
  //   <option value="P.10.2.5.">P.10.2.5. - Merumuskan kebutuhan pelatihan tenaga kerja non-teknis.</option>
  // </optgroup>

  // <optgroup label="P.10.3. - Melaksanakan pengelolaan kewira-usahaan, keuangan, dan hukum/kontraktual">
  //   <option value="P.10.3.1.">P.10.3.1. - Melakukan tugas  kaji-nilai ekonomis atas pekerjaan yang dilaksanakan.</option>
  //   <option value="P.10.3.2.">P.10.3.2. - Memahami dampak hukum dari tiap pekerjaan yang dilaksanakan.</option>
  //   <option value="P.10.3.3." selected="selected">P.10.3.3. - Memahami, menafsirkan dan menerapkan peraturan yang tepat.</option>
  //   <option value="P.10.3.4.">P.10.3.4. - Menilai kebutuhan pemasaran dan memberikan saran untuk strategi pemasaran.</option>
  //   <option value="P.10.3.5.">P.10.3.5. - Mengerjakan tugas pengelolaan  risiko.</option>
  //   <option value="P.10.3.6.">P.10.3.6. - Memahami kebutuhan kewira-usahaan suatu perusahaan dan bertindak sesuai kebutuhan tersebut dalam hal biaya, waktu dan faktor-faktor lainnya.</option>
  //   <option value="P.10.3.7.">P.10.3.7. - Mengkaji dan menyiapkan rencana usaha.</option>
  // </optgroup>

  // <optgroup label="P.10.4. - Mengelola keterangan produk (product knowledge) untuk barang/jasa keinsinyuran">
  //   <option value="P.10.4.1.">P.10.4.1. - Menyiapkan dokumen, brosur, uraian teknis dan  spesifikasi mengenai produk barang/jasa keinsinyuran  untuk keperluan pemasaran.</option>
  //   <option value="P.10.4.2.">P.10.4.2. - Menyiapkan dokumen, pedoman, buku panduan untuk pemakaian operasi, pemeliharaan,  penyetelan dan perbaikan atas produk barang/jasa oleh konsumen.</option>
  //   <option value="P.10.4.3.">P.10.4.3. - Melakukan pengamatan atas kebutuhan pasar/pelanggan masa-depan terhadap  penyempurnaan dan menemu-kenali perubahan/pembaharuan yang perlu atas produk barang/jasa.</option>
  //   <option value="P.10.4.4." selected="selected">P.10.4.4. - Memantau dan mengikuti kinerja dan keandalan produk barang/peralatan dan jasa yang dipakai pelanggan dan melakukan perbaikan dan penyempurnaan untuk kepuasan pelanggan.</option>
  // </optgroup>

    // <optgroup label="P.10.5. - Memahami dan menerapkan kaidah-kaidah pemasaran barang/jasa keinsinyuran">
  //   <option value="P.10.5.1.">P.10.5.1. - Menyiapkan dan melakukan kajian kebutuhan pasar akan barang/jasa keinsinyuran yang hendak dipasarkan.</option>
  //   <option value="P.10.5.2.">P.10.5.2. - Menyiapkan strategi dan program pentahapan pemasaran untuk menarik minat pasar/pelanggan.</option>
  //   <option value="P.10.5.3.">P.10.5.3. - Melakukan promosi dan paparan pengenalan produk barang/jasa keinsinyuran untuk meyakinkan pelanggan dan pasar.</option>
  //   <option value="P.10.5.4.">P.10.5.4. - Menyiapkan usulan penawaran produk barang/jasa keinsinyuran secara mandiri atau bersama tim proposal, meliputi proposal teknis, komersial dan kontraktual.</option>
  //   <option value="P.10.5.5." selected="selected">P.10.5.5. - Melaksanakan klasifikasi, negosiasi dan memberikan saran solusi/aplikasi teknis, penjelasan batasan tanggungjawab masing-masing untuk meyakinkan pelanggan sampai terlaksananya transaksi/kontrak penjualan produk barang/jasa</option>
  // </optgroup>

    // <optgroup label="P.10.6. - Memahami dan menerapkan kaidah-kaidah pelayanan purna-jual">
  //   <option value="P.10.6.1.">P.10.6.1. - Merumuskan dan menjelaskan batas syarat tanggungjawab jaminan kinerja dan perbaikan kerusakan purna-jual (warranty dan guarantee fee).</option>
  //   <option value="P.10.6.2.">P.10.6.2. - Melaksanakan pelayanan teknis purna-jual dan mengatasi masalah  teknis, sesuai tanggungjawab kontraktual.</option>
  //   <option value="P.10.6.3.">P.10.6.3. - Melaksanakan pelatihan pengembangan keahlian tenaga pemakai (operator) dan pemeliharaan produk.</option>
  //   <option value="P.10.6.4.">P.10.6.4. - Memelihara persediaan suku-cadang dan mengelola sumber daya untuk pelaksanaan pelayanan purna jual.</option>
  //   <option value="P.10.6.5.">P.10.6.5. - Melakukan pemantauan ke pelanggan untuk meningkatkan kehandalan pemakaian produk dan kepuasan pelanggan.</option>
  // </optgroup>
*/}
const choicesData: Section[]= [
  {
    label: 'W.1.1. -',
    value: 'section1',
    children: [
      { label: 'W.1.1.1. -', value: 'section1.1.1.' },
      { label: 'W.1.1.2. -', value: 'section1.1.2.' },
      { label: 'W.1.1.3. -', value: 'section1.1.3.' },
      { label: 'W.1.1.4. -', value: 'section1.1.4.' },
      { label: 'W.1.1.5. -', value: 'section1.1.5.' },

      // ... other sub-sections ...
    ],
  },
  {
    label:'W.1.2. -',
    value: 'section2',
    children: [
      { label: 'W.1.2.1. -', value: 'section1.2.1.' },
      { label: 'W.1.2.2. -', value: 'section1.2.2.' },
      { label: 'W.1.2.3. -', value: 'section1.2.3.' },
      { label: 'W.1.2.4. -', value: 'section1.2.4.' },
      { label: 'W.1.2.5. -', value: 'section1.2.5.' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.1.3. -',
    value: 'section3',
    children: [
      { label: 'W.1.3.1. -', value: 'section1.3.1.' },
      { label: 'W.1.3.2. -', value: 'section1.3.2.' },
      { label: 'W.1.3.3. -', value: 'section1.3.3.' },
      { label: 'W.1.3.4. -', value: 'section1.3.4.' },
      { label: 'W.1.3.5. -', value: 'section1.3.5.' },
      // ... other sub-sections ...
    ],
  },
  {
    label:'W.1.4. -',
    value: 'section4',
    children: [
      { label: 'W.1.4.1. -', value: 'section1.4.1.' },
      { label: 'W.1.4.2. -', value: 'section1.4.2.' },
      { label: 'W.1.4.3. -', value: 'section1.4.3.' },
      { label: 'W.1.4.4. -', value: 'section1.4.4.' },
      { label: 'W.1.4.5. -', value: 'section1.4.5.' },
      // ... other sub-sections ...
    ],
  },
  // ... other sections ...
];
const FormTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableRow[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: string[] }>({});
  const [rowNumbers, setRowNumbers] = useState<number>(1);

  // ... handleChoiceChange and other functions ...

  const handleAddRow = () => {
    const newRow: TableRow = {
      key: rowNumbers,
      name: '',
      age: '',
      dropdown: '',
      file: null,
      choices: [],
    };
    setDataSource([...dataSource, newRow]);
    setRowNumbers(rowNumbers + 1); // Increment the row number
  };
  
  const handleDeleteRow = (key: number) => {
    const updatedDataSource = dataSource.filter(row => row.key !== key);
    setDataSource(updatedDataSource);
    // const updatedRowNumbers = updatedDataSource.map(row => row.key).splice(-1,1,);
    // console.log(updatedRowNumbers)
    // const updatedNumbers = updatedRowNumbers.splice(-1, 1) ;
  
    // console.log(updatedRowNumbers)
    //buggg
  };

  const handleChoiceChange = (recordKey: number, choiceValue: string, checked: boolean) => {
    const currentRowChoices = selectedChoices[recordKey] || [];
    
    if (checked && currentRowChoices.length < 3) {
      const updatedRowChoices = [...currentRowChoices, choiceValue];
      setSelectedChoices({
        ...selectedChoices,
        [recordKey]: updatedRowChoices,
      });
    } else if (!checked) {
      const updatedRowChoices = currentRowChoices.filter(choice => choice !== choiceValue);
      setSelectedChoices({
        ...selectedChoices,
        [recordKey]: updatedRowChoices,
      });
    }else {
      // Show alert if more than 3 choices selected
      alert('Please select up to 3 choices.');
    }
  };

  const columns = [
    // ... Previous columns ...

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TableRow) => (
        <Form.Item name={`name${record.key}`} initialValue={text}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: string, record: TableRow) => (
        <Form.Item name={`age${record.key}`} initialValue={text}>
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Dropdown',
      dataIndex: 'dropdown',
      key: 'dropdown',
      render: (text: string, record: TableRow, index: number) => (
        <Form.Item name={`dropdown${record.key}`} initialValue={text}>
          <Select style={{ width: 120 }}>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'File Upload',
      dataIndex: 'file',
      key: 'file',
      render: (text: string, record: TableRow, index: number) => (
        <Form.Item name={`file${record.key}`} initialValue={text}>
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: 'Choices',
      dataIndex: 'choices',
      key: 'choices',
      render: (text: string[], record: TableRow) => (
        <div style={{ height: '150px', overflowY: 'scroll' }}>
        <Form.Item name={`choices${record.key}`} initialValue={text} >
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {choicesData.map(section => (
          <div key={section.value}>
            <span>{section.label}</span>
            {section.children.map((subSection) => (
              <div key={subSection.value}>
                <Checkbox
                  value={subSection.value}
                  checked={(selectedChoices[record.key] || []).includes(subSection.value)}
                  onChange={(e : any) => handleChoiceChange(record.key, subSection.value, e.target.checked)}
                >
                  {subSection.label}
                </Checkbox>
              </div>
            ))}
          </div>
           
        ))}
      </div>
    </Form.Item>
    </div>
      ),
    },
    
    
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: TableRow) => (
        <Button onClick={() => handleDeleteRow(record.key)}>Delete</Button>
      ),
    },
  ];

  const formRef = React.createRef<FormInstance>();


  const handleEdit = (index: number) => {
    // Implement edit functionality
    const selectedRow = dataSource[index];
    formRef.current?.setFieldsValue(selectedRow);
  };

  const handleDelete = (index: number) => {
    // Implement delete functionality
    const updatedDataSource = dataSource.filter((_, i) => i !== index);
    setDataSource(updatedDataSource);
  };

  // const onFinish = (values: any) => {
  //   console.log('Form values:', values);
  //   // You can perform further actions with the form values
  // };
  const onFinish = (values: any) => {
    const formData = dataSource.map(row => ({
      ...row,
      name: values[`name${row.key}`],
      age: values[`age${row.key}`],
      dropdown: values[`dropdown${row.key}`],
      choices: selectedChoices[row.key] || [],
      file: values[`file${row.key}`]
    }));
    
    // Now you can send formData to your backend for processing
    console.log('Form Data:', formData);
  
    // ... your form submission logic ...
  };
  

  return (
    <div>
      
      <div className='container-form'>
        <Button className="addingFormButton" type="primary" onClick={handleAddRow} style={{marginBottom:'10px'}}>
          + Add Row
        </Button>
        <Form ref={formRef} onFinish={onFinish} >
          <div style={{ maxHeight: '500px', overflowY: 'auto', }}>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="key" size="small" style={{maxHeight: '430px'}}/>
          </div>
          <Button className="saveFormButton" type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center" }}>
          {/* <Button type="primary" htmlType="submit" disabled={totalSelected !== 3}> */}
            Sava & Continue
          </Button>
        </Form>
        
      </div>
    </div>
  );
};

export default FormTable;

// form
// no. = number
// nama organisasi = input
// jenis = dropdown
// kota/kab = input
// prov = input
// negara = input
// perioda = if not checked 2 input&dropdown else 1 input&dropdown 
// jabatan org = dropdown
// tingkatan organisasi = dropdown
// lingkup kegiatan org = dropdown
// uraian singkat = input
// dokumen pendukung = upload
// klain kompetensi = multiple choice (max 3)
// action = delete button

// interface TableRow {
//   id: number;
//   nama: string;
//   jenis: string;
//   dropdown: string;
//   file: any;
//   choices: string[];
// }