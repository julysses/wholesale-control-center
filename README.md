# WholesaleOS — AI-Powered Wholesale Real Estate Control Center

> **FOR CLAUDE REMOTE:** This README is the complete specification for finishing this app. Read every section before touching any file. The app is ~85% built. Your job is to fix the build errors, implement the missing features listed below, and ensure the app deploys cleanly. Work through the tasks in the order given.

---

## What This App Is

A full-stack web application that manages the entire wholesale real estate pipeline — from lead generation through closed deals — powered by Claude AI agents (claude-sonnet-4-5) via Supabase Edge Functions.

**Repo:** https://github.com/julysses/wholesale-control-center
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS v4 + Supabase + Anthropic Claude API

---

## Current File Tree (what exists)

```
src/
├── App.tsx                          ✅ Complete — React Router setup, all 8 routes
├── main.tsx                         ✅ Complete
├── index.css                        ✅ Complete — Tailwind v4 @import, custom theme vars
├── App.css                          ⚠️  Vite default — NOT imported anywhere, safe to delete
├── types/index.ts                   ✅ Complete — all TypeScript interfaces
├── lib/
│   ├── supabase.ts                  ✅ Complete
│   └── utils.ts                     ✅ Complete — formatCurrency, cn, getStatusClass, etc.
├── stores/
│   ├── useUIStore.ts                ✅ Complete — sidebarCollapsed toggle
│   ├── useLeadStore.ts              ✅ Complete — selectedLead, filters
│   └── useDealStore.ts              ✅ Complete — deals array, moveDealStage
├── hooks/
│   ├── useLeads.ts                  ✅ Complete — useLeads, useHotLeads, useCreateLead, useUpdateLead, useDeleteLead, useOutreachActivity, useLogActivity
│   ├── useDeals.ts                  ✅ Complete — useDeals, useUpcomingClosings, useCreateDeal, useUpdateDeal
│   ├── useBuyers.ts                 ✅ Complete — useBuyers, useCreateBuyer, useUpdateBuyer, useDeleteBuyer
│   ├── useTasks.ts                  ✅ Complete — useTasks, useTodayTasks, useCreateTask, useUpdateTask, useCompleteTask
│   └── useAIAgent.ts                ✅ Complete — useLeadQualifier, useOfferGenerator, useOutreachWriter, useBuyerMatcher
├── components/
│   ├── ui/
│   │   ├── badge.tsx                ✅ Complete
│   │   ├── button.tsx               ✅ Complete — has TS build error (fix below)
│   │   ├── card.tsx                 ✅ Complete
│   │   ├── input.tsx                ✅ Complete — has TS build error (fix below)
│   │   ├── modal.tsx                ✅ Complete
│   │   ├── select.tsx               ✅ Complete — has TS build error (fix below)
│   │   ├── skeleton.tsx             ✅ Complete
│   │   └── textarea.tsx             ✅ Complete — has TS build error (fix below)
│   ├── layout/
│   │   ├── Sidebar.tsx              ✅ Complete
│   │   ├── TopBar.tsx               ✅ Complete
│   │   └── Layout.tsx               ✅ Complete
│   ├── dashboard/
│   │   ├── KPICard.tsx              ✅ Complete
│   │   ├── PipelineChart.tsx        ✅ Complete
│   │   ├── ActivityFeed.tsx         ✅ Complete
│   │   └── DealsByStage.tsx         ✅ Complete
│   ├── leads/
│   │   ├── LeadImportModal.tsx      ✅ Complete (standalone version, not used — Leads.tsx has its own inline)
│   │   ├── LeadScoreDisplay.tsx     ✅ Complete
│   │   └── OutreachTimeline.tsx     ❌ Has build error — imports useLeadOutreach (renamed to useOutreachActivity)
│   └── pipeline/
│       ├── DealCard.tsx             ✅ Complete — has TS build error (fix below)
│       └── KanbanColumn.tsx         ✅ Complete — has TS build error (fix below)
└── pages/
    ├── Dashboard.tsx                ✅ Complete
    ├── Leads.tsx                    ✅ Complete
    ├── Pipeline.tsx                 ✅ Complete — has TS build errors (fix below)
    ├── DealAnalyzer.tsx             ✅ Complete
    ├── Buyers.tsx                   ✅ Complete
    ├── AIAgents.tsx                 ✅ Complete
    ├── Tasks.tsx                    ✅ Complete — has TS build error (fix below)
    └── Reports.tsx                  ✅ Complete — has TS build error (fix below)

supabase/
├── migrations/001_initial_schema.sql  ✅ Complete — run this in Supabase SQL editor
└── functions/
    ├── qualify-lead/index.ts          ✅ Complete
    ├── generate-offer/index.ts        ✅ Complete
    ├── write-outreach/index.ts        ✅ Complete
    └── match-buyers/index.ts          ✅ Complete
```

