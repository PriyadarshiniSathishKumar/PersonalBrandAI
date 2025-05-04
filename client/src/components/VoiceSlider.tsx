import { Slider } from "@/components/ui/slider";

interface VoiceSliderProps {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export default function VoiceSlider({ 
  leftLabel, 
  rightLabel, 
  value, 
  onChange 
}: VoiceSliderProps) {
  return (
    <div className="transition-all duration-300 hover:transform hover:scale-102 animate-fade-in">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-bold px-2 py-1 bg-black text-white rounded-md shadow-sm animate-pulse-subtle">{leftLabel}</span>
        <span className="font-bold px-2 py-1 border-2 border-black rounded-md shadow-sm">{rightLabel}</span>
      </div>
      <Slider
        defaultValue={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(values) => onChange(values[0])}
        className="h-3 mt-3"
      />
      <div className="flex justify-center mt-3">
        <span className="font-bold text-lg">{value}%</span>
      </div>
    </div>
  );
}
