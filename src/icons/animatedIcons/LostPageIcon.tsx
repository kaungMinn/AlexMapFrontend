import IconGenerator from "./IconGenerator";
import { IconTypes } from "./types";
import Icon from '@/assets/animatedIcons/notFound.json';

const LostPageIcon = (props: IconTypes) => {
    const { isLoop = true, isAutoPlay = true } = props;
    return (
        <IconGenerator iconData={Icon} isLoop={isLoop} isAutoPlay={isAutoPlay} />
    );
};

export default LostPageIcon;
