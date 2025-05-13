import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, ColDef, GroupCellRendererParams } from 'ag-grid-community';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxProvider';
import { getALlLocations } from '@/store/actions/locationAction';
import { Img } from 'react-image';
import Loader from '@/icons/animatedIcons/Loader';
import { MdOutlineImageNotSupported } from "react-icons/md";
import PageLoading from '@/components/loadings/PageLoading';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { MAP_ROUTE, UPDATE_ROUTE } from '@/constants/routePaths';
import { LiaMapMarkerSolid } from "react-icons/lia";


ModuleRegistry.registerModules([AllCommunityModule]);


const ImageRenderer = ({ params }: { params: GroupCellRendererParams }) => {
    return <div className='flex items-center justify-center h-full'>
        {
            params.data.image !== 'No Image' ? <Img className='h-[2rem] w-[2rem] rounded-lg' src={params.data.image} alt='No Image' loader={<div className='w-[3rem]'><Loader /></div>} /> : <div className='flex items-center justify-center'><MdOutlineImageNotSupported size={25} className='text-gray-300' /></div>
        }
    </div>
}

const ActionRenderer = ({ params, handleUpdate, handleGotoMap }: { params: GroupCellRendererParams, handleUpdate: (params: GroupCellRendererParams) => void, handleGotoMap: (params: GroupCellRendererParams) => void }) => {
    return <div className='flex items-center gap-2 h-full justify-between w-full '>
        <FiEdit size={15} className={`text-primary cursor-pointer`} onClick={() => handleUpdate(params)} />
        <div className='w-[1px] h-full bg-gray-300'></div>
        <LiaMapMarkerSolid size={20} className={`text-success  cursor-pointer`} onClick={() => handleGotoMap(params)} />
    </div>
}

const LocationList = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const gridRef = useRef<AgGridReact | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: { allLocations }, isLoading } = useAppSelector(state => state.location);

    const handleUpdate = (params: GroupCellRendererParams) => {
        navigate(UPDATE_ROUTE, { state: { nodeId: params.data._id } });
    }

    const handleGotoMap = (params: GroupCellRendererParams) => {
        navigate(MAP_ROUTE, { state: { position: [[Number(params.data.lat), Number(params.data.lon)]] } })
    }

    const onFilterTextBoxChanged = useCallback(() => {
        const filterTextBox = document.getElementById("filter-text-box") as HTMLInputElement | null;
        gridRef?.current?.api.setGridOption(
            "quickFilterText",
            filterTextBox?.value,
        );
    }, []);


    const colDefs: ColDef[] = [
        {
            field: "image",
            headerName: "Picture",
            width: 100,
            cellRenderer: (params: GroupCellRendererParams) => {
                return <ImageRenderer params={params} />
            }
        },
        {
            field: "name",
            headerName: "Name",
            sortable: true,
            resizable: true,
            filter: true,
            width: isMobile ? 200 : 300,

        },
        {
            field: "lat",
            headerName: "Latitude",
            sortable: true,
            resizable: true,
            filter: true,
            cellClass: "bg-purple-50 hover:bg-purple-100",
            headerClass: "bg-purple-50 hover:bg-purple-100",
            width: isMobile ? 200 : 300
        },
        {
            field: "lon",
            headerName: "Longitude",
            sortable: true,
            resizable: true,
            filter: true,
            cellClass: "bg-blue-50 hover-blue-100",
            headerClass: "bg-blue-50 hover-blue-100",
            width: isMobile ? 200 : 300
        },
        {
            field: "desc",
            headerName: "Description",
            sortable: true,
            resizable: true,
            filter: true,
            width: isMobile ? 300 : 400,

        },
        {
            field: 'actions',
            headerName: "Action",
            pinned: 'right',
            width: 100,
            sortable: false,
            resizable: false,
            cellRenderer: (params: GroupCellRendererParams) => {
                return <ActionRenderer params={params} handleUpdate={handleUpdate} handleGotoMap={handleGotoMap} />
            }

        }

    ]


    //Life circles
    useEffect(() => {
        dispatch(getALlLocations())
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="pt-7 px-4">
            <h1 className="heading-font space-y-2 mb-4 border-b border-gray-300 pb-5">
                <p>Location List</p>
                <p className="secondary-font">Where you manage your location nodes.</p>
            </h1>

            <input type='text' id='filter-text-box' onInput={onFilterTextBoxChanged} className='p-2 w-[20rem] secondary-font mb-2 outline-none rounded-md shadow-md shadow-gray-300' placeholder='Search..' />
            <div className="h-[35rem] w-full shadow-sm shadow-gray-300 rounded-lg overflow-hidden">

                <AgGridReact ref={gridRef} columnDefs={colDefs} rowData={allLocations} pagination={!isMobile} paginationPageSize={20} />
            </div>
            {isLoading && <PageLoading />}

            {/* <TryAgainBox open={tryAgain} message='Please select a row.' tryAgain={() => setTryAgain(false)} /> */}
        </div>
    )
}

export default LocationList