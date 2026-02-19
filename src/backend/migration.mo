import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  type OldPrediction = {
    outcome : Text;
    confidence : Nat;
    timestamp : Time.Time;
  };

  type OldActor = {
    predictionHistory : Map.Map<Time.Time, OldPrediction>;
  };

  type NewPrediction = {
    outcome : Text;
    predictedNumber : Nat;
    confidence : Nat;
    timestamp : Time.Time;
  };

  type NewActor = {
    predictionHistory : Map.Map<Time.Time, NewPrediction>;
  };

  public func run(old : OldActor) : NewActor {
    let newPredictionHistory = old.predictionHistory.map<Time.Time, OldPrediction, NewPrediction>(
      func(_timestamp, prediction) {
        {
          prediction with
          predictedNumber = 0;
        };
      }
    );
    { predictionHistory = newPredictionHistory };
  };
};

