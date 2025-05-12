import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

const PrimaryTable = () => {
    return (
        <div>
            <AgGridReact />
        </div>
    )
}

export default PrimaryTable