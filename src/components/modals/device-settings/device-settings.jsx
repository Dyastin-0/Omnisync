import Toggle from '../../toggle/toggle';
import { GenericModal } from '../modal';

export const DeviceSettings = ({deviceName, enabled, handleDeviceState, devicePin, active, closeModal, index}) => {
	return (
		<GenericModal
		width='150px'
			active={active}
			closeModal={closeModal}
			headerTitle = {`${deviceName}`}
			content={
				<div className='modal-content-container'>
					<div className='row space-between'>
						<div className='column flex'>
							<p className='description'>Pin</p>
							<p>{devicePin}</p>
						</div>
						<div className='column flex'>
							<p className='description'>Name</p>
							<p>{deviceName}</p>
						</div>
						<div className='column flex'>
							<p className='description'>Index</p>
							<p>{index}</p>
						</div>
					</div>
					<div className='row space-between'>
						<div className='column flex'>
							<p className='description'>Icon</p>
							<i className={`fa-solid fa-${deviceName.toLowerCase()}`}></i>
						</div>
						<div className='column flex'>
							<p className='description'>Enable</p>
							<Toggle
								checked={enabled}
								onchange={handleDeviceState}
								size='small'
							/>
						</div>
						<div className='column flex'></div>
					</div>
				</div>
			}
		/>
	)
}
