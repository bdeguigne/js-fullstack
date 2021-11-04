import Lottie from 'react-lottie';
import animationData from '../lottie/47410-ace-of-spade.json';

function CardAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid',
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
}

export default CardAnimation;
