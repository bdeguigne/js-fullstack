import Lottie from 'react-lottie';
import animationData from '../lottie/67230-trophy-winner.json';

function WinnerAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid',
    },
  };

  return <Lottie options={defaultOptions} height={600} width={600} />;
}

export default WinnerAnimation;
