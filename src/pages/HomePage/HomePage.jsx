import FloatingLines from '../../components/FloatingLines';
import SvgText from '../../components/SvgText';

const HomePage = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      background: '#000',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
        width: '100%'
      }}>
        <SvgText />
      </div>
    </div>
  );
};

export default HomePage;