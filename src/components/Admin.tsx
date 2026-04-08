import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import {
  LayoutDashboard, Users, Wrench, Wind, Refrigerator, WashingMachine,
  Bell, Search, ChevronDown, TrendingUp, TrendingDown, Clock,
  CheckCircle2, XCircle, AlertCircle, Phone, MapPin, Calendar,
  MoreVertical, Filter, Download, Eye, Trash2, Star, Activity,
  ArrowUpRight, ArrowDownRight, Settings, LogOut, Menu, X, Zap,
  RefreshCw, BadgeCheck, CircleDot, Loader2
} from "lucide-react";
import { toast } from "sonner";

// ── CONFIGURATION ──────────────────────────────────────────────────────────
const CATEGORIES: any = {
  AC: { label: "AC Repair", icon: Wind, color: "from-cyan-500 to-blue-600", light: "bg-cyan-500/10 text-cyan-400", dot: "bg-cyan-400" },
  Fridge: { label: "Fridge Repair", icon: Refrigerator, color: "from-violet-500 to-purple-700", light: "bg-violet-500/10 text-violet-400", dot: "bg-violet-400" },
  "Washing Machine": { label: "Washing Machine", icon: WashingMachine, color: "from-emerald-500 to-teal-600", light: "bg-emerald-500/10 text-emerald-400", dot: "bg-emerald-400" },
  Other: { label: "Other Repair", icon: Wrench, color: "from-slate-500 to-slate-600", light: "bg-slate-500/10 text-slate-400", dot: "bg-slate-400" },
};

