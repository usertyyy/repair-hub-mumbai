import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Wrench, Wind, Refrigerator, WashingMachine,
  Bell, Search, ChevronDown, TrendingUp, TrendingDown, Clock,
  CheckCircle2, XCircle, AlertCircle, Phone, MapPin, Calendar,
  MoreVertical, Filter, Download, Eye, Trash2, Star, Activity,
  ArrowUpRight, ArrowDownRight, Settings, LogOut, Menu, X, Zap,
  RefreshCw, BadgeCheck, CircleDot
} from "lucide-react";
import { toast } from "sonner";

// ── MOCK DATA ──────────────────────────────────────────────────────────────
const CATEGORIES = {
  AC: { label: "AC Repair", icon: Wind, color: "from-cyan-500 to-blue-600", light: "bg-cyan-500/10 text-cyan-400", dot: "bg-cyan-400" },
  FRIDGE: { label: "Fridge Repair", icon: Refrigerator, color: "from-violet-500 to-purple-700", light: "bg-violet-500/10 text-violet-400", dot: "bg-violet-400" },
  WASHING: { label: "Washing Machine", icon: WashingMachine, color: "from-emerald-500 to-teal-600", light: "bg-emerald-500/10 text-emerald-400", dot: "bg-emerald-400" },
};

const AC_BRANDS = ["Daikin", "LG", "Samsung", "Voltas", "Blue Star", "Carrier", "Hitachi", "Panasonic"];
const FRIDGE_BRANDS = ["LG", "Samsung", "Whirlpool", "Haier", "Godrej", "Bosch", "Panasonic", "Hitachi"];
const WASHING_MACHINE_BRANDS = ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Haier", "Godrej", "Panasonic"];

const STATUS_CFG = {
  New:        { cls: "bg-blue-500/15 text-blue-400 border border-blue-500/25",     icon: CircleDot },
  Assigned:   { cls: "bg-amber-500/15 text-amber-400 border border-amber-500/25",  icon: AlertCircle },
  "In Progress":{ cls: "bg-violet-500/15 text-violet-400 border border-violet-500/25", icon: RefreshCw },
  Completed:  { cls: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25", icon: CheckCircle2 },
  Cancelled:  { cls: "bg-red-500/15 text-red-400 border border-red-500/25",        icon: XCircle },
};

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

const NAMES = ["Arjun Sharma","Priya Mehta","Rahul Gupta","Sneha Patel","Vikram Singh","Anjali Rao","Karan Joshi","Deepa Nair","Amit Verma","Pooja Das","Rajesh Kumar","Sunita Sharma","Mohit Aggarwal","Neha Jain","Suresh Reddy","Kavya Pillai","Rohit Agarwal","Divya Kapoor","Manish Tiwari","Ritu Sinha"];
const CITIES = ["Delhi","Mumbai","Bangalore","Chennai","Hyderabad","Pune","Kolkata","Ahmedabad","Jaipur","Surat"];
const STATUSES = ["New","Assigned","In Progress","Completed","Cancelled"];

const LEADS = Array.from({ length: 40 }, (_, i) => {
  const cat = randomFrom(["AC","FRIDGE","WASHING"]);
  const brands = cat === "AC" ? AC_BRANDS : cat === "FRIDGE" ? FRIDGE_BRANDS : WASHING_MACHINE_BRANDS;
  const d = new Date(Date.now() - randomInt(0, 30) * 86400000);
  return {
    id: `SVC-${1000 + i}`,
    name: randomFrom(NAMES),
    phone: `+91 ${randomInt(7000000000, 9999999999)}`,
    city: randomFrom(CITIES),
    category: cat,
    brand: randomFrom(brands),
    issue: randomFrom(["Not cooling","Water leakage","Noisy operation","Not switching on","Vibration issue","Error code","Gas refill needed","PCB issue"]),
    status: randomFrom(STATUSES),
    date: d.toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }),
    rating: randomInt(3,5),
    amount: randomInt(300, 3500),
  };
});

