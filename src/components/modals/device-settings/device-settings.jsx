import Toggle from '../../toggle/toggle';
import { GenericModal } from '../modal';

export const DeviceSettings = ({deviceName, active, closeModal, index}) => {
	return (
		<GenericModal
		width='200px'
			active={active}
			closeModal={closeModal}
			headerTitle = {`${deviceName} settings`}
			content={
				<div className='modal-content-container'>
					<div>
						<p className='description'>Pin</p>
						<p>0</p>
					</div>
					<div>
						<p className='description'>Name</p>
						<p>{deviceName}</p>
					</div>
					<div>
						<p className='description'>Index</p>
						<p>{index}</p>
					</div>
					<div>
						<p className='description'>Icon</p>
						<i className={`fa-solid fa-${deviceName.toLowerCase()}`}></i>
					</div>
					<div>
						<p className='description'>Enable</p>
						<Toggle 
							size='small'
						/>
					</div>
				</div>
			}
		/>
	)
}
