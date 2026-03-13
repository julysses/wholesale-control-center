import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUpdateLead } from './useLeads';
import { QualificationResult, OfferResult, OutreachVariation, BuyerMatchResult } from '@/types';

export function useLeadQualifier() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QualificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokensUsed, setTokensUsed] = useState<number | null>(null);
  const updateLead = useUpdateLead();

  const qualify = async (params: {
    lead_id: string;
    property_address: string;
    seller_notes?: string;
    estimated_equity_pct?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('qualify-lead', {
        body: params,
      });
      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);

      setResult(data as QualificationResult);
      setTokensUsed(data.tokens_used ?? null);

      // Update lead scores
      await updateLead.mutateAsync({
        id: params.lead_id,
        updates: {
          score_motivation: data.score_motivation,
          score_timeline: data.score_timeline,
          score_equity: data.score_equity,
          score_condition: data.score_condition,
          score_flexibility: data.score_flexibility,
          ai_qualification_summary: data.qualification_summary,
          status: data.tier === 'HOT'
            ? 'qualified_hot'
            : data.tier === 'WARM'
            ? 'qualified_warm'
            : 'qualified_cold',
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to qualify lead');
    } finally {
      setLoading(false);
    }
  };

  return { qualify, loading, result, error, tokensUsed };
}

export function useOfferGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OfferResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (params: {
    lead_id?: string;
    property_address: string;
    ai_qualification_summary?: string;
    motivation_tag?: string;
    asking_price?: number;
    mao?: number;
    arv?: number;
    repair_estimate?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-offer', {
        body: params,
      });
      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);
      setResult(data as OfferResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate offer');
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, result, error };
}

export function useOutreachWriter() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OutreachVariation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const write = async (params: {
    lead_id?: string;
    property_address: string;
    city?: string;
    owner_first_name?: string;
    motivation_tag?: string;
    contact_attempts?: number;
    channel: string;
    tone: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('write-outreach', {
        body: params,
      });
      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);
      setResult(Array.isArray(data) ? data : data.variations);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to write outreach');
    } finally {
      setLoading(false);
    }
  };

  return { write, loading, result, error };
}

export function useBuyerMatcher() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BuyerMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const match = async (params: {
    deal_id?: string;
    property_address: string;
    contract_price?: number;
    buyer_price?: number;
    arv?: number;
    repair_estimate?: number;
    property_type?: string;
    bedrooms?: number;
    bathrooms?: number;
    zip_code?: string;
    closing_date?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('match-buyers', {
        body: params,
      });
      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);
      setResult(data as BuyerMatchResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to match buyers');
    } finally {
      setLoading(false);
    }
  };

  return { match, loading, result, error };
}
