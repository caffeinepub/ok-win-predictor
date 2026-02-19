# Specification

## Summary
**Goal:** Add predicted number (0-9) display to the prediction interface alongside the existing Big/Small outcome.

**Planned changes:**
- Extend backend Prediction type to include a predicted number field (0-9)
- Display the predicted number prominently in the PredictionDisplay component
- Add a Number column to the PredictionHistory table showing predicted numbers for each past prediction
- Color-code numbers in the history table (green for odd numbers, red for even numbers)

**User-visible outcome:** Users will see a predicted number (0-9) displayed alongside each Big/Small prediction, with historical numbers visible in the prediction history table using color-coded formatting.
