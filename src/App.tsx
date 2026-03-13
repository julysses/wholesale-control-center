import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
