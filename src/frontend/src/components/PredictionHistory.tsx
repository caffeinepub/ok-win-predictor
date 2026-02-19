import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, TrendingUp, Loader2 } from 'lucide-react';
import { usePredictionHistory } from '../hooks/useQueries';
import { formatTimestamp, getOutcomeColor, getNumberColor } from '../lib/utils';

export function PredictionHistory() {
  const { data: history, isLoading, isError } = usePredictionHistory();

  return (
    <Card className="border-2 border-accent/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <History className="h-6 w-6 text-chart-2" />
          Prediction History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          View all your past predictions and confidence scores
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12 space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Loading history...</span>
          </div>
        ) : isError ? (
          <div className="text-center py-12 space-y-2">
            <div className="text-destructive font-semibold">Failed to load history</div>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </div>
        ) : !history || history.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">No Predictions Yet</h3>
              <p className="text-sm text-muted-foreground">
                Generate your first prediction to see it appear here
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {history.map((prediction, index) => {
                const confidence = Number(prediction.confidence);
                const isHighConfidence = confidence >= 80;
                const predictedNum = Number(prediction.predictedNumber);
                
                return (
                  <div
                    key={`${prediction.timestamp}-${index}`}
                    className="p-4 rounded-lg border border-border bg-gradient-to-r from-card to-accent/5 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30">
                            <span className={`text-3xl font-black ${getNumberColor(predictedNum)}`}>
                              {predictedNum}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-chart-2" />
                              <span className={`text-lg font-bold ${getOutcomeColor(prediction.outcome)}`}>
                                {prediction.outcome}
                              </span>
                              {isHighConfidence && (
                                <img 
                                  src="/assets/generated/trophy-icon.dim_128x128.png" 
                                  alt="High confidence" 
                                  className="h-5 w-5"
                                />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatTimestamp(prediction.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-2xl font-bold text-foreground">
                          {confidence}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          confidence
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-chart-1 to-chart-2 transition-all"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
