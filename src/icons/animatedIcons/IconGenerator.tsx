import Lottie, { RendererType } from "lottie-web";
import { useEffect, useRef } from "react";
type PropTypes = {
    iconData: object;
    isLoop?: boolean;
    isAutoPlay?: boolean;
    renderer?: RendererType;
};

const IconGenerator = (props: PropTypes) => {
    const {
        iconData,
        isLoop = true,
        isAutoPlay = true,
        renderer = "svg",
    } = props;

    const animationContainer = useRef(null);

    useEffect(() => {
        if (!animationContainer || !animationContainer.current) return;
        const anim = Lottie.loadAnimation({
            container: animationContainer.current,
            renderer: renderer,
            loop: isLoop,
            autoplay: isAutoPlay,
            animationData: iconData,
        });

        return () => {
            anim.destroy();
        };
        //eslint-disable-next-line
    }, []);
    return <div ref={animationContainer} />;
};

export default IconGenerator;
