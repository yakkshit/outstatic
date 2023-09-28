


import SliderWave from '@/components/ThreeDBackground';
import ThreeDParticleWave from '@/components/ThreeDBackground';
import Navbar from '@/components/navbar';
import { ModeToggle } from '@/components/toggle';
import ThreeDObjectViewer from '@/components/viewer/viewer';
import Editor from '@/components/viewer/viewer';
import Image from 'next/image';
import Post from '../post/page';

const Test: React.FC = () => {
  return (
    <div className="container">
      <div className="mode-toggle">
        <Navbar/>
        <div className="border bg-card text-card-foreground p-3 shadow-sm md:rounded-lg flex justify-between items-center top-0 sticky z-50">
          {/* <ThreeDObjectViewer/> */}
          <Post/>
        </div>
      </div>
    </div>
  );
};

export default Test;
