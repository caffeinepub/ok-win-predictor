import { Heart } from 'lucide-react';

export function Footer() {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'ok-win-predictor';

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            Built with{' '}
            <Heart className="h-4 w-4 text-chart-1 fill-chart-1 animate-pulse" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-chart-1 transition-colors underline decoration-chart-1/30 hover:decoration-chart-1"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OK Win Predictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
