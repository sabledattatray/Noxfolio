'use client';

import { Suspense } from 'react';
import { AppDirectory } from '@/components/marketplace/app-directory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Puzzle, Zap, ShieldCheck, Box } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto py-10 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">
            BillForge Ecosystem
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Extend your billing platform with powerful integrations, specialized tools, and community-built apps.
          </p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-accent flex items-center justify-center">
              <Box className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
            +12
          </div>
        </div>
      </div>

      <Tabs defaultValue="directory" className="space-y-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-1">
          <TabsList className="bg-transparent h-auto p-0 gap-8">
            <TabsTrigger 
              value="directory" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-2 font-bold transition-all"
            >
              <Puzzle className="w-4 h-4 mr-2" />
              App Directory
            </TabsTrigger>
            <TabsTrigger 
              value="installed" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-2 font-bold transition-all"
            >
              <Zap className="w-4 h-4 mr-2" />
              Installed Apps
            </TabsTrigger>
            <TabsTrigger 
              value="developers" 
              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-2 font-bold transition-all"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Partner Portal
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="directory" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AppDirectory />
        </TabsContent>

        <TabsContent value="installed" className="py-20 text-center space-y-4">
          <Zap className="w-12 h-12 text-muted-foreground/20 mx-auto" />
          <h3 className="text-xl font-medium">No external apps installed yet</h3>
          <p className="text-muted-foreground">Browse the directory to find tools to supercharge your business.</p>
        </TabsContent>

        <TabsContent value="developers" className="py-20 text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-muted-foreground/20 mx-auto" />
          <h3 className="text-xl font-medium">Become a BillForge Partner</h3>
          <p className="text-muted-foreground">Build apps for the thousands of businesses using BillForge. Coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
