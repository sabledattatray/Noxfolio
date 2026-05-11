'use client';

import { Suspense } from 'react';
import { AppDirectory } from '@/components/marketplace/app-directory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Puzzle, Zap, ShieldCheck, Box } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 py-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            Noxfolio Ecosystem
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Extend your billing platform with powerful integrations, specialized
            tools, and community-built apps.
          </p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-background bg-accent flex h-10 w-10 items-center justify-center rounded-full border-2"
            >
              <Box className="text-muted-foreground h-5 w-5" />
            </div>
          ))}
          <div className="border-background bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full border-2 text-[10px] font-bold">
            +12
          </div>
        </div>
      </div>

      <Tabs defaultValue="directory" className="space-y-8">
        <div className="border-border/50 flex items-center justify-between border-b pb-1">
          <TabsList className="h-auto gap-8 bg-transparent p-0">
            <TabsTrigger
              value="directory"
              className="data-[state=active]:text-primary data-[state=active]:border-primary rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 font-bold transition-all data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Puzzle className="mr-2 h-4 w-4" />
              App Directory
            </TabsTrigger>
            <TabsTrigger
              value="installed"
              className="data-[state=active]:text-primary data-[state=active]:border-primary rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 font-bold transition-all data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Zap className="mr-2 h-4 w-4" />
              Installed Apps
            </TabsTrigger>
            <TabsTrigger
              value="developers"
              className="data-[state=active]:text-primary data-[state=active]:border-primary rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 font-bold transition-all data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Partner Portal
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="directory"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <AppDirectory />
        </TabsContent>

        <TabsContent value="installed" className="space-y-4 py-20 text-center">
          <Zap className="text-muted-foreground/20 mx-auto h-12 w-12" />
          <h3 className="text-xl font-medium">
            No external apps installed yet
          </h3>
          <p className="text-muted-foreground">
            Browse the directory to find tools to supercharge your business.
          </p>
        </TabsContent>

        <TabsContent value="developers" className="space-y-4 py-20 text-center">
          <ShieldCheck className="text-muted-foreground/20 mx-auto h-12 w-12" />
          <h3 className="text-xl font-medium">Become a Noxfolio Partner</h3>
          <p className="text-muted-foreground">
            Build apps for the thousands of businesses using Noxfolio. Coming
            soon.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
