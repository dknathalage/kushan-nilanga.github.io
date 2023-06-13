import IntroSection from "./components/Intro";
import ProjectSection from "./components/Project";

function App() {
  return (
    // tailwindcss
    <div className="dark:bg-neutral-900 mx-auto">
      <div>
        <IntroSection />
      </div>
      <div className="container mx-auto">
        <ProjectSection />
      </div>
    </div>
  );
}

export default App;