const STATUS_CFG: any = {
  New:        { cls: "bg-blue-500/15 text-blue-400 border border-blue-500/25",     icon: CircleDot },
  Assigned:   { cls: "bg-amber-500/15 text-amber-400 border border-amber-500/25",  icon: AlertCircle },
  "In Progress":{ cls: "bg-violet-500/15 text-violet-400 border border-violet-500/25", icon: RefreshCw },
  Completed:  { cls: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25", icon: CheckCircle2 },
  Cancelled:  { cls: "bg-red-500/15 text-red-400 border border-red-500/25",        icon: XCircle },
};

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
  const pts = [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90];
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
function BarChart({ leads }: { leads: any[] }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const ac =    [5, 8, 12, 15, 20, leads.filter(l => l.category === "AC").length];
  const fridge= [3, 5, 7, 10, 12, leads.filter(l => l.category === "Fridge").length];
  const wash =  [2, 4, 6, 8, 10, leads.filter(l => l.category === "Washing Machine").length];
  const max = Math.max(...ac,...fridge,...wash, 1);

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
function DonutChart({ data }: { data: any[] }) {
  const total = data.reduce((s,d)=>s+d.value,0);
  let offset=0;
  const r=60, cx=70, cy=70, circ=2*Math.PI*r;
  const segments=data.map(d=>{
    const pct = total === 0 ? 0 : d.value/total;
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCat, setFilterCat] = useState("All");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle sidebar default state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt ? (doc.data().createdAt as Timestamp).toDate().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) : "N/A"
      }));
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      toast.error("Failed to load leads: " + error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      setSelectedLead(null);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      toast.success("Lead deleted");
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  };

  // Filtered leads for leads table
  const categoryMap: any = { ac:"AC", fridge:"Fridge", washing:"Washing Machine" };
  const tableCat = categoryMap[activeNav];

  const filtered = leads.filter(l => {
    const matchSearch = (l.name || "").toLowerCase().includes(searchQ.toLowerCase()) ||
      (l.id || "").toLowerCase().includes(searchQ.toLowerCase()) ||
      (l.address || l.area || "").toLowerCase().includes(searchQ.toLowerCase()) ||
      (l.brand || "").toLowerCase().includes(searchQ.toLowerCase());
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchCat = (activeNav === "dashboard" || activeNav === "leads")
      ? (filterCat === "All" || l.category === filterCat)
      : l.category === tableCat;
    return matchSearch && matchStatus && matchCat;
  });

  // Stats
  const stats = [
    { label:"Total Leads", value: leads.length, change:+12.5, icon: Users, gradient:"from-blue-600 to-cyan-500" },
    { label:"New Requests", value: leads.filter(l=>l.status==="New").length, change:+8.3, icon: Zap, gradient:"from-violet-600 to-purple-500" },
    { label:"Completed Jobs", value: leads.filter(l=>l.status==="Completed").length, change:+22.1, icon: BadgeCheck, gradient:"from-emerald-600 to-teal-500" },
    { label:"Revenue (₹)", value: (leads.filter(l=>l.status==="Completed").length * 1500).toLocaleString("en-IN"), change:-3.2, icon: TrendingUp, gradient:"from-amber-500 to-orange-500" },
  ];

  // Donut data
  const donutData = [
    { label:"AC Repair",   value: leads.filter(l=>l.category==="AC").length,      color:"#22d3ee" },
    { label:"Fridge",      value: leads.filter(l=>l.category==="Fridge").length,   color:"#a78bfa" },
    { label:"Washing M.",  value: leads.filter(l=>l.category==="Washing Machine").length,  color:"#34d399" },
    { label:"Other",       value: leads.filter(l=>l.category==="Other").length,    color:"#94a3b8" },
  ];

  const statusDonut = [
    { label:"New",         value: leads.filter(l=>l.status==="New").length,         color:"#60a5fa" },
    { label:"In Progress", value: leads.filter(l=>l.status==="In Progress").length, color:"#c084fc" },
    { label:"Completed",   value: leads.filter(l=>l.status==="Completed").length,   color:"#34d399" },
    { label:"Cancelled",   value: leads.filter(l=>l.status==="Cancelled").length,   color:"#f87171" },
  ];

  const showTable = ["leads","ac","fridge","washing"].includes(activeNav);
  const pageTitle = activeNav==="dashboard" ? "Dashboard Overview"
    : activeNav==="leads" ? "All Service Leads"
    : activeNav==="ac" ? "AC Repair Leads"
    : activeNav==="fridge" ? "Fridge Repair Leads"
    : "Washing Machine Leads";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#060b14]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#060b14] text-slate-100 overflow-hidden" style={{fontFamily:"'DM Sans',sans-serif"}}>

      {/* ─── SIDEBAR OVERLAY (Mobile) ─── */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── SIDEBAR ─── */}
      <aside className={`
        fixed md:relative z-[70] h-full transition-all duration-300 bg-[#0d1525] border-r border-slate-800/60 flex flex-col shrink-0
        ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 w-64 md:w-16"}
      `}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800/60">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
            <Wrench size={15} className="text-white"/>
          </div>
          {(sidebarOpen) && (
            <div className="min-w-0 overflow-hidden">
              <p className="text-sm font-bold text-white leading-tight tracking-tight truncate">Customer Service Centre</p>
              <p className="text-[10px] text-slate-500">Admin Panel</p>
            </div>
          )}
          <button 
            onClick={()=>setSidebarOpen(!sidebarOpen)} 
            className="ml-auto text-slate-500 hover:text-slate-300 transition-colors md:flex hidden"
          >
            {sidebarOpen ? <X size={16}/> : <Menu size={16}/>}
          </button>
          <button 
            onClick={()=>setSidebarOpen(false)} 
            className="ml-auto text-slate-500 hover:text-slate-300 transition-colors md:hidden"
          >
            <X size={18}/>
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto scrollbar-none">
          {NAV.map(n => {
            const Icon = n.icon;
            const active = activeNav === n.id;
            return (
              <button key={n.id} onClick={()=>{
                setActiveNav(n.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${active
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5"
                    : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"}`}>
                <Icon size={18} className={active?"text-cyan-400":"text-slate-500 group-hover:text-slate-300"}/>
                {(sidebarOpen) && <span className="truncate">{n.label}</span>}
                {active && (sidebarOpen) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 shrink-0"/>}
              </button>
            );
          })}
        </nav>

        <div className="px-2 pb-4 border-t border-slate-800/60 pt-4 flex flex-col gap-1">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={17}/>{(sidebarOpen) && "Logout"}
          </button>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[#0d1525]/80 backdrop-blur border-b border-slate-800/60 flex items-center gap-2 md:gap-4 px-4 md:px-6 shrink-0">
          <button 
            onClick={()=>setSidebarOpen(true)} 
            className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden"
          >
            <Menu size={20}/>
          </button>
          <div className="min-w-0">
            <h1 className="text-xs md:text-sm font-bold text-white truncate">{pageTitle}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                placeholder="Search leads…"
                className="w-32 lg:w-48 bg-slate-800/60 border border-slate-700/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:w-40 lg:focus:w-64 transition-all"/>
            </div>
            <button className="relative w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors">
              <Bell size={15}/>
              {leads.filter(l=>l.status==="New").length > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400"/>}
            </button>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-2.5 py-1.5 cursor-pointer hover:border-slate-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold">A</div>
              <span className="text-[10px] md:text-xs text-slate-300 font-medium hidden xs:block">Admin</span>
              <ChevronDown size={12} className="text-slate-500"/>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin" style={{scrollbarWidth:"thin",scrollbarColor:"#1e293b transparent"}}>

          {activeNav === "dashboard" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
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
                  <div className="w-full overflow-x-auto overflow-y-hidden">
                    <div className="min-w-[400px]">
                      <BarChart leads={leads}/>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white mb-1">Category Split</h3>
                  <p className="text-xs text-slate-500 mb-4">All-time distribution</p>
                  <div className="flex justify-center">
                    <DonutChart data={donutData}/>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white mb-1">Status Overview</h3>
                  <p className="text-xs text-slate-500 mb-4">Current pipeline</p>
                  <div className="flex justify-center">
                    <DonutChart data={statusDonut}/>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0d1525] border border-slate-800/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Recent Leads</h3>
                    <button onClick={()=>setActiveNav("leads")} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                      View all <ArrowUpRight size={12}/>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {leads.slice(0,6).map((l,i)=>{
                      const Cat = CATEGORIES[l.category] || CATEGORIES.Other;
                      const CatIcon = Cat.icon;
                      const St = STATUS_CFG[l.status] || STATUS_CFG.New;
                      const StIcon = St.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={()=>setSelectedLead(l)}>
                          <div className={`w-8 h-8 rounded-lg ${Cat.light} flex items-center justify-center shrink-0`}>
                            <CatIcon size={14}/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white truncate">{l.name}</span>
                              <span className="text-[10px] text-slate-500 shrink-0">{l.id.slice(-6)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5 overflow-hidden">
                              <span className="text-[10px] text-slate-500 shrink-0">{l.brand}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0"/>
                              <span className="text-[10px] text-slate-500 truncate">{l.address}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${St.cls} shrink-0`}>
                            <StIcon size={9}/>
                            <span className="hidden xs:inline">{l.status}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showTable && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#0d1525] border border-slate-800/60 rounded-xl p-1 overflow-x-auto scrollbar-none">
                  {["All",...Object.keys(STATUS_CFG)].map(s=>(
                    <button key={s} onClick={()=>setFilterStatus(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filterStatus===s?"bg-cyan-500/20 text-cyan-400 border border-cyan-500/30":"text-slate-500 hover:text-slate-300"}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {(activeNav==="dashboard"||activeNav==="leads") && (
                  <div className="flex items-center gap-1.5 bg-[#0d1525] border border-slate-800/60 rounded-xl p-1 overflow-x-auto scrollbar-none">
                    {["All","AC","Fridge","Washing Machine"].map(c=>(
                      <button key={c} onClick={()=>setFilterCat(c)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filterCat===c?"bg-violet-500/20 text-violet-400 border border-violet-500/30":"text-slate-500 hover:text-slate-300"}`}>
                        {c==="All"?"All":CATEGORIES[c]?.label || c}
                      </button>
                    ))}
                  </div>
                )}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-slate-500 whitespace-nowrap">{filtered.length} leads</span>
                </div>
              </div>

              <div className="bg-[#0d1525] border border-slate-800/60 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/60 bg-slate-900/40">
                        {["Lead ID","Customer","Category / Brand","Issue","Location","Date","Status","Action"].map(h=>(
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((l, i)=>{
                        const Cat = CATEGORIES[l.category] || CATEGORIES.Other;
                        const CatIcon = Cat.icon;
                        const St = STATUS_CFG[l.status] || STATUS_CFG.New;
                        const StIcon = St.icon;
                        return (
                          <tr key={l.id} className={`border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors ${i%2===0?"":"bg-slate-900/10"}`}>
                            <td className="px-4 py-3 text-xs font-mono text-cyan-400/80 whitespace-nowrap">{l.id.slice(-6)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-[11px] font-bold text-slate-300 shrink-0">
                                  {l.name?.[0] || "U"}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-white whitespace-nowrap">{l.name}</div>
                                  <div className="text-[10px] text-slate-500">{l.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-0.5">
                                <span className={`text-[10px] font-medium flex items-center gap-1 ${Cat.light.split(" ")[1]} whitespace-nowrap`}>
                                  <CatIcon size={10}/>{Cat.label}
                                </span>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">{l.brand}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap max-w-[200px] truncate">{l.issue}</td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap max-w-[150px] truncate">
                                <MapPin size={10} className="text-slate-600"/>{l.address}
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
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={()=>setSelectedLead(l)}
                                  className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 flex items-center justify-center text-slate-500 transition-colors">
                                  <Eye size={11}/>
                                </button>
                                <button onClick={() => deleteLead(l.id)}
                                  className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-500 transition-colors">
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

      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={()=>setSelectedLead(null)}>
          <div className="bg-[#0d1525] border border-slate-700/60 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800">
              <div className="min-w-0">
                <p className="text-[10px] font-mono text-cyan-400/70 truncate">{selectedLead.id}</p>
                <h2 className="text-base font-bold text-white truncate">{selectedLead.name}</h2>
              </div>
              <button onClick={()=>setSelectedLead(null)} className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                <X size={14}/>
              </button>
            </div>
            <div className="p-4 md:p-5 flex flex-col gap-3 max-h-[80vh] overflow-y-auto scrollbar-thin">
              {(() => {
                const Cat = CATEGORIES[selectedLead.category] || CATEGORIES.Other;
                const CatIcon = Cat.icon;
                const St = STATUS_CFG[selectedLead.status] || STATUS_CFG.New;
                const StIcon = St.icon;
                return (
                  <>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-[10px] md:text-xs font-medium px-3 py-1.5 rounded-lg ${Cat.light}`}>
                        <CatIcon size={13}/>{Cat.label} — {selectedLead.brand}
                      </span>
                      <span className={`flex items-center gap-1 text-[10px] md:text-xs font-medium px-2.5 py-1.5 rounded-lg ${St.cls}`}>
                        <StIcon size={11}/>{selectedLead.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      {[
                        ["Phone", selectedLead.phone, Phone],
                        ["Location", selectedLead.address || selectedLead.area, MapPin],
                        ["Problem", selectedLead.issue || selectedLead.message, Wrench],
                        ["Date", selectedLead.date, Calendar],
                        ["Service", selectedLead.serviceType || "Standard", Zap],
                        ["Preferred Time", selectedLead.preferredTime || "Anytime", Clock],
                      ].map(([label, value, Icon])=>(
                        <div key={label} className="bg-slate-800/40 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1">
                            <Icon size={10}/>{label}
                          </div>
                          <div className="text-xs font-semibold text-white break-words">{value || "N/A"}</div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
              <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-slate-800">
                {Object.keys(STATUS_CFG).map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedLead.id, status)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                      selectedLead.status === status
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
