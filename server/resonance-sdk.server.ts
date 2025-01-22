import Resonance from '@resonance-run/resonance-node';

const amplifierSourceUrl = process.env.AMPLIFIER_STORE_URL || 'https://resonance-client-cache.fly.dev';
const resonance = new Resonance(amplifierSourceUrl);
if (process.env.GA_TRACKING_ID && process.env.GA_API_SECRET) {
  resonance.initGA(process.env.GA_TRACKING_ID, process.env.GA_API_SECRET);
}
export const getResonanceInstance = () => {
  if (process.env.GA_TRACKING_ID && process.env.GA_API_SECRET) {
    resonance.initGA(process.env.GA_TRACKING_ID, process.env.GA_API_SECRET);
  }
  return resonance;
};