---

## TASK 1 — Fix All TypeScript Build Errors (MUST DO FIRST)

Run `npm run build` to confirm errors. Fix each one exactly as described. All errors are `import type` violations from `verbatimModuleSyntax` being enabled in tsconfig, plus one missing export and one undefined check.

### Fix pattern: change `import { SomeType }` to `import type { SomeType }` when importing only types.

**File: `src/components/ui/button.tsx` line 3**
```ts
// CHANGE:
import { ButtonHTMLAttributes, forwardRef } from 'react';
// TO:
import { forwardRef, type ButtonHTMLAttributes } from 'react';
```

**File: `src/components/ui/input.tsx` line 2**
```ts
// CHANGE:
import { InputHTMLAttributes, forwardRef } from 'react';
// TO:
import { forwardRef, type InputHTMLAttributes } from 'react';
```

**File: `src/components/ui/select.tsx` line 2**
```ts
// CHANGE:
import { SelectHTMLAttributes, forwardRef } from 'react';
// TO:
import { forwardRef, type SelectHTMLAttributes } from 'react';
```

**File: `src/components/ui/textarea.tsx` line 2**
```ts
// CHANGE:
import { TextareaHTMLAttributes, forwardRef } from 'react';
// TO:
import { forwardRef, type TextareaHTMLAttributes } from 'react';
```

**File: `src/hooks/useAIAgent.ts` line 4**
```ts
// CHANGE:
import { QualificationResult, OfferResult, OutreachVariation, BuyerMatchResult } from '@/types';
// TO:
import type { QualificationResult, OfferResult, OutreachVariation, BuyerMatchResult } from '@/types';
```

**File: `src/hooks/useBuyers.ts` line 3**
```ts
// CHANGE:
import { Buyer } from '@/types';
// TO:
import type { Buyer } from '@/types';
```

**File: `src/hooks/useDeals.ts` line 3**
```ts
// CHANGE:
import { Deal } from '@/types';
// TO:
import type { Deal } from '@/types';
```

**File: `src/hooks/useLeads.ts` line 3**
```ts
// CHANGE:
import { Lead } from '@/types';
// TO:
import type { Lead } from '@/types';
```

**File: `src/hooks/useTasks.ts` line 3**
```ts
// CHANGE:
import { Task } from '@/types';
// TO:
import type { Task } from '@/types';
```

**File: `src/stores/useDealStore.ts` line 2**
```ts
// CHANGE:
import { Deal } from '@/types';
// TO:
import type { Deal } from '@/types';
```

**File: `src/stores/useLeadStore.ts` line 2**
```ts
// CHANGE:
import { Lead } from '@/types';
// TO:
import type { Lead } from '@/types';
```

**File: `src/pages/Buyers.tsx` line 11**
```ts
// CHANGE:
import { Buyer } from '@/types';
// TO:
import type { Buyer } from '@/types';
```

**File: `src/pages/Leads.tsx` line 12**
```ts
// CHANGE:
import { Lead } from '@/types';
// TO:
import type { Lead } from '@/types';
```

