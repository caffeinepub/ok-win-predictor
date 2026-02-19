import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Prediction } from '../backend';

export function useGeneratePrediction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ outcome, confidence }: { outcome: string; confidence: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      // Generate random number between 0 and 9
      const predictedNumber = BigInt(Math.floor(Math.random() * 10));
      return actor.generatePrediction(outcome, predictedNumber, confidence);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['predictionHistory'] });
    },
  });
}

export function usePredictionHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<Prediction[]>({
    queryKey: ['predictionHistory'],
    queryFn: async () => {
      if (!actor) return [];
      const history = await actor.getPredictionHistory();
      return history.sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
  });
}
