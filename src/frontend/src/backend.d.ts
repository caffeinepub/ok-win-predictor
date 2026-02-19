import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Prediction {
    predictedNumber: bigint;
    timestamp: Time;
    confidence: bigint;
    outcome: string;
}
export type Time = bigint;
export interface backendInterface {
    generatePrediction(outcome: string, predictedNumber: bigint, confidence: bigint): Promise<Prediction>;
    getPredictionHistory(): Promise<Array<Prediction>>;
}
