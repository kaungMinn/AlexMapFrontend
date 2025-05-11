import Loading from "react-loading";

type PrimaryLoadingType = {
    color?: string;
};

const PrimaryLoading = (props: PrimaryLoadingType) => {
    const { color } = props;
    return (
        <div className="flex items-center gap-2 ">
            <span>L</span>
            <Loading
                type="spinningBubbles"
                className=""
                height={20}
                width={20}
                color={color ? color : "white"}
            />
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
        </div>
    );
};

export default PrimaryLoading;
