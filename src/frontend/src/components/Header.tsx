import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                OK Win Predictor
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Game Predictions</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
