import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp, Loader2, Clock } from 'lucide-react';
import { useGeneratePrediction } from '../hooks/useQueries';
import { useCountdownTimer } from '../hooks/useCountdownTimer';
import { usePeriodNumber } from '../hooks/usePeriodNumber';
import { formatTimestamp, getConfidenceLevel, getOutcomeColor, getNumberColor } from '../lib/utils';
import type { Prediction } from '../backend';

const OUTCOMES = ['Big Win', 'Small Win', 'Draw', 'Small Loss', 'Big Loss'];

export function PredictionDisplay() {
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);
  const generateMutation = useGeneratePrediction();
  const { periodNumber, increment } = usePeriodNumber();

  const handleGenerate = () => {
    const randomOutcome = OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)];
    const randomConfidence = BigInt(Math.floor(Math.random() * 40) + 60);

    generateMutation.mutate(
      { outcome: randomOutcome, confidence: randomConfidence },
      {
        onSuccess: (data) => {
          setCurrentPrediction(data);
        },
      }
    );
  };

  const handleAutoGenerate = () => {
    increment();
    handleGenerate();
  };

  const { seconds } = useCountdownTimer({
    initialSeconds: 30,
    onComplete: handleAutoGenerate,
  });

  // Generate initial prediction on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confidenceNum = currentPrediction ? Number(currentPrediction.confidence) : 0;
  const confidenceInfo = getConfidenceLevel(confidenceNum);

  return (
    <Card className="border-2 border-accent/20 shadow-xl bg-gradient-to-br from-card via-card to-accent/5">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-3xl font-bold flex items-center gap-2 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          <Sparkles className="h-8 w-8 text-chart-1 animate-pulse" />
          OK Win Predictor
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Generate AI-powered game predictions with confidence scores
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Period Number and Countdown Timer */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-chart-1/10 via-chart-2/10 to-chart-3/10 border border-accent/20">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 text-white font-bold">
              #{periodNumber}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Period {periodNumber}</div>
              <div className="text-xs text-muted-foreground">Current prediction cycle</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-accent/30">
            <Clock className="h-4 w-4 text-chart-2" />
            <div className="text-right">
              <div className="text-2xl font-bold text-chart-2">{seconds}s</div>
              <div className="text-xs text-muted-foreground">remaining</div>
            </div>
          </div>
        </div>

        {currentPrediction ? (
          <div className="space-y-6">
            {/* Predicted Number Display */}
            <div className="text-center space-y-3 p-8 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border-2 border-accent/30">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Predicted Number
              </div>
              <div className={`text-8xl font-black tracking-tight ${getNumberColor(Number(currentPrediction.predictedNumber))}`}>
                {Number(currentPrediction.predictedNumber)}
              </div>
              <div className="text-xs text-muted-foreground">
                {Number(currentPrediction.predictedNumber) % 2 === 1 ? 'Odd' : 'Even'}
              </div>
            </div>

            {/* Outcome Display */}
            <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Predicted Outcome
              </div>
              <div className={`text-5xl font-black tracking-tight ${getOutcomeColor(currentPrediction.outcome)}`}>
                {currentPrediction.outcome}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatTimestamp(currentPrediction.timestamp)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">Confidence Level</span>
                <span className="font-bold text-lg">{confidenceNum}%</span>
              </div>
              <Progress value={confidenceNum} className="h-3" />
              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium px-3 py-1 rounded-full ${confidenceInfo.color} text-white`}>
                  {confidenceInfo.label}
                </span>
                <span className="text-muted-foreground">
                  {confidenceNum >= 70 ? 'Strong signal detected' : 'Moderate confidence'}
                </span>
              </div>
            </div>

            {confidenceNum >= 80 && (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
                <img 
                  src="/assets/generated/trophy-icon.dim_128x128.png" 
                  alt="Trophy" 
                  className="h-6 w-6"
                />
                <span className="text-sm font-semibold text-success">High Confidence Prediction!</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 text-white">
              <Sparkles className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Ready to Predict</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Generating your first OK Win game prediction...
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
          className="w-full h-12 text-base font-bold bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 hover:opacity-90 transition-opacity"
          size="lg"
        >
          {generateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate New Prediction
            </>
          )}
        </Button>

        {generateMutation.isError && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive text-center">
            Failed to generate prediction. Please try again.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
