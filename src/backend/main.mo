import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Prediction = {
    outcome : Text;
    predictedNumber : Nat;
    confidence : Nat;
    timestamp : Time.Time;
  };

  module Prediction {
    public func compare(p1 : Prediction, p2 : Prediction) : Order.Order {
      Nat.compare(p1.confidence, p2.confidence);
    };
  };

  let predictionHistory = Map.empty<Time.Time, Prediction>();

  public shared ({ caller }) func generatePrediction(outcome : Text, predictedNumber : Nat, confidence : Nat) : async Prediction {
    let prediction : Prediction = {
      outcome;
      predictedNumber;
      confidence;
      timestamp = Time.now();
    };
    predictionHistory.add(prediction.timestamp, prediction);
    prediction;
  };

  public query ({ caller }) func getPredictionHistory() : async [Prediction] {
    predictionHistory.values().toArray().sort();
  };
};

