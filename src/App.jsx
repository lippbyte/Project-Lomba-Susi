import { useState, useContext, createContext, useEffect, useRef } from "react";

/* ── DESIGN TOKENS (Mapped to CSS Variables for Dark Mode) ──── */
const T = {
  paper:"var(--paper)", paperDk:"var(--paperDk)", paperDkr:"var(--paperDkr)",
  ink:"var(--ink)", inkMid:"var(--inkMid)", inkSoft:"var(--inkSoft)", inkFaint:"var(--inkFaint)",
  navy:"var(--navy)", navyDk:"var(--navyDk)", navyLt:"var(--navyLt)", navyMid:"var(--navyMid)",
  terra:"var(--terra)", terraLt:"var(--terraLt)", terraMid:"var(--terraMid)",
  gold:"var(--gold)", goldLt:"var(--goldLt)", goldDk:"var(--goldDk)", white:"var(--white)",
};

/* ── GLOBAL CSS ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
  
  :root {
    --paper: #F5F1E8; --paperDk: #EDE8DA; --paperDkr: #E0D9C8;
    --ink: #1F2937; --inkMid: #4B5563; --inkSoft: #6B7280; --inkFaint: #9CA3AF;
    --navy: #1E3A8A; --navyDk: #1e3178; --navyLt: #EFF3FB; --navyMid: #3B5FBB;
    --terra: #C2410C; --terraLt: #FEF0E8; --terraMid: #D95B28;
    --gold: #D4A373; --goldLt: #FDF6EC; --goldDk: #A0754A; --white: #FFFFFF;
    --shadow-sm: 0 1px 3px rgba(31,41,55,.07),0 1px 8px rgba(31,41,55,.04);
    --shadow-md: 0 4px 16px rgba(31,41,55,.11);
    --overlay-bg: rgba(255,255,255,0.95);
  }

  body.dark-theme {
    --paper: #121212; --paperDk: #1E1E1E; --paperDkr: #2D2D2D;
    --ink: #F9FAFB; --inkMid: #D1D5DB; --inkSoft: #9CA3AF; --inkFaint: #6B7280;
    /* Soften navy/terra for dark mode readability */
    --navy: #3B82F6; --navyDk: #2563EB; --navyLt: #1E3A8B; --navyMid: #60A5FA;
    --terra: #F97316; --terraLt: #7C2D12; --terraMid: #FB923C;
    --gold: #FBBF24; --goldLt: #78350F; --goldDk: #FDE68A; --white: #1F1F1F;
    --shadow-sm: 0 2px 6px rgba(0,0,0,.4);
    --shadow-md: 0 6px 20px rgba(0,0,0,.6);
    --overlay-bg: rgba(31,31,31,0.95);
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body, #root { height:100%; }
  body { font-family:'Inter',sans-serif; background:var(--paper); color:var(--ink); -webkit-font-smoothing:antialiased; transition: background 0.3s, color 0.3s; }
  
  @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
  .anim-up    { animation:fadeUp  .42s cubic-bezier(.22,1,.36,1) both }
  .anim-in    { animation:fadeIn  .3s ease both }
  .anim-scale { animation:scaleIn .38s cubic-bezier(.22,1,.36,1) both }
  .d1{animation-delay:.07s} .d2{animation-delay:.14s} .d3{animation-delay:.21s} .d4{animation-delay:.28s} .d5{animation-delay:.35s}
  
  .lc2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .lc3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  .trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:var(--paperDkr);border-radius:99px}
  
  .card { background:var(--white); border-radius:12px; border:1px solid var(--paperDkr); box-shadow:var(--shadow-sm); transition:box-shadow .2s,transform .2s; }
  .card-lift:hover { box-shadow:var(--shadow-md); transform:translateY(-1px); }
  .card-navy  { background:var(--navy); border-color:var(--navyDk); }
  .card-paper { background:var(--paperDk); border-color:var(--paperDkr); }
  
  .btn { display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;border-radius:7px;transition:all .18s; }
  .btn:disabled { opacity:.45;cursor:not-allowed; }
  .btn-primary  { background:var(--navy);  color:#fff;           padding:8px 16px; font-size:12px; }
  .btn-primary:hover:not(:disabled) { background:var(--navyMid); }
  .btn-secondary{ background:transparent; color:var(--navy);     padding:7px 15px; font-size:12px; border:1.5px solid var(--navy); }
  .btn-secondary:hover { background:var(--navyLt); }
  .btn-danger   { background:var(--terra); color:#fff;           padding:8px 16px; font-size:12px; }
  .btn-danger:hover { background:var(--terraMid); }
  .btn-ghost    { background:transparent; color:var(--inkMid);   padding:7px 12px; font-size:11px; border:1px solid var(--paperDkr); }
  .btn-ghost:hover { background:var(--paperDk); }
  .btn-sm { padding:5px 11px !important; font-size:11px !important; }
  
  .badge { display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:99px;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:.04em;white-space:nowrap; }
  .badge-sm { font-size:9px !important; padding:1px 6px !important; }
  .badge-trending   { background:var(--terraLt); color:var(--terra); border:1px solid var(--terra); }
  .badge-navy       { background:var(--navyLt);  color:var(--navy); border:1px solid var(--navyMid); }
  .badge-gold       { background:var(--goldLt);  color:var(--goldDk); border:1px solid var(--gold); }
  .badge-neutral    { background:var(--paperDk); color:var(--inkMid); border:1px solid var(--paperDkr); }
  .badge-success    { background:#D1FAE5;       color:#065F46; border:1px solid #10B981; }
  .badge-danger     { background:#FEE2E2;       color:#B91C1C; border:1px solid #EF4444; }
  .badge-musyawarah { background:var(--navyLt);  color:var(--navy); border:1px solid var(--navyMid); }
  .badge-voting     { background:var(--goldLt);  color:var(--goldDk); border:1px solid var(--gold); }
  
  .input { width:100%;padding:9px 12px;border-radius:7px;border:1.5px solid var(--paperDkr);background:var(--white);font-family:'Inter',sans-serif;font-size:13px;color:var(--ink);outline:none;transition:border-color .18s; }
  .input:focus { border-color:var(--navy); }
  .input.textarea { resize:vertical; line-height:1.6; }
  .select-field { appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px; }
  
  .upvote-btn { display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:99px;border:1.5px solid var(--paperDkr);background:transparent;cursor:pointer;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;color:var(--inkSoft);transition:all .18s; }
  .upvote-btn:hover { border-color:var(--navy);color:var(--navy);background:var(--navyLt); }
  .upvote-btn.voted { background:var(--navy);color:#fff;border-color:var(--navy); }
  
  .progress-track { height:8px;border-radius:99px;overflow:hidden;background:var(--paperDk); }
  .progress-fill  { height:100%;border-radius:99px;transition:width .6s ease; }
  .tl-line { position:absolute;left:9px;top:20px;bottom:0;width:2px;background:var(--paperDkr); }
  .tl-dot  { width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;z-index:1; }
  
  .rule    { border:none;border-top:1px solid var(--paperDkr); }
  .caption { font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--inkSoft); }
  .meta    { font-family:'Inter',sans-serif;font-size:11px;color:var(--inkSoft); }
  
  /* Use Outfit for headings (ChaletNewYork vibe) */
  .h-editorial { font-family:'Outfit',sans-serif;font-weight:900;font-size:26px;line-height:1.15;letter-spacing:-.02em;color:var(--ink); }
  .h-section   { font-family:'Outfit',sans-serif;font-weight:700;font-size:19px;line-height:1.25;color:var(--ink); }
  .h-card      { font-family:'Outfit',sans-serif;font-weight:700;font-size:15px;line-height:1.35;color:var(--ink); }

  /* Utilities */
  .grid-forum { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .sticky-note {
    background: #FDE68A; color: #92400E; border: 1px solid #FCD34D;
    padding: 16px 20px; border-radius: 4px; box-shadow: 2px 4px 10px rgba(0,0,0,0.1);
    position: relative; cursor: pointer; transition: transform 0.2s;
  }
  .sticky-note:hover { transform: scale(1.02) !important; z-index: 10; }
  .dark-theme .sticky-note { background: #92400E; color: #FEF3C7; border-color: #B45309; }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

/* ── APP CONTEXT ─────────────────────────────────────────────── */
const AppCtx = createContext(null);
const useApp  = () => useContext(AppCtx);

/* ── SEED DATA ──────────────────────────────────────────────── */
const USERS = {
  "12345":{ name:"Hasby Wira",         role:"siswa",  kelas:"XII RPL 1" },
  "67890":{ name:"Khalifa Aisy",       role:"osis",   kelas:"OSIS"       },
  "11111":{ name:"Bu Kartini",         role:"guru",   kelas:"Guru PKn"  },
  "22222":{ name:"Rakan Shaka",        role:"admin",  kelas:"Admin"      },
};

const SEED_POSTS = [
  { id:1, type:"trending",   title:"AC Kelas XII RPL 1 Rusak Sudah 3 Minggu",            body:"Suhu kelas semakin tidak kondusif. Sudah dilaporkan ke piket namun belum ada tindak lanjut.",                                author:"Hasby Wira",    kelas:"XII RPL 1", cat:"Fasilitas", up:89,  cmt:14, time:"2 jam lalu",  pinned:true,  votesFor:0,   votesAgainst:0,  jadwal:null },
  { id:2, type:"voting",     title:"DEMOS: Perpanjangan Waktu Istirahat 15 Menit",        body:"Apakah kamu setuju waktu istirahat diperpanjang menjadi 30 menit untuk makan siang dan ibadah?",                             author:"OSIS",          kelas:"OSIS",      cat:"Kebijakan",up:134, cmt:28, time:"5 jam lalu",  pinned:false, votesFor:134, votesAgainst:42, jadwal:null },
  { id:3, type:"musyawarah", title:"Agenda Musyawarah: Revisi Tata Tertib Berpakaian",    body:"Forum perwakilan kelas bersama OSIS dan guru akan membahas usulan revisi poin 7 tata tertib.",                               author:"OSIS Admin",    kelas:"OSIS",      cat:"Peraturan", up:56,  cmt:9,  time:"1 hari lalu", pinned:false, votesFor:0,   votesAgainst:0,  jadwal:"Jumat, 25 Apr 2026 — 13.00 WIB" },
  { id:4, type:"diskusi",    title:"Ide: Kantin Sekolah Buka Sesi Malam untuk Ekskul",    body:"Untuk siswa yang ekskul sampai malam, kantin sudah tutup. Bagaimana kalau ada sesi malam minimal jam 18.00?",                author:"Khalifa Aisy",  kelas:"XI TKJ 1",  cat:"Fasilitas", up:56,  cmt:15, time:"1 hari lalu", pinned:false, votesFor:0,   votesAgainst:0,  jadwal:null },
  { id:5, type:"diskusi",    title:"Masalah Koneksi WiFi di Lab Komputer",                 body:"WiFi di lab sering putus saat jam pelajaran. Sangat mengganggu pembelajaran berbasis internet.",                             author:"Siswa XI RPL 2",kelas:"XI RPL 2",  cat:"Teknologi", up:31,  cmt:7,  time:"2 hari lalu", pinned:false, votesFor:0,   votesAgainst:0,  jadwal:null },
  { id:6, type:"diskusi",    title:"Kapan Hasil UTS Dibagikan ke Siswa?",                  body:"Sudah lewat 3 minggu sejak UTS tapi nilai belum ada di portal. Mohon informasinya dari pihak akademik.",                    author:"Siswa XII AK 1",kelas:"XII AK 1",  cat:"Akademik",  up:18,  cmt:5,  time:"3 hari lalu", pinned:false, votesFor:0,   votesAgainst:0,  jadwal:null },
];

const SEED_THREADS = [
  { id:1, title:"Diskusi: Peraturan Berpakaian Baru — Setuju atau Tidak?",  body:"OSIS baru mengumumkan peraturan berpakaian baru yang lebih ketat. Bagaimana pendapat kalian?", author:"Khalifa Aisy", kelas:"XI TKJ 1", cat:"Peraturan", up:134, time:"4 jam lalu", replies:[
    { id:1, author:"Hasby Wira", kelas:"XII RPL 1", body:"Setuju ada peraturan, tapi implementasinya harus fleksibel. Untuk praktik di lab beda kebutuhan.", up:8,  time:"3 jam lalu" },
    { id:2, author:"Rakan Shaka",kelas:"XII RPL 2", body:"Perlu dilibatkan siswa dalam perumusan aturannya, bukan hanya ditetapkan sepihak.", up:15, time:"2 jam lalu" },
  ]},
  { id:2, title:"Saran untuk Tema Pensi Akhir Tahun", body:"Panitia OSIS sedang mengumpulkan saran tema pensi akhir tahun. Yang terbanyak upvote masuk shortlist voting!", author:"OSIS Admin", kelas:"OSIS", cat:"Acara", up:67, time:"1 hari lalu", replies:[
    { id:1, author:"Siswa XII MM", kelas:"XII MM 1", body:"Tema Retro 90an! Pasti seru dan beda dari tahun-tahun sebelumnya.", up:22, time:"20 jam lalu" },
    { id:2, author:"Siswa XI RPL", kelas:"XI RPL 1", body:"Futuristic / Sci-Fi! Sesuai sama jurusan teknologi kita.", up:18, time:"18 jam lalu" },
  ]},
  { id:3, title:"Keluhan: Area Parkir Motor Semakin Sempit", body:"Sejak ada pembangunan gedung baru, parkir makin sempit. Motor sering tergores. Sudah bayar sumbangan parkir tapi fasilitas berkurang.", author:"Siswa XII TKJ", kelas:"XII TKJ 2", cat:"Fasilitas", up:28, time:"2 hari lalu", replies:[
    { id:1, author:"Hasby Wira", kelas:"XII RPL 1", body:"Ini memang urgent. Perlu dibahas di forum musyawarah agar ada keputusan resmi.", up:11, time:"1 hari lalu" },
  ]},
  { id:4, title:"Evaluasi Ekstrakulikuler Semester Ini", body:"Halo teman-teman! OSIS mau denger feedback nih soal ekskul semester ini, apa aja yang kurang dan perlu diperbaiki?", author:"Khalifa Aisy", kelas:"OSIS", cat:"Acara", up:84, time:"3 hari lalu", replies:[]}
];

const SEED_REPORTS = [
  { id:"RPT-001", cat:"Perundungan", status:"dalam-proses", title:"Kasus intimidasi di koridor gedung B", desc:"Ada sekelompok siswa yang sering mengintimidasi adik kelas di koridor gedung B setiap istirahat. Sudah berlangsung 2 minggu.", isAnon:true, author:"Anonim", nis:"anon-123", attachments: [{name: "bukti-chat.jpg", url: "#"}], time:"1 hari lalu", urgent:true,
    timeline:[{label:"Laporan Diterima",time:"1 hari lalu",done:true},{label:"Diverifikasi",time:"6 jam lalu",done:true},{label:"Dalam Penanganan",time:"2 jam lalu",done:true},{label:"Diselesaikan",time:"—",done:false}]},
  { id:"RPT-002", cat:"Fasilitas", status:"diterima", title:"Toilet lantai 3 tidak berfungsi", desc:"Toilet di lantai 3 gedung utama tidak berfungsi selama seminggu. Air tidak mengalir dan lampu mati.", isAnon:false, author:"Hasby Wira", nis:"12345", attachments: [], time:"3 jam lalu", urgent:false,
    timeline:[{label:"Laporan Diterima",time:"3 jam lalu",done:true},{label:"Diverifikasi",time:"—",done:false},{label:"Dalam Penanganan",time:"—",done:false},{label:"Diselesaikan",time:"—",done:false}]},
];

const SEED_MUSYAWARAH = [
  { id:1, judul:"Revisi Tata Tertib Berpakaian Poin 7 & 9", status:"terbuka", jadwal:"Jumat, 25 Apr 2026 — 13.00 WIB", peserta:28, quorum:24, deskripsi:"Membahas usulan revisi dua poin tata tertib yang dianggap kurang jelas dan butuh penyesuaian dengan kebutuhan praktik jurusan.", agenda:["Pembukaan & verifikasi kuorum","Paparan usulan revisi oleh OSIS","Diskusi perwakilan kelas","Voting keputusan","Penutup & dokumentasi"], hasil:null, pesertaList:[{nama:"Hasby Wira",peran:"Perwakilan XII RPL 1",hadir:true},{nama:"Khalifa Aisy",peran:"Ketua OSIS",hadir:true},{nama:"Bu Kartini",peran:"Guru PKn / Pembina",hadir:true},{nama:"Rakan Shaka",peran:"Perwakilan XII RPL 2",hadir:false},{nama:"Siswa XI TKJ",peran:"Perwakilan XI TKJ",hadir:true}]},
];

const SEED_DEMOS = [
  { id:1, judul:"Perpanjangan Waktu Istirahat 15 Menit", status:"aktif", deadline:"30 Apr 2026", deskripsi:"Apakah waktu istirahat perlu diperpanjang dari 15 menjadi 30 menit untuk ruang makan siang dan ibadah yang lebih baik?", pilihanA:"Ya, setuju diperpanjang", pilihanB:"Tidak, pertahankan 15 menit", votesA:134, votesB:42, totalEligible:312, hasVoted:false },
  { id:2, judul:"Tema Pensi Akhir Tahun 2026", status:"aktif", deadline:"28 Apr 2026", deskripsi:"Pilih tema yang paling kamu inginkan untuk pensi akhir tahun. Hasil voting akan menjadi keputusan resmi panitia.", pilihanA:"Retro 90's Nostalgia", pilihanB:"Futuristic & Sci-Fi", votesA:89, votesB:76, totalEligible:312, hasVoted:false },
];

/* ── MAPPING HELPERS ─────────────────────────────────────────── */
const CAT_BADGE = { Fasilitas:"badge-gold", Kebijakan:"badge-musyawarah", Akademik:"badge-success", Teknologi:"badge-navy", Acara:"badge-success", Perundungan:"badge-danger", Keamanan:"badge-danger", Peraturan:"badge-navy", Diskusi:"badge-neutral", Lainnya:"badge-neutral" };
const STATUS_MAP = { diterima:{l:"Diterima",cls:"badge-navy"}, diverifikasi:{l:"Diverifikasi",cls:"badge-gold"}, "dalam-proses":{l:"Dalam Proses",cls:"badge-trending"}, selesai:{l:"Selesai",cls:"badge-success"}, terbuka:{l:"Terbuka",cls:"badge-musyawarah"}, aktif:{l:"Aktif",cls:"badge-voting"} };
const TYPE_BADGE = { trending:"badge-trending", voting:"badge-voting", musyawarah:"badge-musyawarah", diskusi:"badge-neutral" };
const TYPE_LABEL = { trending:"Trending", voting:"DEMOS · Voting", musyawarah:"Musyawarah", diskusi:"Diskusi" };

/* ── SMALL COMPONENTS ──────────────────────────────────────── */
function Avatar({ name, size=32 }) {
  return <div style={{ width:size, height:size, borderRadius:"50%", background:T.navy, color:"#fff", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:size*.38 }}>{name?.[0]?.toUpperCase()}</div>;
}
function Badge({ children, cls="badge-neutral", sm }) {
  return <span className={`badge ${cls}${sm?" badge-sm":""}`}>{children}</span>;
}
function Upvote({ count, onVote, voted, theme="light" }) {
  return (
    <button className={`upvote-btn${voted?" voted":""}`} onClick={e=>{e.stopPropagation();onVote();}}>
      <svg width={9} height={9} viewBox="0 0 10 10" fill="currentColor"><path d="M5 1L9.33 8H0.67z"/></svg>
      {count}
    </button>
  );
}
function ProgressBar({ pct, color=T.navy }) {
  return <div className="progress-track"><div className="progress-fill" style={{ width:`${pct}%`, background:color }}/></div>;
}
function Rule() { return <hr className="rule" />; }
function FilterPill({ active, onClick, children }) {
  return <button onClick={onClick} style={{ padding:"5px 11px", borderRadius:99, cursor:"pointer", border:`1.5px solid ${active?T.navy:T.paperDkr}`, background:active?T.navy:"transparent", color:active?"#fff":T.inkSoft, fontSize:11, fontFamily:"'Inter',sans-serif", fontWeight:500, transition:"all .15s" }}>{children}</button>;
}

/* ── SIDEBAR ──────────────────────────────────────────────── */
const NAV = [
  { id:"home",       label:"Mading",     sub:"Beranda"    },
  { id:"forum",      label:"Forum",      sub:"Diskusi"    },
  { id:"laporan",    label:"Laporan",    sub:"& Tracking" },
  { id:"musyawarah", label:"Musyawarah", sub:"MPK Digital"},
  { id:"demos",      label:"DEMOS",      sub:"Voting"     },
];
function Sidebar({ page, setPage, user, onLogout }) {
  const roleClsMap = { siswa:"badge-navy", osis:"badge-trending", guru:"badge-gold", admin:"badge-neutral" };
  const roleColor = user.role === "admin" ? "#0F172A" : T.ink; // darker sidebar for admin

  return (
    <aside style={{ width:190, flexShrink:0, background:roleColor, display:"flex", flexDirection:"column", borderRadius:14, overflow:"hidden", position:"sticky", top:16, alignSelf:"flex-start", minHeight:540, boxShadow: "var(--shadow-md)" }}>
      <div style={{ padding:"16px 14px 14px", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:7, background:T.terra, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth={1.8}><path d="M8 2C5 2 3 4 3 6.5c0 1.5.8 2.8 2 3.5L4.5 13h7L11 10c1.2-.7 2-2 2-3.5C13 4 11 2 8 2z"/></svg>
          </div>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:16, color:"#fff", lineHeight:1 }}>SUSI</div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,.35)", letterSpacing:".1em", fontFamily:"'Inter',sans-serif", textTransform:"uppercase", marginTop:1 }}>Suara Siswa</div>
          </div>
        </div>
      </div>
      <div style={{ padding:"10px 12px", borderBottom:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", gap:8 }}>
        <Avatar name={user.name} size={28} />
        <div style={{ overflow:"hidden" }}>
          <div className="trunc" style={{ fontSize:11, fontWeight:600, color:"#fff", lineHeight:1.3 }}>{user.name}</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", fontFamily:"'Inter',sans-serif" }}>{user.kelas}</div>
        </div>
      </div>
      <nav style={{ flex:1, padding:"8px", display:"flex", flexDirection:"column", gap:1 }}>
        {NAV.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"8px 9px", borderRadius:6, border:"none", cursor:"pointer", background:active?"rgba(255,255,255,.08)":"transparent", textAlign:"left", transition:"all .15s", borderLeft:`2px solid ${active?T.terra:"transparent"}`, color:active?"#fff":"rgba(255,255,255,.4)" }}>
              <div>
                <div style={{ fontSize:12, fontWeight:active?600:400, lineHeight:1.2, fontFamily:"'Inter',sans-serif" }}>{item.label}</div>
                <div style={{ fontSize:9, opacity:.5, fontFamily:"'Inter',sans-serif" }}>{item.sub}</div>
              </div>
            </button>
          );
        })}
      </nav>
      <div style={{ padding:"8px 12px", borderTop:"1px solid rgba(255,255,255,.08)" }}>
        <Badge cls={roleClsMap[user.role]||"badge-neutral"}>{user.role.toUpperCase()}</Badge>
      </div>
      <button className="btn btn-ghost" onClick={onLogout} style={{ margin:"0 8px 12px", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.3)", fontSize:10 }}>↩ Keluar</button>
    </aside>
  );
}

/* ── LOGIN PAGE (Always Light Mode styling forced by container) ── */
function LoginPage({ onLogin }) {
  const [nis,setNis]=useState(""); const [pass,setPass]=useState(""); const [err,setErr]=useState(""); const [loading,setL]=useState(false);
  const tryLogin=(forcedNis)=>{setErr("");setL(true);setTimeout(()=>{const u=USERS[forcedNis||nis];if(u&&(forcedNis||pass==="susi123")){onLogin({...u,nis:forcedNis||nis});}else{setErr("NIS atau password salah. Demo: 12345 / susi123");setL(false);}},700);};
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#1F2937", backgroundImage:`radial-gradient(ellipse 80% 50% at 50% -5%, rgba(194,65,12,.22) 0%, transparent 60%)`, padding:24 }}>
      <div className="anim-scale" style={{ width:"100%", maxWidth:380, background:"#F5F1E8", borderRadius:16, padding:"36px 30px", boxShadow:"0 24px 64px rgba(0,0,0,.35)" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:52, height:52, borderRadius:13, background:"#C2410C", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <svg width={24} height={24} viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth={1.8}><path d="M8 2C5 2 3 4 3 6.5c0 1.5.8 2.8 2 3.5L4.5 13h7L11 10c1.2-.7 2-2 2-3.5C13 4 11 2 8 2z"/></svg>
          </div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:30, color:"#1F2937", letterSpacing:"-.02em" }}>SUSI</div>
          <div className="caption" style={{ marginTop:4, color:"#6B7280" }}>Suara Siswa — Platform Partisipasi Digital</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><label className="caption" style={{ display:"block", marginBottom:5, color:"#6B7280" }}>NIS / Nomor Induk Siswa</label><input className="input" style={{borderColor:"#E0D9C8", color:"#1F2937"}} type="text" value={nis} onChange={e=>setNis(e.target.value)} placeholder="Contoh: 12345"/></div>
          <div><label className="caption" style={{ display:"block", marginBottom:5, color:"#6B7280" }}>Password</label><input className="input" style={{borderColor:"#E0D9C8", color:"#1F2937"}} type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryLogin()} placeholder="••••••••"/></div>
          {err&&<div style={{ padding:"8px 12px", borderRadius:7, background:"#FEF2F2", border:"1px solid #FECACA", color:"#991B1B", fontSize:11, fontFamily:"'Inter',sans-serif" }}>{err}</div>}
          <button className="btn" disabled={loading} onClick={()=>tryLogin()} style={{ width:"100%", padding:"11px", fontSize:13, marginTop:2, background:"#1E3A8A", color:"#fff" }}>{loading?"Masuk...":"Masuk ke SUSI →"}</button>
        </div>
        <div style={{ marginTop:22, borderTop:`1px solid #E0D9C8`, paddingTop:16 }}>
          <p className="caption" style={{ textAlign:"center", marginBottom:10, color:"#6B7280" }}>Demo Cepat</p>
          <div style={{ display:"flex", gap:6 }}>
            {Object.entries(USERS).map(([n,u])=>(
              <button key={n} className="btn" onClick={()=>tryLogin(n)} style={{ flex:1, padding:"6px 4px", fontSize:9, flexDirection:"column", gap:1, fontFamily:"'Inter',sans-serif", background:"transparent", border:"1px solid #E0D9C8", color:"#6B7280" }}>
                <span style={{ fontSize:10, fontWeight:600 }}>{u.role.toUpperCase()}</span>
                <span style={{ opacity:.6 }}>{u.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── HOME PAGE ───────────────────────────────────────────── */
function HomePage() {
  const {user}=useApp();
  const [posts,setPosts]=useState(SEED_POSTS); const [voted,setVoted]=useState({}); const [filter,setFilter]=useState("semua"); const [search,setSearch]=useState(""); const [showForm,setShowForm]=useState(false); const [np,setNp]=useState({title:"",body:"",cat:"Fasilitas"});
  const CATS=["semua","Fasilitas","Kebijakan","Akademik","Teknologi","Acara"];
  const doVote=id=>{if(voted[id])return;setPosts(ps=>ps.map(p=>p.id===id?{...p,up:p.up+1}:p));setVoted(v=>({...v,[id]:true}));};
  const submitPost=()=>{if(!np.title.trim()||!np.body.trim())return;setPosts(ps=>[{id:Date.now(),type:"diskusi",...np,author:user.name,kelas:user.kelas,up:0,cmt:0,time:"Baru saja",pinned:false,votesFor:0,votesAgainst:0,jadwal:null},...ps]);setNp({title:"",body:"",cat:"Fasilitas"});setShowForm(false);};
  const filtered=posts.filter(p=>(filter==="semua"||p.cat===filter)&&(!search||p.title.toLowerCase().includes(search.toLowerCase())));
  const featured=filtered.find(p=>p.pinned)||filtered[0];
  const rest=featured?filtered.filter(p=>p.id!==featured.id):filtered;
  const trending=[...posts].sort((a,b)=>b.up-a.up).slice(0,3);
  return (
    <div>
      <div className="anim-up" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:16 }}>
        <div><h1 className="h-editorial">Mading Digital</h1><p className="meta" style={{ marginTop:4 }}>{new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p></div>
        {(user.role !== 'guru') && <button className="btn btn-primary" style={{ fontSize:11 }} onClick={()=>setShowForm(!showForm)}>{showForm?"✕ Tutup":"+ Buat Postingan"}</button>}
      </div>
      <Rule />
      {showForm&&(
        <div className="anim-scale card" style={{ padding:"18px 20px", margin:"14px 0", borderLeft:`3px solid var(--terra)`, borderRadius:"0 12px 12px 0" }}>
          <p className="caption" style={{ marginBottom:12 }}>Buat Postingan Baru</p>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            <select className="input select-field" value={np.cat} onChange={e=>setNp(n=>({...n,cat:e.target.value}))}>{["Fasilitas","Kebijakan","Akademik","Teknologi","Acara"].map(c=><option key={c}>{c}</option>)}</select>
            <input className="input" value={np.title} onChange={e=>setNp(n=>({...n,title:e.target.value}))} placeholder="Judul postingan..."/>
            <textarea className="input textarea" rows={2} value={np.body} onChange={e=>setNp(n=>({...n,body:e.target.value}))} placeholder="Isi postingan..."/>
            <div style={{ display:"flex", gap:7, justifyContent:"flex-end" }}><button className="btn btn-ghost btn-sm" onClick={()=>setShowForm(false)}>Batal</button><button className="btn btn-primary btn-sm" onClick={submitPost}>Kirim</button></div>
          </div>
        </div>
      )}
      <div className="anim-up d1" style={{ display:"flex", gap:16, margin:"14px 0", alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{CATS.map(c=><FilterPill key={c} active={filter===c} onClick={()=>setFilter(c)}>{c==="semua"?"Semua":c}</FilterPill>)}</div>
        <input className="input" style={{ width:180, padding:"5px 10px", fontSize:12, marginLeft:"auto" }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari..."/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 240px", gap:16 }}>
        <div>
          {featured&&(
            <div className="anim-up d2 card card-navy card-lift" style={{ padding:"22px 24px", marginBottom:14, cursor:"pointer", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-24, right:-24, width:130, height:130, borderRadius:"50%", background:"rgba(255,255,255,.03)" }}/>
              <div style={{ display:"flex", gap:6, marginBottom:10 }}><Badge cls={TYPE_BADGE[featured.type]||"badge-neutral"}>{TYPE_LABEL[featured.type]||"Diskusi"}</Badge>{featured.pinned&&<Badge cls="badge-trending">Pinned</Badge>}<Badge cls={CAT_BADGE[featured.cat]||"badge-neutral"} sm>{featured.cat}</Badge></div>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:20, lineHeight:1.3, color:"#fff", marginBottom:8 }}>{featured.title}</h2>
              <p className="lc2" style={{ fontSize:13, color:"rgba(255,255,255,.7)", lineHeight:1.7, marginBottom:14 }}>{featured.body}</p>
              {featured.type==="voting"&&(
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}><span style={{ fontSize:11, color:"rgba(255,255,255,.6)", fontFamily:"'Inter',sans-serif" }}>Setuju: {featured.votesFor}</span><span style={{ fontSize:11, color:"rgba(255,255,255,.6)", fontFamily:"'Inter',sans-serif" }}>Tidak: {featured.votesAgainst}</span></div>
                  <div className="progress-track" style={{ background:"rgba(255,255,255,.15)" }}><div className="progress-fill" style={{ width:`${Math.round(featured.votesFor/(featured.votesFor+featured.votesAgainst||1)*100)}%`, background:"var(--gold)" }}/></div>
                </div>
              )}
              <div style={{ display:"flex", alignItems:"center", gap:10, borderTop:"1px solid rgba(255,255,255,.12)", paddingTop:12 }}>
                <Avatar name={featured.author} size={22}/>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.6)", fontFamily:"'Inter',sans-serif" }}>{featured.author} · {featured.kelas}</span>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontFamily:"'Inter',sans-serif" }}>{featured.time}</span>
                  <button className="upvote-btn voted" style={{ background:"rgba(255,255,255,.15)", borderColor:"rgba(255,255,255,.2)", color:"#fff" }} onClick={e=>{e.stopPropagation();doVote(featured.id);}}><svg width={9} height={9} viewBox="0 0 10 10" fill="currentColor"><path d="M5 1L9.33 8H0.67z"/></svg>{featured.up+(voted[featured.id]?1:0)}</button>
                </div>
              </div>
            </div>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {rest.slice(0,4).map((p,i)=>(
              <div key={p.id} className="anim-up card card-lift" style={{ padding:"14px 16px", cursor:"pointer", animationDelay:`${i*.06}s` }}>
                <div style={{ display:"flex", gap:5, marginBottom:8 }}><Badge cls={TYPE_BADGE[p.type]||"badge-neutral"} sm>{TYPE_LABEL[p.type]||"Diskusi"}</Badge></div>
                <h3 className="h-card" style={{ fontSize:13, marginBottom:6 }}>{p.title}</h3>
                <p className="lc2" style={{ fontSize:12, color:"var(--inkSoft)", lineHeight:1.6, marginBottom:10 }}>{p.body}</p>
                {p.type==="voting"&&(<div style={{ marginBottom:10 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:10, color:"var(--navy)", fontFamily:"'Inter',sans-serif", fontWeight:600 }}>Setuju: {p.votesFor}</span><span style={{ fontSize:10, color:"var(--terra)", fontFamily:"'Inter',sans-serif", fontWeight:600 }}>Tidak: {p.votesAgainst}</span></div><ProgressBar pct={Math.round(p.votesFor/(p.votesFor+p.votesAgainst||1)*100)}/></div>)}
                {p.type==="musyawarah"&&p.jadwal&&(<div style={{ fontSize:10, color:"var(--navy)", fontFamily:"'Inter',sans-serif", fontWeight:500, background:"var(--navyLt)", padding:"4px 8px", borderRadius:5, marginBottom:8 }}>{p.jadwal}</div>)}
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Upvote count={p.up} onVote={()=>doVote(p.id)} voted={voted[p.id]}/>
                  <span style={{ fontSize:10, color:"var(--inkFaint)", fontFamily:"'Inter',sans-serif" }}>{p.cmt} komentar</span>
                  <span style={{ marginLeft:"auto", fontSize:10, color:"var(--inkFaint)", fontFamily:"'Inter',sans-serif" }}>{p.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div className="anim-up d3 card-paper" style={{ borderRadius:12, padding:"14px 16px", border:`1px solid var(--paperDkr)` }}>
            <p className="caption" style={{ marginBottom:12 }}>Trending Sekarang</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {trending.map((p,i)=>(
                <div key={p.id} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ width:20, height:20, borderRadius:4, background:i===0?"var(--terra)":i===1?"var(--navy)":"var(--paperDkr)", color:i<2?"#fff":"var(--inkSoft)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, flexShrink:0, fontFamily:"'Inter',sans-serif" }}>{i+1}</div>
                  <div><div className="lc2" style={{ fontSize:11, fontWeight:500, lineHeight:1.4, color:"var(--ink)" }}>{p.title}</div><div style={{ fontSize:10, color:"var(--inkFaint)", marginTop:2, fontFamily:"'Inter',sans-serif" }}>{p.up} suara · {p.time}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="anim-up d4" style={{ borderRadius:12, padding:"14px 16px", background:"var(--navy)", color:"#fff" }}>
            <p style={{ fontSize:10, fontWeight:600, letterSpacing:".05em", textTransform:"uppercase", fontFamily:"'Inter',sans-serif", opacity:.5, marginBottom:12 }}>Statistik Hari Ini</p>
            {[{l:"Postingan",v:posts.length},{l:"Total Suara",v:posts.reduce((s,p)=>s+p.up,0)},{l:"Diskusi Aktif",v:posts.filter(p=>p.type==="diskusi").length}].map((s,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:i<2?8:0, borderBottom:i<2?"1px solid rgba(255,255,255,.08)":"none", marginBottom:i<2?8:0 }}>
                <span style={{ fontSize:11, opacity:.55, fontFamily:"'Inter',sans-serif" }}>{s.l}</span>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:"var(--gold)" }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FORUM PAGE ──────────────────────────────────────────── */
function ForumPage() {
  const {user}=useApp();
  const [threads,setThreads]=useState(SEED_THREADS); const [sel,setSel]=useState(null); const [voted,setVoted]=useState({}); const [reply,setReply]=useState(""); const [showNew,setNew]=useState(false); const [nt,setNt]=useState({title:"",body:"",cat:"Diskusi"}); const [filter,setFilter]=useState("semua");
  const doVoteT=id=>{if(voted["t"+id])return;setThreads(ts=>ts.map(t=>t.id===id?{...t,up:t.up+1}:t));setVoted(v=>({...v,["t"+id]:true}));};
  const doVoteR=(tid,rid)=>{const k="r"+tid+"-"+rid;if(voted[k])return;setThreads(ts=>ts.map(t=>t.id===tid?{...t,replies:t.replies.map(r=>r.id===rid?{...r,up:r.up+1}:r)}:t));setVoted(v=>({...v,[k]:true}));};
  const sendReply=()=>{if(!reply.trim()||!sel)return;const nr={id:Date.now(),author:user.name,kelas:user.kelas,body:reply,up:0,time:"Baru saja"};setThreads(ts=>ts.map(t=>t.id===sel.id?{...t,replies:[...t.replies,nr]}:t));setSel(s=>({...s,replies:[...s.replies,nr]}));setReply("");};
  const submitT=()=>{if(!nt.title.trim())return;setThreads(ts=>[{id:Date.now(),...nt,author:user.name,kelas:user.kelas,up:0,time:"Baru saja",replies:[]},...ts]);setNt({title:"",body:"",cat:"Diskusi"});setNew(false);};
  const filtered=threads.filter(t=>filter==="semua"||t.cat===filter);
  
  if(sel){
    const t=threads.find(x=>x.id===sel.id)||sel;
    return (
      <div className="anim-in">
        <button className="btn btn-ghost btn-sm" onClick={()=>setSel(null)} style={{ marginBottom:16 }}>← Kembali</button>
        <div className="card" style={{ padding:"20px 22px", marginBottom:14 }}>
          <div style={{ display:"flex", gap:6, marginBottom:10 }}><Badge cls={CAT_BADGE[t.cat]||"badge-neutral"}>{t.cat}</Badge></div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:19, fontWeight:700, lineHeight:1.35, marginBottom:10 }}>{t.title}</h2>
          <p style={{ fontSize:13, color:"var(--inkMid)", lineHeight:1.7, marginBottom:16 }}>{t.body}</p>
          <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:12, borderTop:`1px solid var(--paperDkr)` }}>
            <Avatar name={t.author} size={26}/><span className="meta">{t.author} · {t.kelas} · {t.time}</span>
            <div style={{ marginLeft:"auto" }}><Upvote count={t.up} onVote={()=>doVoteT(t.id)} voted={voted["t"+t.id]}/></div>
          </div>
        </div>
        <p className="caption" style={{ marginBottom:10 }}>{t.replies.length} balasan</p>
        <div className="grid-forum" style={{ marginBottom:16 }}>
          {t.replies.map((r,i)=>(
            <div key={r.id} className="anim-up card" style={{ padding:"12px 14px", animationDelay:`${i*.04}s`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                <Avatar name={r.author} size={22}/><span style={{ fontSize:11, fontWeight:600, fontFamily:"'Inter',sans-serif" }}>{r.author}</span><span className="meta" style={{ marginLeft:4 }}>{r.kelas}</span>
                <div style={{ marginLeft:"auto" }}><Upvote count={r.up} onVote={()=>doVoteR(t.id,r.id)} voted={voted["r"+t.id+"-"+r.id]}/></div>
              </div>
              <p style={{ fontSize:13, color:"var(--inkMid)", lineHeight:1.65, flex:1 }}>{r.body}</p>
              <div className="meta" style={{ marginTop:8, textAlign: 'right', fontSize:9 }}>{r.time}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:"14px 16px", borderLeft:`3px solid var(--navy)`, borderRadius:"0 12px 12px 0" }}>
          <div style={{ display:"flex", gap:9, alignItems:"flex-start" }}>
            <Avatar name={user.name} size={26}/>
            <div style={{ flex:1 }}>
              <textarea className="input textarea" rows={2} value={reply} onChange={e=>setReply(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&e.ctrlKey)sendReply();}} placeholder="Tulis balasan... (Ctrl+Enter untuk kirim)"/>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:7 }}><button className="btn btn-primary btn-sm" onClick={sendReply}>Kirim Balasan</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const topVoted = [...filtered].sort((a,b)=>b.up - a.up).slice(0, 3);

  return (
    <div>
      <div className="anim-up" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:14 }}>
        <div><h1 className="h-editorial">Forum Diskusi</h1><p className="meta" style={{ marginTop:4 }}>Ruang diskusi terbuka — Jam Kosong Edition</p></div>
        {(user.role !== 'guru') && <button className="btn btn-primary" style={{ fontSize:11 }} onClick={()=>setNew(!showNew)}>{showNew?"✕ Tutup":"+ Thread Baru"}</button>}
      </div>
      <Rule/>
      
      {/* ── STICKY NOTES ── */}
      {topVoted.length > 0 && (
        <div className="anim-up d1" style={{ marginBottom: 24, marginTop: 14 }}>
          <p className="caption" style={{ marginBottom:10 }}>🔥 Topik Hangat</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:16 }}>
            {topVoted.map((t, i) => (
              <div key={`sticky-${t.id}`} className="sticky-note" 
                   style={{ transform: `rotate(${i%2===0 ? '-1deg' : '2deg'})` }} 
                   onClick={() => setSel(t)}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <Badge cls="badge-voting" sm>📌 Sticky Note</Badge>
                  <span style={{ fontSize:11, fontWeight:800 }}>▲ {t.up}</span>
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8, fontFamily:"'Outfit',sans-serif", lineHeight:1.3 }}>{t.title}</h3>
                <p className="lc2" style={{ fontSize:12, lineHeight:1.6, opacity:0.8 }}>{t.body}</p>
                <div className="meta" style={{ marginTop:8, opacity: 0.7, color: 'inherit' }}>{t.replies.length} balasan • {t.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showNew&&(
        <div className="anim-scale card" style={{ padding:"16px 18px", margin:"14px 0", borderLeft:`3px solid var(--navy)`, borderRadius:"0 12px 12px 0" }}>
          <p className="caption" style={{ marginBottom:10 }}>Buat Thread Baru</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <select className="input select-field" value={nt.cat} onChange={e=>setNt(n=>({...n,cat:e.target.value}))}>{["Diskusi","Fasilitas","Peraturan","Acara","Lainnya"].map(c=><option key={c}>{c}</option>)}</select>
            <input className="input" value={nt.title} onChange={e=>setNt(n=>({...n,title:e.target.value}))} placeholder="Judul thread..."/>
            <textarea className="input textarea" rows={2} value={nt.body} onChange={e=>setNt(n=>({...n,body:e.target.value}))} placeholder="Isi diskusi..."/>
            <div style={{ display:"flex", gap:7, justifyContent:"flex-end" }}><button className="btn btn-ghost btn-sm" onClick={()=>setNew(false)}>Batal</button><button className="btn btn-primary btn-sm" onClick={submitT}>Buat Thread</button></div>
          </div>
        </div>
      )}
      <div className="anim-up d1" style={{ display:"flex", gap:5, margin:"14px 0", flexWrap:"wrap" }}>
        {["semua","Fasilitas","Peraturan","Acara","Diskusi"].map(c=><FilterPill key={c} active={filter===c} onClick={()=>setFilter(c)}>{c==="semua"?"Semua":c}</FilterPill>)}
      </div>
      
      {/* ── GRID LAYOUT ── */}
      <div className="grid-forum">
        {filtered.map((t,i)=>(
          <div key={t.id} className="anim-up card card-lift" style={{ padding:"14px 16px", cursor:"pointer", animationDelay:`${i*.06}s`, display: 'flex', flexDirection: 'column' }} onClick={()=>setSel(t)}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
              <Avatar name={t.author} size={24}/><span style={{ fontSize:11, fontWeight:600, fontFamily:"'Inter',sans-serif", color: "var(--ink)" }}>{t.author}</span>
              <div style={{ marginLeft:"auto" }}><Badge cls={CAT_BADGE[t.cat]||"badge-neutral"} sm>{t.cat}</Badge></div>
            </div>
            <h3 className="h-card" style={{ marginBottom:5 }}>{t.title}</h3>
            <p className="lc2" style={{ fontSize:12, color:"var(--inkSoft)", lineHeight:1.6, marginBottom:10, flex: 1 }}>{t.body}</p>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginTop: 'auto' }}>
              <Upvote count={t.up} onVote={()=>doVoteT(t.id)} voted={voted["t"+t.id]}/>
              <span style={{ fontSize:10, color:"var(--inkFaint)", fontFamily:"'Inter',sans-serif" }}>{t.replies.length} balasan</span>
              <span style={{ marginLeft:"auto", fontSize:10, color:"var(--navy)", fontFamily:"'Inter',sans-serif", fontWeight:500 }}>Buka →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── LAPORAN PAGE ─────────────────────────────────────────── */
function LaporanPage() {
  const {user}=useApp();
  const [reports,setReports]=useState(SEED_REPORTS); 
  const [tab,setTab]=useState("form"); 
  const [loading,setLoading]=useState(false); 
  const [submitted,setSubmit]=useState(null); 
  const [trackCode,setTC]=useState(""); 
  const [trackResult,setTR]=useState(null); 
  const [trackErr,setTE]=useState(""); 
  const [form,setForm]=useState({cat:"Perundungan",title:"",desc:"",urgent:false,isAnon:true});
  const [attachments, setAttachments]=useState([]);

  const CATS=["Perundungan","Fasilitas","Keamanan","Akademik","Lainnya"];
  
  const submitReport=()=>{
    if(!form.title.trim()||!form.desc.trim())return;
    setLoading(true);
    setTimeout(()=>{
      const id="RPT-"+String(reports.length+1).padStart(3,"0");
      const r={
        id,...form, attachments,
        author:form.isAnon?"Anonim":user.name,
        nis: form.isAnon?"anon-"+user.nis:user.nis, // store actual reference but blinded in UI
        status:"diterima", time:"Baru saja",
        timeline:[
          {label:"Laporan Diterima",time:"Baru saja",done:true},
          {label:"Diverifikasi",time:"—",done:false},
          {label:"Dalam Penanganan",time:"—",done:false},
          {label:"Diselesaikan",time:"—",done:false}
        ]
      };
      setReports(rs=>[...rs,r]);setSubmit(id);setLoading(false);
      setAttachments([]);
    },900);
  };
  
  const doTrack=()=>{
    setTE("");setTR(null);
    // Allow tracking any report if admin/guru, otherwise normally tracked by code
    const f=reports.find(r=>r.id.toLowerCase()===trackCode.trim().toLowerCase());
    if(f)setTR(f);else setTE("Kode tidak ditemukan. Coba: RPT-001");
  };

  const updateReportStatus = (id, newStatus, newLabel) => {
    setReports(rs => rs.map(r => {
      if(r.id !== id) return r;
      const updatedTimeline = r.timeline.map(t => {
        if(t.label === newLabel) return { ...t, done: true, time: "Baru saja" };
        return t;
      });
      const nr = { ...r, status: newStatus, timeline: updatedTimeline };
      if (trackResult && trackResult.id === id) setTR(nr);
      return nr;
    }));
  };

  const isAdminOrGuru = user.role === 'admin' || user.role === 'guru';
  // Admin & Guru view all, Siswa view own
  const visibleReports = isAdminOrGuru 
    ? reports 
    : reports.filter(r => r.nis === user.nis || r.nis === `anon-${user.nis}`);

  return (
    <div>
      <div className="anim-up" style={{ marginBottom:16 }}><h1 className="h-editorial">Sistem Laporan</h1><p className="meta" style={{ marginTop:4 }}>Laporkan masalah secara aman & terpantau</p><div style={{ marginTop:8 }}/><Rule/></div>
      <div className="anim-up d1" style={{ display:"flex", gap:0, marginBottom:20, background:"var(--paperDk)", borderRadius:7, padding:3, width:"fit-content" }}>
        {((!isAdminOrGuru) ? [["form","Buat Laporan"],["tracking","Lacak Status"]] : [["tracking","Kelola Laporan"]]).map(([id,label])=>(
          <button key={id} onClick={()=>{setTab(id);setSubmit(null);setTR(null);setTE("");}} style={{ padding:"7px 16px", borderRadius:5, border:"none", background:tab===id?"var(--white)":"transparent", color:tab===id?"var(--ink)":"var(--inkSoft)", fontWeight:tab===id?600:400, fontSize:12, fontFamily:"'Inter',sans-serif", cursor:"pointer", transition:"all .18s", boxShadow:tab===id?"var(--shadow-sm)":"none" }}>{label}</button>
        ))}
      </div>
      
      {tab==="form"&&(submitted
        ?(<div className="anim-scale card" style={{ padding:28, textAlign:"center", maxWidth:400, borderTop:`3px solid var(--navy)` }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"var(--navyLt)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}><svg width={20} height={20} viewBox="0 0 16 16" fill="none" stroke="var(--navy)" strokeWidth={2}><path d="M3 8l3.5 3.5L13 4"/></svg></div>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, marginBottom:8 }}>Laporan Terkirim</h2>
            <p style={{ fontSize:12, color:"var(--inkSoft)", marginBottom:18, lineHeight:1.6 }}>Simpan kode berikut untuk melacak status penanganan laporanmu.</p>
            <div style={{ background:"var(--paperDk)", borderRadius:7, padding:"12px 18px", marginBottom:16, border:`1.5px dashed var(--navy)` }}><p className="caption" style={{ marginBottom:4 }}>Kode Laporan Kamu</p><p style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:700, color:"var(--navy)", letterSpacing:".04em" }}>{submitted}</p></div>
            <button className="btn btn-secondary" onClick={()=>{setSubmit(null);setForm({cat:"Perundungan",title:"",desc:"",urgent:false,isAnon:true});}}>Buat Laporan Lain</button>
          </div>)
        :(<div className="anim-up" style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap: "wrap" }}>
            <div className="card" style={{ flex:1, minWidth:280, padding:"20px 22px" }}>
              <p className="caption" style={{ marginBottom:14 }}>Detail Laporan</p>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div><label className="caption" style={{ display:"block", marginBottom:6 }}>Kategori</label><div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{CATS.map(c=><FilterPill key={c} active={form.cat===c} onClick={()=>setForm(f=>({...f,cat:c}))}>{c}</FilterPill>)}</div></div>
                <div><label className="caption" style={{ display:"block", marginBottom:5 }}>Judul *</label><input className="input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Jelaskan masalah secara singkat..."/></div>
                <div><label className="caption" style={{ display:"block", marginBottom:5 }}>Deskripsi *</label><textarea className="input textarea" rows={3} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Kapan, di mana, apa yang terjadi..."/></div>
                
                {/* File Upload Section */}
                <div>
                  <label className="caption" style={{ display:"block", marginBottom:5 }}>Lampiran (Maks 3 file: Foto/Video/Audio)</label>
                  <label style={{ display: 'block', padding: '12px', border: '1.5px dashed var(--paperDkr)', borderRadius: 7, textAlign: 'center', cursor: 'pointer', background: 'var(--paperDk)' }}>
                    <span style={{ fontSize: 12, color: 'var(--inkMid)', fontWeight: 500 }}>+ Tambah Lampiran</span>
                    <input type="file" multiple accept="image/*,video/*,audio/*" onChange={e => {
                        const files = Array.from(e.target.files).slice(0,3);
                        setAttachments(files.map(f => ({ name: f.name, url: URL.createObjectURL(f) })));
                    }} style={{ display: 'none' }} />
                  </label>
                  {attachments.length > 0 && (
                    <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
                      {attachments.map((att, i) => (
                        <div key={i} style={{ padding:"4px 8px", background:"var(--paperDk)", borderRadius:5, fontSize:11, display:"flex", alignItems:"center", gap:6, border:`1px solid var(--paperDkr)`, color: "var(--ink)" }}>
                          <span className="trunc" style={{ maxWidth:100 }}>{att.name}</span>
                          <button onClick={() => setAttachments(atts => atts.filter((_, idx)=>idx!==i))} style={{ border:"none", background:"transparent", cursor:"pointer", color:"var(--terra)" }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {[{key:"isAnon",label:"Laporkan Anonim",desc:"Identitas terlindungi"},{key:"urgent",label:"Tandai Urgent",desc:"Penanganan segera"}].map(opt=>(
                    <label key={opt.key} style={{ flex:1, minWidth:140, display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:7, border:`1.5px solid ${form[opt.key]?"var(--navy)":"var(--paperDkr)"}`, cursor:"pointer", background:form[opt.key]?"var(--navyLt)":"transparent", transition:"all .18s" }}>
                      <input type="checkbox" checked={form[opt.key]} onChange={e=>setForm(f=>({...f,[opt.key]:e.target.checked}))} style={{ marginTop:2, accentColor:"var(--navy)" }}/>
                      <div><div style={{ fontSize:11, fontWeight:600, fontFamily:"'Inter',sans-serif", color: "var(--ink)" }}>{opt.label}</div><div style={{ fontSize:10, color:"var(--inkSoft)", fontFamily:"'Inter',sans-serif" }}>{opt.desc}</div></div>
                    </label>
                  ))}
                </div>
                <button className="btn btn-primary" disabled={loading||!form.title.trim()||!form.desc.trim()} onClick={submitReport} style={{ width:"100%", fontSize:13 }}>{loading?"Mengirim...":"Kirim Laporan"}</button>
              </div>
            </div>
            <div style={{ width:200, flexShrink:0, display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ background:"#1F2937", borderRadius:12, padding:"14px 16px", color:"#fff" }}><p className="caption" style={{ opacity:.5, marginBottom:10 }}>Jaminan Kerahasiaan</p>{["Identitas anonim terlindungi sistem","Tidak ada rekam jejak ke akun","Hanya pihak berwenang yang menerima"].map(t=><div key={t} style={{ fontSize:11, opacity:.55, marginBottom:6, paddingLeft:10, borderLeft:"2px solid rgba(255,255,255,.15)" }}>{t}</div>)}</div>
              <div style={{ background:"#FEF0E8", borderRadius:12, padding:"12px 14px", border:"1px solid #F7BCA0" }}><p className="caption" style={{ color:"#C2410C", marginBottom:6 }}>Laporan Urgent</p><p style={{ fontSize:11, color:"#9A2D08", lineHeight:1.6 }}>Laporan urgent langsung diteruskan ke BK dalam 1×24 jam.</p></div>
            </div>
          </div>)
      )}
      {tab==="tracking"&&(
        <div className="anim-up">
          <div className="card" style={{ padding:"18px 20px", marginBottom:16 }}>
            <p className="caption" style={{ marginBottom:10 }}>Lacak Status Laporan</p>
            <div style={{ display:"flex", gap:8 }}>
              <input className="input" style={{ flex:1, fontFamily:"'Outfit',sans-serif" }} value={trackCode} onChange={e=>setTC(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doTrack()} placeholder="Masukkan kode... Contoh: RPT-001"/>
              <button className="btn btn-primary" onClick={doTrack}>Lacak</button>
            </div>
            {trackErr&&<p style={{ marginTop:8, fontSize:11, color:"var(--terra)", fontFamily:"'Inter',sans-serif" }}>{trackErr}</p>}
          </div>
          {trackResult&&(
            <div className="anim-scale card" style={{ padding:"20px 22px", marginBottom:16, borderTop:`3px solid var(--navy)` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div>
                  <p className="caption" style={{ marginBottom:4 }}>{trackResult.id} • Oleh: {trackResult.author}</p>
                  <h3 style={{ fontFamily:"'Outfit',sans-serif", fontSize:16, fontWeight:700 }}>{trackResult.title}</h3>
                  <p style={{ fontSize:12, color:"var(--inkSoft)", marginTop:4, lineHeight:1.6 }}>{trackResult.desc}</p>
                  {trackResult.attachments?.length > 0 && (
                    <div style={{ marginTop:14 }}>
                      <p className="caption" style={{ marginBottom:6 }}>Lampiran File</p>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {trackResult.attachments.map((att, i) => (
                          <a key={i} href={att.url} target="_blank" rel="noreferrer" style={{ padding:"6px 10px", background:"var(--navyLt)", border:`1px solid var(--navy)`, borderRadius:6, textDecoration:"none", color:"var(--navy)", fontSize:11, display:"flex", alignItems:"center", gap:6 }}>
                            📄 {att.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end", marginLeft:12, flexShrink:0 }}>
                  <Badge cls={(STATUS_MAP[trackResult.status]||{}).cls||"badge-neutral"}>{(STATUS_MAP[trackResult.status]||{l:trackResult.status}).l}</Badge>
                  {trackResult.urgent&&<Badge cls="badge-danger">Urgent</Badge>}
                  <Badge cls={CAT_BADGE[trackResult.cat]||"badge-neutral"} sm>{trackResult.cat}</Badge>
                </div>
              </div>

              {isAdminOrGuru && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px dashed var(--paperDkr)`, background: "var(--paperDk)", padding: "12px", borderRadius: 8 }}>
                  <p className="caption" style={{ marginBottom: 10 }}>Aksi Kelola Laporan (Admin/Guru)</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: "wrap" }}>
                    {trackResult.status === 'diterima' && <button className="btn btn-secondary" onClick={()=>updateReportStatus(trackResult.id, 'diverifikasi', 'Diverifikasi')}>Tandai: Verifikasi ✓</button>}
                    {trackResult.status === 'diverifikasi' && <button className="btn btn-secondary" onClick={()=>updateReportStatus(trackResult.id, 'dalam-proses', 'Dalam Penanganan')}>Mulai Penanganan 🔄</button>}
                    {trackResult.status === 'dalam-proses' && <button className="btn btn-primary" onClick={()=>updateReportStatus(trackResult.id, 'selesai', 'Diselesaikan')}>Tandai Selesai ✅</button>}
                    {trackResult.status === 'selesai' && <span style={{ fontSize: 11, color: "var(--inkMid)", fontWeight: 600 }}>Laporan telah selesai ditangani.</span>}
                  </div>
                </div>
              )}

              <div style={{ paddingTop:14, borderTop:`1px solid var(--paperDkr)`, marginTop: 12 }}>
                <p className="caption" style={{ marginBottom:12 }}>Timeline Penanganan</p>
                <div style={{ position:"relative", paddingLeft:4 }}>
                  <div className="tl-line"/>
                  {trackResult.timeline.map((step,i)=>(
                    <div key={i} style={{ display:"flex", gap:12, marginBottom:12, position:"relative" }}>
                      <div className="tl-dot" style={{ background:step.done?"var(--navy)":"var(--paperDkr)", border:`2px solid ${step.done?"var(--navy)":"var(--paperDkr)"}` }}>{step.done&&<svg width={9} height={9} viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M3 8l3.5 3.5L13 4"/></svg>}</div>
                      <div style={{ paddingTop:1 }}><div style={{ fontSize:12, fontWeight:step.done?600:400, color:step.done?"var(--ink)":"var(--inkSoft)", fontFamily:"'Inter',sans-serif" }}>{step.label}</div><div className="meta">{step.time}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <p className="caption" style={{ marginBottom:10 }}>{isAdminOrGuru ? "Semua Laporan Masuk" : "Laporan Saya"}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {visibleReports.length === 0 && <div className="meta" style={{ padding: 12 }}>Belum ada laporan.</div>}
            {visibleReports.map((r,i)=>(
              <div key={r.id} className="anim-up card card-lift" style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", animationDelay:`${i*.04}s` }} onClick={()=>{setTR(r);setTC(r.id);}}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:5, marginBottom:3, flexWrap:"wrap" }}><Badge cls={CAT_BADGE[r.cat]||"badge-neutral"} sm>{r.cat}</Badge>{r.urgent&&<Badge cls="badge-danger" sm>Urgent</Badge>}{r.isAnon&&<Badge sm>Anonim</Badge>}</div>
                  <div className="trunc" style={{ fontSize:12, fontWeight:500, fontFamily:"'Inter',sans-serif" }}>{r.title}</div>
                  <div className="meta">{r.id} · {r.time} {isAdminOrGuru && !r.isAnon && `· Oleh: ${r.author}`}</div>
                </div>
                <Badge cls={(STATUS_MAP[r.status]||{}).cls||"badge-neutral"}>{(STATUS_MAP[r.status]||{l:r.status}).l}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MUSYAWARAH PAGE ─────────────────────────────────────── */
function MusyawarahPage() {
  const {user}=useApp();
  const [sessions,setSessions]=useState(SEED_MUSYAWARAH); const [sel,setSel]=useState(null); const [showForm,setForm]=useState(false); const [ns,setNs]=useState({judul:"",deskripsi:"",jadwal:""});
  const submitNew=()=>{if(!ns.judul.trim())return;setSessions(ss=>[{id:Date.now(),...ns,status:"terbuka",peserta:0,quorum:24,agenda:[],hasil:null,pesertaList:[{nama:user.name,peran:"Pembuat",hadir:true}]},...ss]);setNs({judul:"",deskripsi:"",jadwal:""});setForm(false);};
  if(sel){
    const s=sessions.find(x=>x.id===sel.id)||sel;
    const hadir=s.pesertaList.filter(p=>p.hadir).length;
    return (
      <div className="anim-in">
        <button className="btn btn-ghost btn-sm" onClick={()=>setSel(null)} style={{ marginBottom:16 }}>← Kembali</button>
        <div className="card" style={{ padding:"22px 24px", marginBottom:14, borderTop:`3px solid var(--navy)` }}>
          <div style={{ display:"flex", gap:6, marginBottom:12 }}><Badge cls={(STATUS_MAP[s.status]||{}).cls||"badge-neutral"}>{(STATUS_MAP[s.status]||{l:s.status}).l}</Badge><Badge cls="badge-musyawarah">MPK Digital</Badge></div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:700, lineHeight:1.3, marginBottom:8 }}>{s.judul}</h2>
          <p style={{ fontSize:13, color:"var(--inkMid)", lineHeight:1.7, marginBottom:14 }}>{s.deskripsi}</p>
          {s.jadwal&&<div style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 12px", borderRadius:7, background:"var(--navyLt)", marginBottom:4 }}><svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="var(--navy)" strokeWidth={1.5}><rect x={2} y={3} width={12} height={11} rx={1}/><path d="M5 1v3M11 1v3M2 7h12"/></svg><span style={{ fontSize:12, color:"var(--navy)", fontWeight:500, fontFamily:"'Inter',sans-serif" }}>{s.jadwal}</span></div>}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <div className="card" style={{ padding:"16px 18px" }}>
            <p className="caption" style={{ marginBottom:10 }}>Status Kehadiran</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8 }}><span style={{ fontSize:13, color:"var(--inkMid)" }}>{hadir} / {s.peserta} hadir</span><span style={{ fontSize:12, color:"var(--navy)", fontFamily:"'Inter',sans-serif", fontWeight:600 }}>{Math.round(hadir/(s.peserta||1)*100)}%</span></div>
            <ProgressBar pct={Math.round(hadir/(s.peserta||1)*100)}/>
            <p className="meta" style={{ marginTop:6 }}>Kuorum: {s.quorum} peserta</p>
          </div>
          <div className="card" style={{ padding:"16px 18px" }}>
            <p className="caption" style={{ marginBottom:10 }}>Agenda</p>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {s.agenda.map((a,i)=>(
                <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background:"var(--navyLt)", color:"var(--navy)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, flexShrink:0, marginTop:1, fontFamily:"'Inter',sans-serif" }}>{i+1}</div>
                  <span style={{ fontSize:11, color:"var(--inkMid)", lineHeight:1.5 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ padding:"16px 18px", marginBottom:14 }}>
          <p className="caption" style={{ marginBottom:12 }}>Daftar Peserta</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {s.pesertaList.map((p,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:7, background:p.hadir?"var(--navyLt)":"var(--paperDk)" }}>
                <Avatar name={p.nama} size={26}/>
                <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600, fontFamily:"'Inter',sans-serif" }}>{p.nama}</div><div className="meta">{p.peran}</div></div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:7, height:7, borderRadius:"50%", background:p.hadir?"#10B981":"#D1D5DB" }}/><span style={{ fontSize:10, color:p.hadir?"#065F46":"var(--inkFaint)", fontFamily:"'Inter',sans-serif", fontWeight:500 }}>{p.hadir?"Hadir":"Belum"}</span></div>
              </div>
            ))}
          </div>
        </div>
        {s.hasil&&<div style={{ borderRadius:12, padding:"16px 20px", background:"var(--navy)", color:"#fff" }}><p className="caption" style={{ opacity:.5, marginBottom:8 }}>Keputusan Resmi</p><p style={{ fontSize:13, lineHeight:1.7, opacity:.9 }}>{s.hasil}</p></div>}
      </div>
    );
  }
  return (
    <div>
      <div className="anim-up" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:14 }}>
        <div><h1 className="h-editorial">Forum Musyawarah</h1><p className="meta" style={{ marginTop:4 }}>MPK Digital — Musyawarah Perwakilan Kelas</p></div>
        {(user.role==="osis"||user.role==="admin"||user.role==="guru")&&<button className="btn btn-primary" style={{ fontSize:11 }} onClick={()=>setForm(!showForm)}>{showForm?"✕ Tutup":"+ Buat Sesi"}</button>}
      </div>
      <Rule/>
      {showForm&&(
        <div className="anim-scale card" style={{ padding:"18px 20px", margin:"14px 0", borderLeft:`3px solid var(--navy)`, borderRadius:"0 12px 12px 0" }}>
          <p className="caption" style={{ marginBottom:12 }}>Buat Sesi Musyawarah Baru</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <input className="input" value={ns.judul} onChange={e=>setNs(n=>({...n,judul:e.target.value}))} placeholder="Judul agenda musyawarah..."/>
            <textarea className="input textarea" rows={2} value={ns.deskripsi} onChange={e=>setNs(n=>({...n,deskripsi:e.target.value}))} placeholder="Deskripsi singkat..."/>
            <input className="input" value={ns.jadwal} onChange={e=>setNs(n=>({...n,jadwal:e.target.value}))} placeholder="Jadwal: Jumat, 25 Apr 2026 — 13.00 WIB"/>
            <div style={{ display:"flex", gap:7, justifyContent:"flex-end" }}><button className="btn btn-ghost btn-sm" onClick={()=>setForm(false)}>Batal</button><button className="btn btn-primary btn-sm" onClick={submitNew}>Buat Sesi</button></div>
          </div>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:14 }}>
        {sessions.map((s,i)=>(
          <div key={s.id} className="anim-up card card-lift" style={{ padding:"18px 20px", cursor:"pointer", animationDelay:`${i*.07}s`, borderLeft:`3px solid ${s.status==="terbuka"?"var(--navy)":"var(--paperDkr)"}`, borderRadius:"0 12px 12px 0" }} onClick={()=>setSel(s)}>
            <div style={{ display:"flex", gap:6, marginBottom:10 }}><Badge cls={(STATUS_MAP[s.status]||{}).cls||"badge-neutral"}>{(STATUS_MAP[s.status]||{l:s.status}).l}</Badge><Badge cls="badge-musyawarah" sm>MPK Digital</Badge></div>
            <h3 className="h-card" style={{ fontSize:15, marginBottom:6 }}>{s.judul}</h3>
            <p className="lc2" style={{ fontSize:12, color:"var(--inkSoft)", lineHeight:1.6, marginBottom:12 }}>{s.deskripsi}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
              {[{label:"Peserta",val:s.peserta},{label:"Kuorum",val:s.quorum}].map(m=>(<div key={m.label} style={{ background:"var(--paperDk)", borderRadius:7, padding:"7px 10px" }}><div className="meta" style={{ marginBottom:2 }}>{m.label}</div><div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, color:"var(--navy)" }}>{m.val}</div></div>))}
            </div>
            {s.jadwal&&<div style={{ fontSize:11, color:"var(--navy)", fontFamily:"'Inter',sans-serif", fontWeight:500, marginBottom:8 }}>{s.jadwal}</div>}
            <div style={{ display:"flex", justifyContent:"flex-end" }}><span style={{ fontSize:11, color:"var(--navy)", fontFamily:"'Inter',sans-serif", fontWeight:500 }}>Lihat Detail →</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── DEMOS PAGE ──────────────────────────────────────────── */
function DemosPage() {
  const {user}=useApp();
  const [items,setItems]=useState(SEED_DEMOS); const [sel,setSel]=useState(null); const [filter,setFilter]=useState("semua");
  const doVote=(id,pilihan)=>{setItems(its=>its.map(it=>{if(it.id!==id||it.hasVoted)return it;return{...it,hasVoted:true,votesA:pilihan==="A"?it.votesA+1:it.votesA,votesB:pilihan==="B"?it.votesB+1:it.votesB};}));if(sel?.id===id)setSel(s=>s?{...s,hasVoted:true,votesA:pilihan==="A"?s.votesA+1:s.votesA,votesB:pilihan==="B"?s.votesB+1:s.votesB}:s);};
  const VoteCard=({it,detail})=>{
    const total=it.votesA+it.votesB||1; const pctA=Math.round(it.votesA/total*100); const pctB=100-pctA;
    return (
      <div className="card" style={{ padding:detail?"22px 24px":"16px 18px", borderTop:detail?`3px solid var(--gold)`:"none" }}>
        <div style={{ display:"flex", gap:6, marginBottom:10 }}><Badge cls={(STATUS_MAP[it.status]||{}).cls||"badge-voting"}>{(STATUS_MAP[it.status]||{l:it.status}).l}</Badge><Badge cls="badge-voting" sm>DEMOS</Badge></div>
        {detail?<h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:19, fontWeight:700, lineHeight:1.3, marginBottom:8 }}>{it.judul}</h2>:<h3 className="h-card" style={{ marginBottom:6 }}>{it.judul}</h3>}
        <p style={{ fontSize:12, color:"var(--inkSoft)", lineHeight:1.65, marginBottom:14 }} className={detail?"":"lc2"}>{it.deskripsi}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
          {[{p:it.pilihanA,v:it.votesA,pct:pctA,color:"var(--navy)",key:"A"},{p:it.pilihanB,v:it.votesB,pct:pctB,color:"var(--terra)",key:"B"}].map(opt=>(
            <div key={opt.key}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
                <span style={{ fontSize:12, fontWeight:500, fontFamily:"'Inter',sans-serif", color:opt.color }}>{opt.p}</span>
                <span style={{ fontSize:12, fontFamily:"'Outfit',sans-serif", fontWeight:700, color:"var(--ink)" }}>{opt.pct}%  ({opt.v})</span>
              </div>
              <ProgressBar pct={opt.pct} color={opt.color}/>
            </div>
          ))}
        </div>
        {!it.hasVoted&&it.status==="aktif"
          ?(<div style={{ display:"flex", gap:8 }}><button className="btn btn-primary" style={{ flex:1, fontSize:11 }} onClick={e=>{e.stopPropagation();doVote(it.id,"A");}}>{it.pilihanA}</button><button className="btn btn-danger" style={{ flex:1, fontSize:11 }} onClick={e=>{e.stopPropagation();doVote(it.id,"B");}}>{it.pilihanB}</button></div>)
          :(<div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", borderRadius:7, background:it.hasVoted?"var(--navyLt)":"var(--paperDk)" }}>
              {it.hasVoted?<svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="var(--navy)" strokeWidth={2}><path d="M3 8l3.5 3.5L13 4"/></svg>:<svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="var(--inkSoft)" strokeWidth={1.5}><circle cx={8} cy={8} r={6}/><path d="M8 5v3M8 11h.01"/></svg>}
              <span style={{ fontSize:12, color:it.hasVoted?"var(--navy)":"var(--inkSoft)", fontWeight:500, fontFamily:"'Inter',sans-serif" }}>{it.hasVoted?"Suaramu telah tercatat":it.status==="selesai"?"Voting telah berakhir":""}</span>
              <span className="meta" style={{ marginLeft:"auto" }}>{it.totalEligible} pemilih</span>
            </div>)
        }
        <p className="meta" style={{ marginTop:10 }}>Batas voting: {it.deadline}</p>
      </div>
    );
  };
  if(sel){
    const it=items.find(x=>x.id===sel.id)||sel;
    return (
      <div className="anim-in">
        <button className="btn btn-ghost btn-sm" onClick={()=>setSel(null)} style={{ marginBottom:16 }}>← Kembali</button>
        <VoteCard it={it} detail/>
        <div style={{ marginTop:12, padding:"12px 16px", borderRadius:7, background:"var(--paperDk)", border:`1px solid var(--paperDkr)` }}><p style={{ fontSize:11, color:"var(--inkSoft)", lineHeight:1.7 }}>Voting bersifat anonim dan transparan. Hasilnya akan diumumkan setelah batas waktu berakhir dan menjadi keputusan resmi yang mengikat.</p></div>
      </div>
    );
  }
  const filtered=items.filter(it=>filter==="semua"||it.status===filter);
  return (
    <div>
      <div className="anim-up" style={{ marginBottom:14 }}><h1 className="h-editorial">DEMOS</h1><p className="meta" style={{ marginTop:4 }}>Demokrasi Siswa — Satu Siswa, Satu Suara</p><div style={{ marginTop:8 }}/><Rule/></div>
      <div className="anim-up d1" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
        {[{l:"Voting Aktif",v:items.filter(i=>i.status==="aktif").length,hi:true},{l:"Total Pemilih",v:312,hi:false},{l:"Sudah Divoting",v:items.filter(i=>i.hasVoted).length,hi:false}].map((s,i)=>(
          <div key={i} style={{ background:s.hi?"var(--navy)":"var(--paperDk)", borderRadius:10, padding:"12px 14px", border:`1px solid var(--paperDkr)` }}>
            <div className="meta" style={{ color:s.hi?"rgba(255,255,255,.5)":"var(--inkSoft)", marginBottom:4 }}>{s.l}</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:22, color:s.hi?"var(--gold)":"var(--navy)" }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div className="anim-up d2" style={{ display:"flex", gap:5, marginBottom:14 }}>
        {[["semua","Semua"],["aktif","Aktif"],["selesai","Selesai"]].map(([val,label])=><FilterPill key={val} active={filter===val} onClick={()=>setFilter(val)}>{label}</FilterPill>)}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map((it,i)=>(
          <div key={it.id} className="anim-up card-lift" style={{ animationDelay:`${i*.06}s`, cursor:"pointer" }} onClick={()=>setSel(it)}>
            <VoteCard it={it} detail={false}/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ROOT APP ────────────────────────────────────────────── */
const PAGE_MAP   = { home:HomePage, forum:ForumPage, laporan:LaporanPage, musyawarah:MusyawarahPage, demos:DemosPage };
const PAGE_TITLE = { home:"Mading Digital", forum:"Forum Diskusi", laporan:"Sistem Laporan", musyawarah:"Musyawarah", demos:"DEMOS" };

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("light");
  const [showProfile, setShowProfile] = useState(false);

  // Re-apply theme changes to document body for the GlobalStyles CSS to intercept it
  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const Page = PAGE_MAP[page] || HomePage;

  return (
    <AppCtx.Provider value={{ user, setUser, theme, setTheme }}>
      <GlobalStyles />
      {!user
        ? <LoginPage onLogin={u => { setUser(u); setTheme('light'); }} />
        : (
          <div style={{ display:"flex", gap:16, padding:"16px", minHeight:"100vh", maxWidth:1100, margin:"0 auto" }}>
            <Sidebar page={page} setPage={setPage} user={user} onLogout={()=>{setUser(null);setPage("home");setTheme('light');}} />
            <main style={{ flex:1, minWidth:0, position:"relative" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, paddingBottom:12, borderBottom:`1px solid var(--paperDkr)` }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span className="meta">SUSI</span>
                  <span style={{ color:"var(--paperDkr)", fontSize:13 }}>/</span>
                  <span style={{ fontSize:11, color:"var(--inkMid)", fontFamily:"'Inter',sans-serif", fontWeight:500 }}>{PAGE_TITLE[page]}</span>
                </div>
                
                {/* Overlay Profile Trigger */}
                <div style={{ position: "relative" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }} onClick={() => setShowProfile(!showProfile)}>
                    <span style={{ fontSize:11, color:"var(--inkSoft)" }}>Halo, <strong style={{ color:"var(--ink)" }}>{user.name}</strong></span>
                    <Avatar name={user.name} size={26} />
                  </div>

                  {showProfile && (
                    <>
                      {/* Click outside bounds helper */}
                      <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowProfile(false)} />
                      
                      {/* Dropdown Profile Card */}
                      <div className="anim-scale card" style={{ 
                        position:"absolute", top:"100%", right:0, marginTop:10, width:280, 
                        background: "var(--overlay-bg)", backdropFilter: "blur(12px)",
                        padding:"20px", zIndex:100, boxShadow:"var(--shadow-md)"
                      }}>
                        <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:18 }}>
                          <Avatar name={user.name} size={46} />
                          <div>
                            <div style={{ fontSize:15, fontWeight:700, color:"var(--ink)", fontFamily:"'Outfit',sans-serif" }}>{user.name}</div>
                            <div className="meta" style={{ marginTop:4 }}>{user.kelas} • <span style={{ textTransform:"uppercase" }}>{user.role}</span></div>
                          </div>
                        </div>
                        
                        <Rule />
                        
                        <div style={{ marginTop:16, marginBottom:16 }}>
                          <p className="caption" style={{ marginBottom:8 }}>Tentang Aplikasi</p>
                          <p style={{ fontSize:12, color:"var(--inkMid)", lineHeight:1.6 }}>
                            SUSI (Suara Siswa) adalah platform partisipasi digital untuk memfasilitasi opini dan musyawarah siswa secara aman dan transparan.
                          </p>
                          <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
                            <span style={{ fontSize:11, fontWeight:600, color:"var(--ink)" }}>Versi Aplikasi</span>
                            <Badge sm cls="badge-navy">v2.1.0</Badge>
                          </div>
                        </div>
                        
                        <Rule />
                        
                        <div style={{ marginTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <span style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>🌙 Dark Mode</span>
                          <button onClick={() => toggleTheme()} style={{
                            width: 44, height: 24, borderRadius: 12, background: theme === 'dark' ? "var(--navy)" : "var(--paperDkr)",
                            border: "none", cursor: "pointer", transition: "all 0.3s", position: "relative"
                          }}>
                            <div style={{
                              position: "absolute", top: 2, left: theme === 'dark' ? 22 : 2, width: 20, height: 20,
                              borderRadius: "50%", background: "#fff", transition: "all 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                            }} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
              <Page key={page} />
            </main>
          </div>
        )
      }
    </AppCtx.Provider>
  );
}
