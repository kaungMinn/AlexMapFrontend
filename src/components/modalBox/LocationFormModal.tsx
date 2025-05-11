import LocationForm from '../forms/LocationForm'
import Box from './Box'

const LocationFormModal = () => {
    return (
        <Box open={true} onCloseModal={() => { }} titleLabel='Location Form'>
            <LocationForm />
        </Box>
    )
}

export default LocationFormModal