// ── STAT CARDS ─────────────────────────────────────────────────────────────
const stats = [
  { label:"Total Leads", value: LEADS.length, change:+12.5, icon: Users, gradient:"from-blue-600 to-cyan-500" },
  { label:"New Requests", value: LEADS.filter(l=>l.status==="New").length, change:+8.3, icon: Zap, gradient:"from-violet-600 to-purple-500" },
  { label:"Completed Jobs", value: LEADS.filter(l=>l.status==="Completed").length, change:+22.1, icon: BadgeCheck, gradient:"from-emerald-600 to-teal-500" },
  { label:"Revenue (₹)", value: LEADS.filter(l=>l.status==="Completed").reduce((s,l)=>s+l.amount,0).toLocaleString("en-IN"), change:-3.2, icon: TrendingUp, gradient:"from-amber-500 to-orange-500" },
];

// ── NAV ITEMS ──────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", label:"Dashboard", icon: LayoutDashboard },
  { id:"leads",     label:"All Leads",  icon: Users },
  { id:"ac",        label:"AC Repairs",  icon: Wind },
  { id:"fridge",    label:"Fridge Repairs", icon: Refrigerator },
  { id:"washing",   label:"Washing Machine",icon: WashingMachine },
];

// ── SPARKLINE (SVG) ────────────────────────────────────────────────────────
function Sparkline({ color = "#22d3ee" }) {
  const pts = Array.from({length:12},()=>randomInt(20,80));
  const max=Math.max(...pts), min=Math.min(...pts);
  const norm=pts.map(p=>60-((p-min)/(max-min||1))*50);
  const path=norm.map((y,i)=>`${i===0?"M":"L"}${(i/(pts.length-1))*200},${y}`).join(" ");
  return (
    <svg viewBox="0 0 200 70" className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${path} L200,70 L0,70 Z`} fill={`url(#g-${color})`}/>
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── BAR CHART ──────────────────────────────────────────────────────────────
function BarChart() {
  const months = ["Sep","Oct","Nov","Dec","Jan","Feb"];
  const ac =    [18,24,20,32,28,35];
  const fridge= [12,15,14,18,16,22];
  const wash =  [10,13,11,16,14,19];
  const max = Math.max(...ac,...fridge,...wash);

  return (
    <div className="flex items-end gap-2 h-36 w-full">
      {months.map((m,i)=>(
        <div key={m} className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-end gap-[2px] w-full h-28">
            {[ac[i], fridge[i], wash[i]].map((v, j) => (
              <div key={j} style={{height:`${(v/max)*100}%`}}
                className={`flex-1 rounded-t transition-all duration-700 ${
                  j===0?"bg-cyan-500":j===1?"bg-violet-500":"bg-emerald-500"
                } opacity-90 hover:opacity-100`}/>
            ))}
          </div>
          <span className="text-[10px] text-slate-500">{m}</span>
        </div>
      ))}
    </div>
  );
}

// ── DONUT CHART ────────────────────────────────────────────────────────────
function DonutChart({ data }) {
  const total = data.reduce((s,d)=>s+d.value,0);
  let offset=0;
  const r=60, cx=70, cy=70, circ=2*Math.PI*r;
  const segments=data.map(d=>{
    const pct=d.value/total;
    const dash=pct*circ;
    const s={...d,dash,offset,pct};
    offset+=dash;
    return s;
  });
  return (
    <div className="flex items-center gap-6">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth="18"/>
        {segments.map((s,i)=>(
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={s.color} strokeWidth="18"
            strokeDasharray={`${s.dash} ${circ-s.dash}`}
            strokeDashoffset={-s.offset + circ/4}
            strokeLinecap="butt"
            style={{transition:"all 0.7s ease"}}/>
        ))}
        <text x={cx} y={cy-6} textAnchor="middle" fill="#f1f5f9" fontSize="20" fontWeight="700">{total}</text>
        <text x={cx} y={cy+14} textAnchor="middle" fill="#64748b" fontSize="10">Total</text>
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((d,i)=>(
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{background:d.color}}/>
            <span className="text-xs text-slate-400">{d.label}</span>
            <span className="text-xs font-semibold text-slate-200 ml-auto pl-4">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCat, setFilterCat] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  // Filtered leads for leads table
  const categoryMap = { ac:"AC", fridge:"FRIDGE", washing:"WASHING" };
  const tableCat = categoryMap[activeNav];

  const filtered = LEADS.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQ.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQ.toLowerCase()) ||
      l.brand.toLowerCase().includes(searchQ.toLowerCase());
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchCat = (activeNav === "dashboard" || activeNav === "leads")
      ? (filterCat === "All" || l.category === filterCat)
      : l.category === tableCat;
    return matchSearch && matchStatus && matchCat;
  });

  // Donut data
  const donutData = [
    { label:"AC Repair",   value: LEADS.filter(l=>l.category==="AC").length,      color:"#22d3ee" },
    { label:"Fridge",      value: LEADS.filter(l=>l.category==="FRIDGE").length,   color:"#a78bfa" },
    { label:"Washing M.",  value: LEADS.filter(l=>l.category==="WASHING").length,  color:"#34d399" },
  ];

  const statusDonut = [
    { label:"New",         value: LEADS.filter(l=>l.status==="New").length,         color:"#60a5fa" },
    { label:"In Progress", value: LEADS.filter(l=>l.status==="In Progress").length, color:"#c084fc" },
    { label:"Completed",   value: LEADS.filter(l=>l.status==="Completed").length,   color:"#34d399" },
    { label:"Cancelled",   value: LEADS.filter(l=>l.status==="Cancelled").length,   color:"#f87171" },
  ];

  const showTable = ["leads","ac","fridge","washing"].includes(activeNav);
  const pageTitle = activeNav==="dashboard" ? "Dashboard Overview"
    : activeNav==="leads" ? "All Service Leads"
    : activeNav==="ac" ? "AC Repair Leads"
    : activeNav==="fridge" ? "Fridge Repair Leads"
    : "Washing Machine Leads";

  return (
    <div className="flex h-screen bg-[#060b14] text-slate-100 overflow-hidden" style={{fontFamily:"'DM Sans',sans-serif"}}>

      {/* ─── SIDEBAR ─── */}
      <aside className={`${sidebarOpen?"w-64":"w-16"} transition-all duration-300 bg-[#0d1525] border-r border-slate-800/60 flex flex-col z-50 shrink-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800/60">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
            <Wrench size={15} className="text-white"/>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-bold text-white leading-tight tracking-tight">Customer Service Centre</p>
              <p className="text-[10px] text-slate-500">Admin Panel</p>
            </div>
          )}
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="ml-auto text-slate-500 hover:text-slate-300 transition-colors">
            {sidebarOpen ? <X size={16}/> : <Menu size={16}/>}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {NAV.map(n => {
            const Icon = n.icon;
            const active = activeNav === n.id;
            return (
              <button key={n.id} onClick={()=>setActiveNav(n.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${active
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                    : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"}`}>
                <Icon size={18} className={active?"text-cyan-400":"text-slate-500 group-hover:text-slate-300"}/>
                {sidebarOpen && <span>{n.label}</span>}
                {active && sidebarOpen && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"/>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 border-t border-slate-800/60 pt-4 flex flex-col gap-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-800/50 hover:text-slate-300 transition-all">
            <Settings size={17}/>{sidebarOpen && "Settings"}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={17}/>{sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <header className="h-14 bg-[#0d1525]/80 backdrop-blur border-b border-slate-800/60 flex items-center gap-4 px-6 shrink-0">
          <div>
            <h1 className="text-sm font-bold text-white">{pageTitle}</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                placeholder="Search leads…"
                className="w-48 bg-slate-800/60 border border-slate-700/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:w-64 transition-all"/>
            </div>
            {/* Notification Bell */}
            <button className="relative w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors">
              <Bell size={15}/>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400"/>
            </button>
            {/* Avatar */}
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-2.5 py-1.5 cursor-pointer hover:border-slate-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold">A</div>
              <span className="text-xs text-slate-300 font-medium">Admin</span>
              <ChevronDown size={12} className="text-slate-500"/>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin" style={{scrollbarWidth:"thin",scrollbarColor:"#1e293b transparent"}}>

          {/* ─── DASHBOARD VIEW ─── */}
          {activeNav === "dashboard" && (
            <div className="flex flex-col gap-6">

              {/* Stat Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s,i)=>{
                  const Icon = s.icon;
                  const pos = s.change > 0;
                  const colors = ["#22d3ee","#a78bfa","#34d399","#fbbf24"];
                  return (
                    <div key={i} className="relative bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5 overflow-hidden group hover:border-slate-700/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20">
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-[0.07] -mr-6 -mt-6 group-hover:opacity-10 transition-opacity`}/>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon size={18} className="text-white"/>
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${pos?"bg-emerald-500/15 text-emerald-400":"bg-red-500/15 text-red-400"}`}>
                          {pos?<ArrowUpRight size={11}/>:<ArrowDownRight size={11}/>}
                          {Math.abs(s.change)}%
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-0.5">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                      <div className="mt-3 opacity-60">
                        <Sparkline color={colors[i]}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Bar Chart */}
                <div className="xl:col-span-2 bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-bold text-white">Monthly Leads by Category</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Last 6 months performance</p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      {[["AC","bg-cyan-500"],["Fridge","bg-violet-500"],["Washing","bg-emerald-500"]].map(([l,c])=>(
                        <span key={l} className="flex items-center gap-1.5 text-slate-400">
                          <span className={`w-2 h-2 rounded-sm ${c}`}/>{l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <BarChart/>
                </div>

                {/* Donut – Category split */}
                <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white mb-1">Category Split</h3>
                  <p className="text-xs text-slate-500 mb-4">All-time distribution</p>
                  <DonutChart data={donutData}/>
                </div>
              </div>

              {/* Status + Recent Leads */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Status Donut */}
                <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white mb-1">Status Overview</h3>
                  <p className="text-xs text-slate-500 mb-4">Current pipeline</p>
                  <DonutChart data={statusDonut}/>
                </div>

                {/* Recent Leads */}
                <div className="xl:col-span-2 bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Recent Leads</h3>
                    <button onClick={()=>setActiveNav("leads")} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                      View all <ArrowUpRight size={12}/>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {LEADS.slice(0,6).map((l,i)=>{
                      const Cat = CATEGORIES[l.category];
                      const CatIcon = Cat.icon;
                      const St = STATUS_CFG[l.status];
                      const StIcon = St.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                          <div className={`w-8 h-8 rounded-lg ${Cat.light} flex items-center justify-center shrink-0`}>
                            <CatIcon size={14}/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white truncate">{l.name}</span>
                              <span className="text-[10px] text-slate-500 shrink-0">{l.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-slate-500">{l.brand}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-600"/>
                              <span className="text-[10px] text-slate-500">{l.city}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${St.cls}`}>
                            <StIcon size={9}/>{l.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Brand Performance */}
              <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Top Brands by Requests</h3>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  {Object.entries(CATEGORIES).map(([key,Cat])=>{
                    const brands = key==="AC"?AC_BRANDS:key==="FRIDGE"?FRIDGE_BRANDS:WASHING_MACHINE_BRANDS;
                    const brandCounts = brands.map(b=>({
                      brand:b,
                      count: LEADS.filter(l=>l.category===key&&l.brand===b).length
                    })).sort((a,b)=>b.count-a.count).slice(0,4);
                    const max = Math.max(...brandCounts.map(b=>b.count));
                    const CatIcon = Cat.icon;
                    return (
                      <div key={key}>
                        <div className={`flex items-center gap-2 mb-3 text-xs font-semibold ${Cat.light.split(" ")[1]}`}>
                          <CatIcon size={13}/> {Cat.label}
                        </div>
                        <div className="flex flex-col gap-2">
                          {brandCounts.map((b,i)=>(
                            <div key={i}>
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <span className="text-slate-400">{b.brand}</span>
                                <span className="text-slate-500 font-medium">{b.count}</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-slate-800">
                                <div className={`h-full rounded-full bg-gradient-to-r ${Cat.color} transition-all duration-700`}
                                  style={{width:`${(b.count/max)*100}%`}}/>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─── LEADS TABLE VIEW ─── */}
          {showTable && (
            <div className="flex flex-col gap-4">
              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Status filter */}
                <div className="flex items-center gap-1.5 bg-[#0d1525] border border-slate-800/60 rounded-xl p-1">
                  {["All",...Object.keys(STATUS_CFG)].map(s=>(
                    <button key={s} onClick={()=>setFilterStatus(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${filterStatus===s?"bg-cyan-500/20 text-cyan-400 border border-cyan-500/30":"text-slate-500 hover:text-slate-300"}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {/* Category filter (only on all-leads) */}
                {(activeNav==="dashboard"||activeNav==="leads") && (
                  <div className="flex items-center gap-1.5 bg-[#0d1525] border border-slate-800/60 rounded-xl p-1">
                    {["All","AC","FRIDGE","WASHING"].map(c=>(
                      <button key={c} onClick={()=>setFilterCat(c)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${filterCat===c?"bg-violet-500/20 text-violet-400 border border-violet-500/30":"text-slate-500 hover:text-slate-300"}`}>
                        {c==="All"?"All":CATEGORIES[c].label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-slate-500">{filtered.length} leads</span>
                  <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-lg transition-colors">
                    <Download size={13}/> Export
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/60 bg-slate-900/40">
                        {["Lead ID","Customer","Category / Brand","Issue","Location","Date","Status","Amount","Action"].map(h=>(
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((l, i)=>{
                        const Cat = CATEGORIES[l.category];
                        const CatIcon = Cat.icon;
                        const St = STATUS_CFG[l.status];
                        const StIcon = St.icon;
                        return (
                          <tr key={l.id} className={`border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors ${i%2===0?"":"bg-slate-900/10"}`}>
                            <td className="px-4 py-3 text-xs font-mono text-cyan-400/80 whitespace-nowrap">{l.id}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-[11px] font-bold text-slate-300 shrink-0">
                                  {l.name[0]}
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-white whitespace-nowrap">{l.name}</div>
                                  <div className="text-[10px] text-slate-500">{l.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-0.5">
                                <span className={`text-[10px] font-medium flex items-center gap-1 ${Cat.light.split(" ")[1]}`}>
                                  <CatIcon size={10}/>{Cat.label}
                                </span>
                                <span className="text-[10px] text-slate-500">{l.brand}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{l.issue}</td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
                                <MapPin size={10} className="text-slate-600"/>{l.city}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-[10px] text-slate-500 whitespace-nowrap">
                                <Calendar size={10}/>{l.date}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${St.cls}`}>
                                <StIcon size={9}/>{l.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-white whitespace-nowrap">
                              {l.status==="Completed" ? `₹${l.amount.toLocaleString("en-IN")}` : <span className="text-slate-600">–</span>}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={()=>setSelectedLead(l)}
                                  className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 flex items-center justify-center text-slate-500 transition-colors">
                                  <Eye size={11}/>
                                </button>
                                <button className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-500 transition-colors">
                                  <Trash2 size={11}/>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="py-16 text-center text-slate-600 text-sm">No leads found</div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─── LEAD DETAIL MODAL ─── */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={()=>setSelectedLead(null)}>
          <div className="bg-[#0d1525] border border-slate-700/60 rounded-2xl w-full max-w-md shadow-2xl" onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div>
                <p className="text-[10px] font-mono text-cyan-400/70">{selectedLead.id}</p>
                <h2 className="text-base font-bold text-white">{selectedLead.name}</h2>
              </div>
              <button onClick={()=>setSelectedLead(null)} className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors">
                <X size={14}/>
              </button>
            </div>
            {/* Body */}
            <div className="p-5 flex flex-col gap-3">
              {/* Category badge */}
              {(() => {
                const Cat = CATEGORIES[selectedLead.category];
                const CatIcon = Cat.icon;
                const St = STATUS_CFG[selectedLead.status];
                const StIcon = St.icon;
                return (
                  <>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg ${Cat.light}`}>
                        <CatIcon size={13}/>{Cat.label} — {selectedLead.brand}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg ${St.cls}`}>
                        <StIcon size={11}/>{selectedLead.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Phone", selectedLead.phone, Phone],
                        ["City", selectedLead.city, MapPin],
                        ["Issue", selectedLead.issue, Wrench],
                        ["Date", selectedLead.date, Calendar],
                        ["Amount", selectedLead.status==="Completed"?`₹${selectedLead.amount.toLocaleString("en-IN")}`:"Pending", Activity],
                        ["Rating", selectedLead.status==="Completed"?`${"★".repeat(selectedLead.rating)}${"☆".repeat(5-selectedLead.rating)}`:"–", Star],
                      ].map(([label, value, Icon])=>(
                        <div key={label} className="bg-slate-800/40 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1">
                            <Icon size={10}/>{label}
                          </div>
                          <div className="text-xs font-semibold text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
              {/* Actions */}
              <div className="flex gap-2 mt-1">
                <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  Mark Complete
                </button>
                <button className="flex-1 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors">
                  Assign Technician
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}