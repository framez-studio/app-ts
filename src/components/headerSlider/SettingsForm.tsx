import { useActiveSectionContext } from '@context/ActiveSectionContext'
import { useStructureLoader } from '@hooks/useStructureLoader'
import AppTitle from '@components/AppTitle'
import ErrorMessage from '@components/ErrorMessage'
import FormButton from '@components/FormButton'
import FormSectionLabel from '@components/FormSectionLabel'
import UploadButton from '@components/UploadButton'

const SettingsForm = () => {
	const { downloadStructure, handleUploadInputChange } = useStructureLoader()
	const { setActiveSection } = useActiveSectionContext()

	return (
		<section className="form-container">
			<section className="form-main col-2">
				<AppTitle className="span-2" />
				<FormSectionLabel
					props={{
						label: 'Structure',
						isActive: true,
					}}
					className="span-2"
				/>
				<UploadButton
					props={{
						text: 'Upload',
						onChange: handleUploadInputChange,
					}}
					className="span-1"
				/>
				<FormButton
					props={{ text: 'Download', onClick: downloadStructure }}
					className="span-1"
				/>
				<FormButton
					props={{
						text: 'Generator',
						onClick: () => setActiveSection('generator'),
					}}
					className="span-1"
				/>
				<FormSectionLabel
					props={{
						label: 'Settings',
						isActive: true,
					}}
					className="span-2"
				/>
			</section>
			<section className="form-footer col-2"></section>
		</section>
	)
}

export default SettingsForm
