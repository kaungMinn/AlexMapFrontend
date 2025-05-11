import IconGenerator from "./IconGenerator";
import { IconTypes } from "./types";
import Icon from '@/assets/animatedIcons/loading.json';

const LoadingIcon = (props: IconTypes) => {
    const { isLoop = true, isAutoPlay = true } = props;
    return (
        <IconGenerator iconData={Icon} isLoop={isLoop} isAutoPlay={isAutoPlay} />
    );
};

export default LoadingIcon;
