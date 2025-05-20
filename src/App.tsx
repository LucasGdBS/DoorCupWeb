import { Slider } from "./components/ui/slider";
import { useEffect, useState } from "react";
import { db, ref, onValue, set } from "@/services/firebase";

function App() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([25]);

  useEffect(() => {
    const tempRef = ref(db, "/temperature");
    const unsubscribe = onValue(tempRef, (snapshot) => {
      const value = snapshot.val();
      setTemperature(value);
    });

    return () => unsubscribe(); // limpa listener ao desmontar
  }, []);

  useEffect(() => {
    const setTempRef = ref(db, "/setTemperature");
    set(setTempRef, sliderValue[0])
      .then(() => console.log("Temperatura desejada enviada:", sliderValue[0]))
      .catch((err) => console.error("Erro ao enviar temperatura:", err));
  }, [sliderValue]);

  return (
    <div className="max-h-screen min-h-screen bg-[#091213] p-28 px-8 text-white font-semibold">
      <header className="w-full flex justify-center mb-12">
        <img
          src="src/assets/DoorCupLogo.png"
          alt="Logo"
          className="w-32 h-auto rounded-4xl"
        />
      </header>
      <main className="flex flex-col justify-center items-center gap-10">
        <div className="text-center mb-40">
          <h1 className="text-2xl">Temperatura atual do copo:</h1>
          <h2 className="text-7xl">
            {temperature ? temperature?.toFixed(2) : "..."}ºC
          </h2>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-6 lg:max-w-1/2">
          <h3 className="text-xl">Selecione a temperatura desejada</h3>
          <h3 className="text-xl">{sliderValue}ºC</h3>
          <Slider
            max={50}
            step={1}
            className=""
            value={sliderValue}
            onValueChange={setSliderValue}
          />
          <div className="flex w-full justify-between">
            <h4 className="text-blue-300">Frio</h4>
            <h4 className="text-pink-300 ">Neutro</h4>
            <h4 className="text-red-300 ">Quente</h4>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
