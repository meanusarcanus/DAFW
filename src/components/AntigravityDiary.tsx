import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Clock, ArrowLeft, Search, Filter, Download, Cpu, Sparkles, Folder, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { ANTIGRAVITY_DIARY_DATA, DiaryEntry } from '../data/antigravityDiary';

interface AntigravityDiaryProps {
  onBack: () => void;
}

export const AntigravityDiary: React.FC<AntigravityDiaryProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');

  // Extract unique clean project folders for filtering
  const projectFolders = useMemo(() => {
    const folders = new Set<string>();
    ANTIGRAVITY_DIARY_DATA.entries.forEach(entry => {
      if (entry.projectFolder) {
        folders.add(entry.projectFolder.trim());
      }
    });
    return ['ALL', ...Array.from(folders)];
  }, []);

  const getFolderBadgeColor = (folder: string) => {
    const f = folder.toUpperCase();
    if (f === 'DAF') return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (f === 'NAE') return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    if (f === 'MSAI') return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (f === 'AGAMS') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (f === 'DAFW') return 'bg-[#00FFA3]/10 text-[#00FFA3] border-[#00FFA3]/30';
    if (f === 'BABYLULLABY') return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
    if (f === 'ABUNDANCE') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    if (f === 'YP') return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    return 'bg-white/5 text-neutral-300 border-white/10';
  };

  // Robust Folder & Search Matching
  const filteredEntries = useMemo(() => {
    return ANTIGRAVITY_DIARY_DATA.entries
      .filter(entry => {
        const entryFolderLower = entry.projectFolder.toLowerCase();
        const selLower = selectedFolder.toLowerCase();

        const matchesFolder = 
          selectedFolder === 'ALL' ||
          entryFolderLower === selLower ||
          entryFolderLower.includes(selLower);

        const qLower = searchQuery.trim().toLowerCase();
        const matchesQuery = 
          !qLower ||
          entry.dateTime.toLowerCase().includes(qLower) ||
          entryFolderLower.includes(qLower) ||
          entry.prompt.toLowerCase().includes(qLower) ||
          entry.output.toLowerCase().includes(qLower) ||
          entry.productCreated.toLowerCase().includes(qLower) ||
          entry.productDescription.toLowerCase().includes(qLower);
        
        return matchesFolder && matchesQuery;
      })
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }, [searchQuery, selectedFolder]);

  // Export CSV Helper
  const exportCSV = () => {
    const headers = ['Date and Time', 'Project Folder', 'Prompt', 'Output', 'Product Created', 'Product Description'];
    const rows = filteredEntries.map(e => [
      `"${e.dateTime}"`,
      `"${e.projectFolder}"`,
      `"${e.prompt.replace(/"/g, '""')}"`,
      `"${e.output.replace(/"/g, '""')}"`,
      `"${e.productCreated.replace(/"/g, '""')}"`,
      `"${e.productDescription.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `antigravity_engineering_diary_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-20 px-2 sm:px-6 relative bg-dot-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="w-full max-w-[98%] mx-auto relative z-10 space-y-8">
        
        {/* Top Controls & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-xs font-mono text-neutral-300 hover:text-white transition-all border border-white/10 mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Showcase</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00FFA3]/10 border border-[#00FFA3]/30 flex items-center justify-center text-[#00FFA3]">
                <Cpu className="w-4 h-4" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Antigravity Engineering Diary
              </h1>
            </div>

            <p className="font-mono text-xs text-neutral-400 mt-1">
              Comprehensive log displaying user prompts, git commits, project folders (DAF, NAE, MSAI, AGAMS, DAFW), and product creations by Ted Nadres.
            </p>
          </div>

          {/* Top Last Updated Timestamp Readout */}
          <div className="glass-card p-4 rounded-xl border border-white/10 font-mono text-xs flex flex-col justify-between shrink-0 bg-black/60">
            <div className="flex items-center gap-2 text-neutral-400 text-[11px] mb-1">
              <Clock className="w-3.5 h-3.5 text-[#00FFA3] animate-pulse" />
              <span>LAST UPDATED</span>
            </div>
            <div className="text-[#00FFA3] font-bold text-sm tracking-wide">
              {ANTIGRAVITY_DIARY_DATA.lastUpdated}
            </div>
          </div>
        </div>

        {/* Filter Controls & Search Studio */}
        <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs schematic-border bg-black/60">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompt, project (DAF, NAE, MSAI), output..."
              className="w-full bg-black/80 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FFA3] transition-colors"
            />
          </div>

          {/* Project Folder Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
            <Filter className="w-3.5 h-3.5 text-neutral-500 shrink-0 mr-1" />
            {projectFolders.map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                  selectedFolder === folder
                    ? 'bg-[#00FFA3] text-black shadow-[0_0_12px_rgba(0,255,163,0.3)]'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {folder === 'ALL' ? 'ALL PROJECTS' : folder}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 border border-white/10 shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#00FFA3]" />
            <span>EXPORT CSV</span>
          </button>
        </div>

        {/* Tabular Listing (Date & Time Descending) */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden schematic-border shadow-2xl bg-black/80">
          <div className="px-6 py-4 bg-black/90 border-b border-white/10 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Terminal className="w-4 h-4 text-[#00FFA3]" />
              <span className="font-bold">// EXECUTIONS_LOG ({selectedFolder === 'ALL' ? 'ALL PROJECTS' : selectedFolder})</span>
            </div>
            <span className="text-[#00FFA3] font-bold">
              {filteredEntries.length} RECOGNIZED ENTRIES
            </span>
          </div>

          {/* Full-Width Table Layout */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-mono text-xs border-collapse table-fixed">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-neutral-400 text-[11px]">
                  <th className="py-3.5 px-3 font-bold tracking-wider w-[15%] min-w-[155px]">Date and Time</th>
                  <th className="py-3.5 px-3 font-bold tracking-wider w-[13%] min-w-[120px]">Project Folder</th>
                  <th className="py-3.5 px-3 font-bold tracking-wider w-[22%] min-w-[190px]">Prompt</th>
                  <th className="py-3.5 px-3 font-bold tracking-wider w-[20%] min-w-[180px]">Output</th>
                  <th className="py-3.5 px-3 font-bold tracking-wider w-[14%] min-w-[135px]">Product Created</th>
                  <th className="py-3.5 px-3 font-bold tracking-wider w-[16%] min-w-[165px]">Product Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {filteredEntries.map((entry) => (
                  <tr 
                    key={entry.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* 1. Date and Time */}
                    <td className="py-3.5 px-3 text-emerald-400 font-bold whitespace-nowrap align-top text-[11px]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#00FFA3] shrink-0" />
                        <span>{entry.dateTime}</span>
                      </div>
                    </td>

                    {/* 2. Project Folder (Clean Code: DAF, NAE, MSAI, AGAMS, DAFW, etc.) */}
                    <td className="py-3.5 px-3 align-top">
                      <button
                        onClick={() => setSelectedFolder(entry.projectFolder.trim())}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border font-mono font-bold text-[11px] cursor-pointer transition-all ${getFolderBadgeColor(entry.projectFolder)}`}
                        title={`Filter by ${entry.projectFolder}`}
                      >
                        <Folder className="w-3 h-3 shrink-0" />
                        <span>{entry.projectFolder}</span>
                      </button>
                    </td>

                    {/* 3. Prompt */}
                    <td className="py-3.5 px-3 align-top">
                      <div className="p-2 rounded bg-[#00FFA3]/10 border border-[#00FFA3]/30 text-[#00FFA3] font-medium text-[11px] leading-relaxed break-words">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 mb-0.5">
                          <MessageSquareQuote className="w-3 h-3 shrink-0" />
                          <span>USER PROMPT:</span>
                        </div>
                        "{entry.prompt}"
                      </div>
                    </td>

                    {/* 4. Output */}
                    <td className="py-3.5 px-3 align-top text-neutral-300 leading-relaxed text-[11px] break-words">
                      {entry.output}
                    </td>

                    {/* 5. Product Created */}
                    <td className="py-3.5 px-3 align-top font-bold text-white group-hover:text-[#00FFA3] transition-colors text-[11px] break-words">
                      {entry.productCreated}
                    </td>

                    {/* 6. Product Description */}
                    <td className="py-3.5 px-3 align-top text-neutral-400 leading-relaxed text-[11px] break-words">
                      {entry.productDescription}
                    </td>
                  </tr>
                ))}

                {filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-xs">
                      No matching log entries found for project folder "{selectedFolder}" / query "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 bg-black/90 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>AUTOMATION: GITHUB ACTIONS CRON ('0 8 */2 * *')</span>
            <span className="text-[#00FFA3]">PROJECT FOLDER CODES ACTIVE & VISIBLE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
