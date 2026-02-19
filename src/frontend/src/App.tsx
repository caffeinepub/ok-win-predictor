import { PredictionDisplay } from './components/PredictionDisplay';
import { PredictionHistory } from './components/PredictionHistory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/assets/generated/background-pattern.dim_1920x1080.png)' }}>
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
      
      <div className="relative flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <PredictionDisplay />
            <PredictionHistory />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