**File: `src/pages/Tasks.tsx` line 8**
```ts
// CHANGE:
import { Task } from '@/types';
// TO:
import type { Task } from '@/types';
```

**File: `src/pages/Pipeline.tsx` lines 10 and 15-17**
```ts
// CHANGE:
import { Deal } from '@/types';
// ...
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  ...
} from '@dnd-kit/core';
// TO:
import type { Deal } from '@/types';
// ...
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  ...
} from '@dnd-kit/core';
```

**File: `src/components/pipeline/DealCard.tsx` line 1**
```ts
// CHANGE:
import { Deal } from '@/types';
// TO:
import type { Deal } from '@/types';
```

**File: `src/components/pipeline/KanbanColumn.tsx` line 1**
```ts
// CHANGE:
import { Deal } from '@/types';
// TO:
import type { Deal } from '@/types';
```

**File: `src/pages/Reports.tsx` line ~243**

Find the Recharts `<Pie>` label prop. The `percent` param is possibly undefined. Fix:
```tsx
// CHANGE:
label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// TO:
label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
```

**File: `src/components/leads/OutreachTimeline.tsx`**

This file imports `useLeadOutreach` which was renamed. Find line 1 and fix the import:
```ts
// CHANGE:
import { useLeadOutreach } from '@/hooks/useLeads';
// TO:
import { useOutreachActivity } from '@/hooks/useLeads';
```
Then find every usage of `useLeadOutreach` in that file and rename it to `useOutreachActivity`.

**After all fixes, run `npm run build` — it must complete with zero errors before proceeding.**

---

## TASK 2 — Add Login / Auth Page

The app currently has no authentication. Supabase Auth is already set up in `src/lib/supabase.ts`. Add a login page and protect all routes.

### 2a. Create `src/pages/Login.tsx`

```tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Enter email and password');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    }
    setLoading(false);
    // On success, the auth listener in App.tsx will redirect automatically
  };

  return (
    <div className="min-h-screen bg-[#F2F4F6] flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#1B3A5C] rounded-xl">
            <Building2 className="h-7 w-7 text-[#E8720C]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1B3A5C]">WholesaleOS</h1>
            <p className="text-xs text-gray-400">Real Estate Control Center</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">
          Access is by invitation only. Contact your admin to get an account.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
```

### 2b. Update `src/App.tsx` to handle auth session

Replace the entire contents of `src/App.tsx` with:

```tsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Leads } from '@/pages/Leads';
import { Pipeline } from '@/pages/Pipeline';
import { DealAnalyzer } from '@/pages/DealAnalyzer';
import { Buyers } from '@/pages/Buyers';
import { AIAgents } from '@/pages/AIAgents';
import { Tasks } from '@/pages/Tasks';
import { Reports } from '@/pages/Reports';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60000, retry: 1 },
  },
});

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Still loading session
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-[#F2F4F6] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-[#1B3A5C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {!session ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/analyzer" element={<DealAnalyzer />} />
              <Route path="/buyers" element={<Buyers />} />
              <Route path="/ai-agents" element={<AIAgents />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

### 2c. Add Sign Out to the TopBar

In `src/components/layout/TopBar.tsx`, add a sign out button next to the user avatar:

```tsx
// Add this import at the top:
import { supabase } from '@/lib/supabase';

// Replace the user button with:
<button
  onClick={async () => {
    await supabase.auth.signOut();
  }}
  className="flex items-center gap-2 p-2 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
  title="Sign out"
>
  <UserCircle className="h-6 w-6" />
</button>
```

---

## TASK 3 — Fix `src/components/leads/OutreachTimeline.tsx`

This file was scaffolded but imports the wrong hook name. Rewrite the full file:

```tsx
import { useOutreachActivity } from '@/hooks/useLeads';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { MessageSquare, Phone, Mail, Home, User } from 'lucide-react';

interface OutreachTimelineProps {
  leadId: string;
}

const channelConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  sms:         { icon: <MessageSquare className="h-3.5 w-3.5" />, color: 'bg-blue-100 text-blue-600',   label: 'SMS' },
  call:        { icon: <Phone className="h-3.5 w-3.5" />,        color: 'bg-green-100 text-green-600',  label: 'Call' },
  email:       { icon: <Mail className="h-3.5 w-3.5" />,         color: 'bg-purple-100 text-purple-600',label: 'Email' },
  voicemail:   { icon: <Phone className="h-3.5 w-3.5" />,        color: 'bg-yellow-100 text-yellow-600',label: 'Voicemail' },
  direct_mail: { icon: <Home className="h-3.5 w-3.5" />,         color: 'bg-orange-100 text-orange-600',label: 'Mail' },
  in_person:   { icon: <User className="h-3.5 w-3.5" />,         color: 'bg-pink-100 text-pink-600',    label: 'In Person' },
};

export function OutreachTimeline({ leadId }: OutreachTimelineProps) {
  const { data: activities, isLoading } = useOutreachActivity(leadId);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="h-7 w-7 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1 pt-1">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        <MessageSquare className="h-7 w-7 mx-auto mb-2 opacity-30" />
        <p className="text-sm">No contact activity yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
      {activities.map((activity: any) => {
        const config = channelConfig[activity.channel] ?? channelConfig['sms'];
        const isInbound = activity.direction === 'inbound';

        return (
          <div key={activity.id} className={cn('flex gap-3', isInbound ? 'flex-row-reverse' : 'flex-row')}>
            <div className={cn('h-7 w-7 rounded-full flex items-center justify-center shrink-0', config.color)}>
              {config.icon}
            </div>
            <div className={cn(
              'flex-1 max-w-xs rounded-xl px-3 py-2 text-sm',
              isInbound ? 'bg-blue-50 rounded-tr-none' : 'bg-gray-100 rounded-tl-none'
            )}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-gray-600">{config.label}</span>
                {activity.status && (
                  <span className="text-xs text-gray-400 capitalize">{activity.status}</span>
                )}
              </div>
              {activity.message && (
                <p className="text-gray-700 text-xs">{activity.message}</p>
              )}
              {activity.response && (
                <p className="text-blue-700 text-xs mt-1 italic">Reply: {activity.response}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{formatDateTime(activity.created_at)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

---

## TASK 4 — Add Log Activity Modal to Leads Page

In `src/pages/Leads.tsx`, the row action "Log Activity" currently calls `setOpenMenuId(null)` but doesn't open any modal. Implement the full flow:

### 4a. Add state and modal trigger in the `Leads` component

Add at the top of the `Leads` function body:
```tsx
const [logActivityLead, setLogActivityLead] = useState<Lead | null>(null);
```

In the row actions dropdown, update the "Log Activity" menu item to:
```tsx
<button
  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
  onClick={() => { setLogActivityLead(lead); setOpenMenuId(null); }}
>
  <Phone className="h-3.5 w-3.5" /> Log Activity
</button>
```

Add the modal at the bottom of the return, after the other modals:
```tsx
{logActivityLead && (
  <LogActivityModal
    lead={logActivityLead}
    onClose={() => setLogActivityLead(null)}
  />
)}
```

### 4b. Add the `LogActivityModal` component at the bottom of `Leads.tsx`

```tsx
function LogActivityModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const logActivity = useLogActivity();
  const [form, setForm] = useState({
    channel: 'call',
    direction: 'outbound',
    status: 'answered',
    message: '',
    response: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await logActivity.mutateAsync({
      lead_id: lead.id,
      channel: form.channel,
      direction: form.direction,
      status: form.status,
      message: form.message || undefined,
      response: form.response || undefined,
    });
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose} title={`Log Activity — ${lead.property_address}`} size="md">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Channel"
            value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value })}
            options={[
              { value: 'call', label: 'Call' },
              { value: 'sms', label: 'SMS' },
              { value: 'email', label: 'Email' },
              { value: 'voicemail', label: 'Voicemail' },
              { value: 'direct_mail', label: 'Direct Mail' },
              { value: 'in_person', label: 'In Person' },
            ]}
          />
          <Select
            label="Direction"
            value={form.direction}
            onChange={(e) => setForm({ ...form, direction: e.target.value })}
            options={[
              { value: 'outbound', label: 'Outbound' },
              { value: 'inbound', label: 'Inbound' },
            ]}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: 'answered', label: 'Answered' },
              { value: 'no_answer', label: 'No Answer' },
              { value: 'voicemail', label: 'Left Voicemail' },
              { value: 'sent', label: 'Sent' },
              { value: 'delivered', label: 'Delivered' },
            ]}
          />
        </div>
        <Textarea
          label="Message / Notes"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What was said or sent..."
          rows={3}
        />
        <Textarea
          label="Seller Response (if any)"
          value={form.response}
          onChange={(e) => setForm({ ...form, response: e.target.value })}
          placeholder="What the seller said back..."
          rows={2}
        />
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={logActivity.isPending}>Log Activity</Button>
        </div>
      </form>
    </Modal>
  );
}
```

Also add `useLogActivity` to the imports at the top of `Leads.tsx`:
```ts
import { useLeads, useDeleteLead, useCreateLead, useUpdateLead, useLogActivity } from '@/hooks/useLeads';
```

---

## TASK 5 — Add "Move to Pipeline" Action in Leads Table

In `src/pages/Leads.tsx`, the row action "Move to Pipeline" should create a Deal from a Lead.

Add `useCreateDeal` import:
```ts
import { useCreateDeal } from '@/hooks/useDeals';
```

Inside the `Leads` component, add:
```tsx
const createDeal = useCreateDeal();

const handleMoveToPipeline = async (lead: Lead) => {
  if (!confirm(`Create a pipeline deal for ${lead.property_address}?`)) return;
  await createDeal.mutateAsync({
    lead_id: lead.id,
    deal_name: lead.property_address,
    stage: 'offer_made',
    contract_price: lead.offer_price ?? lead.mao ?? undefined,
    arv: lead.estimated_arv ?? undefined,
    repair_estimate: lead.estimated_repairs ?? undefined,
    seller_name: `${lead.owner_first_name ?? ''} ${lead.owner_last_name ?? ''}`.trim() || undefined,
  });
};
```

Update the row actions dropdown to wire up this function:
```tsx
<button
  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
  onClick={() => { handleMoveToPipeline(lead); setOpenMenuId(null); }}
>
  <ArrowRight className="h-3.5 w-3.5" /> Move to Pipeline
</button>
```

---

## TASK 6 — Deal Analyzer "Save to Lead"

In `src/pages/DealAnalyzer.tsx`, add a "Save to Lead" button in the Results panel that writes back to Supabase.

### 6a. Add lead selector state and imports

```tsx
import { useLeads, useUpdateLead } from '@/hooks/useLeads';

// Inside DealAnalyzer component, add:
const [savingToLead, setSavingToLead] = useState(false);
const [saveLeadId, setSaveLeadId] = useState('');
const { data: leadsData } = useLeads({ pageSize: 200 });
const updateLead = useUpdateLead();
const leads = leadsData?.data ?? [];
```

### 6b. Add save handler

```tsx
const handleSaveToLead = async () => {
  if (!saveLeadId) return toast.error('Select a lead to save to');
  if (arv === 0) return toast.error('Calculate ARV first');
  setSavingToLead(true);
  await updateLead.mutateAsync({
    id: saveLeadId,
    updates: {
      estimated_arv: arv,
      estimated_repairs: estimatedRepairs,
      mao,
    },
  });
  setSavingToLead(false);
  toast.success('Analysis saved to lead');
};
```

### 6c. Add UI to the right panel (after the AI Recommendation card)

```tsx
{arv > 0 && (
  <Card>
    <CardHeader><CardTitle>Save to Lead</CardTitle></CardHeader>
    <CardContent className="space-y-3">
      <Select
        label="Select Lead"
        value={saveLeadId}
        onChange={(e) => setSaveLeadId(e.target.value)}
        options={leads.map((l) => ({ value: l.id, label: l.property_address }))}
        placeholder="Choose a lead..."
      />
      <Button
        onClick={handleSaveToLead}
        loading={savingToLead}
        disabled={!saveLeadId}
        icon={<Save className="h-4 w-4" />}
        className="w-full"
      >
        Save ARV + Repairs + MAO to Lead
      </Button>
    </CardContent>
  </Card>
)}
```

Add `Save` to the lucide-react imports at the top of `DealAnalyzer.tsx`.

---

## TASK 7 — Add Outreach Timeline Tab to Lead Detail Drawer

In `src/pages/Leads.tsx`, inside `LeadDetailDrawer`, add a tab system with two tabs: **Details** and **Activity Timeline**.

At the top of `LeadDetailDrawer`, add:
```tsx
import { OutreachTimeline } from '@/components/leads/OutreachTimeline';

// Add to component state:
const [activeTab, setActiveTab] = useState<'details' | 'timeline'>('details');
```

Wrap the existing form content in a tab panel:
```tsx
{/* Tab headers */}
<div className="flex border-b border-gray-200 -mx-6 px-6">
  {(['details', 'timeline'] as const).map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={cn(
        'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize',
        activeTab === tab
          ? 'border-[#1B3A5C] text-[#1B3A5C]'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      )}
    >
      {tab === 'timeline' ? 'Activity Timeline' : 'Details'}
    </button>
  ))}
</div>

{/* Tab content */}
{activeTab === 'details' && (
  // ... all the existing form JSX goes here ...
)}
{activeTab === 'timeline' && (
  <div className="py-2">
    <OutreachTimeline leadId={lead.id} />
  </div>
)}
```

---

## TASK 8 — Add Realtime Subscriptions

In `src/hooks/useDeals.ts`, add a realtime subscription inside `useDeals` so the Kanban board updates live:

```ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Inside useDeals(), after the useQuery call:
const qc = useQueryClient();

useEffect(() => {
  const channel = supabase
    .channel('deals-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'deals' }, () => {
      qc.invalidateQueries({ queryKey: ['deals'] });
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [qc]);
```

Do the same for tasks in `src/hooks/useTasks.ts` inside `useTasks`:

```ts
useEffect(() => {
  const channel = supabase
    .channel('tasks-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [qc]);
```

---

## TASK 9 — Delete Orphaned/Unused Files

Delete these files that are no longer needed:
- `src/App.css` — Vite default file, not imported anywhere

```bash
rm src/App.css
```

---

## TASK 10 — Final Build Verification & Commit

After completing all tasks above:

```bash
# 1. Verify zero build errors
npm run build

# 2. Verify dev server starts cleanly
npm run dev
# Open http://localhost:5173 — should show login page
# After login should reach dashboard with no console errors

# 3. Commit everything
git add .
git commit -m "feat: fix build errors, add auth, log activity, move to pipeline, realtime, outreach timeline"
git push
```

---

## Setup Instructions (for the project owner)

### 1. Clone and install

```bash
git clone https://github.com/julysses/wholesale-control-center.git
cd wholesale-control-center
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Go to **Settings → API** and copy:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` public key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` secret key → for Edge Function secrets only

### 3. Create `.env.local` (gitignored)

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_NAME=WholesaleOS
```

### 4. Run the database migration

In Supabase dashboard → **SQL Editor** → paste and run the full contents of:
```
supabase/migrations/001_initial_schema.sql
```

### 5. Create your user account

In Supabase dashboard → **Authentication → Users → Add user**
Create your email/password login. The app does not have self-signup by design.

### 6. Set up and deploy Edge Functions

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# Set secrets (these stay server-side, never in .env.local)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Deploy all 4 AI agent functions
supabase functions deploy qualify-lead
supabase functions deploy generate-offer
supabase functions deploy write-outreach
supabase functions deploy match-buyers
```

### 7. Run locally

```bash
npm run dev
# Opens at http://localhost:5173
```

---

## Deployment to Vercel

```bash
npm install -g vercel
vercel
```

In Vercel dashboard → Project → Settings → Environment Variables, add:
```
VITE_SUPABASE_URL        = https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY   = your-anon-key
VITE_APP_NAME            = WholesaleOS
```

Redeploy after adding env vars. The Supabase Edge Functions run on Supabase's infrastructure — no server needed.

---

## Architecture Overview

### Data Flow

```
User → React UI → TanStack Query → Supabase JS Client → PostgreSQL (RLS enforced)
                                 → Supabase Edge Function → Claude API → Response
```

### AI Agents (Edge Functions)

Each function in `supabase/functions/` follows this pattern:
1. Receive authenticated POST from frontend via `supabase.functions.invoke()`
2. Pull additional data from Supabase if needed (e.g. buyer list for match-buyers)
3. Build prompt and call `https://api.anthropic.com/v1/messages` with `claude-sonnet-4-5`
4. Parse JSON response from Claude
5. Log run to `ai_agent_log` table (fire-and-forget)
6. Return structured JSON to frontend

### State Management

- **Zustand** — UI state only (sidebar collapse, selected lead, deal list for optimistic updates)
- **TanStack Query** — all server state (leads, deals, buyers, tasks). 60s stale time.
- **Supabase Realtime** — live invalidation on `deals` and `tasks` table changes

### Authentication

- Supabase Auth (email/password)
- Session stored in localStorage by Supabase JS client automatically
- `App.tsx` listens to `onAuthStateChange` — routes render based on session presence
- RLS on all tables: `auth.role() = 'authenticated'` — no data accessible without login
- No self-signup: users created manually in Supabase dashboard

---

## Database Tables

| Table | Key Fields | Notes |
|---|---|---|
| `leads` | property_address, status, total_score (generated), owner_*, score_* | Core entity. total_score is computed column |
| `deals` | lead_id (FK), stage, contract_price, assignment_fee, closing_date | Pipeline tracking |
| `buyers` | first_name, last_name, tier, target_zips[], strategy[], max_price | Buy-box criteria |
| `tasks` | title, due_date, priority, status, lead_id/deal_id/buyer_id | Follow-up system |
| `outreach_activity` | lead_id (FK), channel, direction, message, response | Contact log per lead |
| `comps` | lead_id (FK), sale_price, sqft, distance_miles | For ARV calc |
| `ai_agent_log` | agent_type, input_data, output_data, tokens_used | Usage tracking |

---

## Color Palette

| Variable | Hex | Usage |
|---|---|---|
| Primary (Navy) | `#1B3A5C` | Sidebar background, primary buttons, headers |
| Accent (Orange) | `#E8720C` | CTAs, active nav items, hot badges |
| Secondary (Blue) | `#2E6DA4` | Links, info states, secondary accents |
| Background | `#F2F4F6` | Page background |
| Cards | `#FFFFFF` | Card surfaces with `shadow-sm border border-gray-200` |

---

## NPM Scripts

```bash
npm run dev      # Dev server at http://localhost:5173 with HMR
npm run build    # TypeScript check + Vite production build → dist/
npm run preview  # Serve the dist/ folder locally
npm run lint     # ESLint check
```

---

## Known Issues / Remaining Polish (do after the 10 tasks above)

- **Empty states** — Leads, Buyers, Pipeline columns, and Tasks need illustrated empty states with CTA buttons when there's no data
- **Responsive layout** — Test at 768px (tablet). The Kanban board needs `overflow-x-auto` wrapper confirmed working
- **Lead Detail — Comps section** — Allow adding comps directly from the drawer (currently only in Deal Analyzer)
- **Tasks — Link to Lead/Deal** — The task create form should have dropdowns to link to a lead or deal
- **Reports — Export CSV** — Add download buttons on each report card
- **Notification bell** — Wire the TopBar bell to query tasks due today that are still pending
- **Mark DNC action** — The lead row action "Mark DNC" should call `updateLead({ status: 'dnc', dnc: true })`
