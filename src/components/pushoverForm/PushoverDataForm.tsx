import { usePushoverContext } from '@context/PushoverContext'
import FormButton from '@components/FormButton'
import PushoverDataRow from './PushoverDataRow'
import FormSectionLabel from '@components/FormSectionLabel'

const PushoverDataForm = () => {
	const { state, updateActiveSection } = usePushoverContext()
	const { data } = state.results

	const inputs = data.map((item, indx) => (
		<PushoverDataRow key={`i-${indx}`} props={{ data: item }} />
	))
	return (
		<section className="form-container">
			<section className="form-main col-2">
				<FormSectionLabel
					props={{ label: 'Displacement', isActive: true }}
				/>
				<FormSectionLabel props={{ label: 'Force', isActive: true }} />
				{inputs}
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Back',
						onClick: () => updateActiveSection('graph'),
					}}
				/>
			</section>
		</section>
	)
}

export default PushoverDataForm
