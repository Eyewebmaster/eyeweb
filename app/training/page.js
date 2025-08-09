
import React from 'react'; // <--- Ensure React is imported
import Training from "./components/Training"; // This is your main Training content component
import Training_Content from './components/WebAppTraining';
import GraphicsAdsMarketing from './components/GraphicsAdsMarketing';

export const metadata = {
  title: "Cebu Web Developer Trainings for Website and Apps",
  description: "Cebu Full Stack Developer training Website and Apps",
};

export default function TrainingPage() {

  return (
    <div>
      <Training/>
      <Training_Content />
      <GraphicsAdsMarketing />
    
    </div>
  );
}