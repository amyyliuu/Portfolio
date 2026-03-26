import { Hero } from "./components/Hero";
import { FlowProject } from "./components/FlowProject";
import { ShoeRackViewer } from "./components/ShoeRackViewer";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="overflow-x-hidden bg-[#FFF4EA]">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <Hero />
      
      <section id="projects" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-6xl md:text-7xl mb-4 text-[#7EACB5] font-semibold tracking-tight">
            My Projects
          </h2>
          <p className="text-gray-600 text-lg font-light">
            Exploring the intersection of AI and thoughtful design
          </p>
        </div>

        <FlowProject />
        <ShoeRackViewer />
      </section>

      <Footer />
    </div>
  );
}

export default App;