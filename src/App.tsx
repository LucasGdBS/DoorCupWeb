import { Slider } from "./components/ui/slider";
import { useEffect, useState } from "react";
import { db, ref, onValue, set } from "@/services/firebase";
import Modal from "./components/Modal";

function App() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([25]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState(false);

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

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const isMatching =
      temperature !== null &&
      Math.trunc(Math.abs(temperature)) ===
        Math.trunc(Math.abs(sliderValue[0]));

    if (isMatching && !isBlocked) {
      timeout = setTimeout(() => {
        setShowModal(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [temperature, sliderValue, isBlocked]);

  useEffect(() => {
    if (showModal) {
      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch((e) => {
        console.error("Erro ao reproduzir som:", e);
      });
    }
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsBlocked(true);

    // Bloqueia por 10 segundos
    setTimeout(() => {
      setIsBlocked(false);
    }, 10_000);
  };

  return (
    <>
      {showModal && <Modal onClose={handleCloseModal} />}
      <div className="max-h-screen min-h-screen bg-[#091213] p-28 px-8 text-white font-semibold">
        <header className="w-full flex justify-center mb-12">
          <img
            src="src/assets/DoorCupLogo.png"
            alt="Logo"
            className="w-32 h-auto rounded-4xl"
          />
        </header>
        <main className="flex flex-col justify-center items-center gap-10">
          <div className="text-center">
            <h1 className="text-2xl">Temperatura atual do copo:</h1>
            <h2 className="text-7xl">
              {temperature ? temperature?.toFixed(2) : "..."}ºC
            </h2>
          </div>
          <div className="flex flex-col w-full justify-center items-center gap-6 lg:max-w-1/2">
            <h3 className="text-xl text-center">Temperatura desejada</h3>
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
    </>
  );
}

export default App;
