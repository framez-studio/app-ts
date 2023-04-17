import '@styles/Plotter.sass'
import { usePushoverContext } from '@context/PushoverContext'
import FormButton from '@components/FormButton'
import Plotter from '@components/Plotter'
import FormSectionLabel from '@components/FormSectionLabel'
import PushoverStepSwitcher from './PushoverStepSwitcher'

const PushoverGraphForm = () => {
	const { state, updateActiveSection } = usePushoverContext()
	const { data } = state.results
	return (
		<section className="form-container">
			<section className="form-main">
				<FormSectionLabel
					props={{ label: 'Plasticizing Sequence', isActive: true }}
				/>
				<PushoverStepSwitcher />
				<FormSectionLabel
					props={{ label: 'Capacity Curve', isActive: true }}
				/>
				<Plotter
					props={{
						yLabel: 'Vs [kN]',
						xLabel: 'U [mm]',
						height: 240,
						series: [
							{
								name: 'Regular Model',
								data: data,
								color: '#8d4bf6ff',
								dotColor: '#653AAA',
							},
							// {
							// 	name: 'Bilineal Model',
							// 	data: bilineal,
							// 	color: '#ffffff',
							// 	dotColor: '#ffffff',
							// },
						],
					}}
				/>
			</section>
			<section className="form-footer col-2">
				<FormButton
					props={{
						text: 'Back',
						onClick: () => updateActiveSection('config'),
					}}
				/>
				<FormButton
					props={{
						text: 'See data',
						onClick: () => updateActiveSection('data'),
					}}
				/>
			</section>
		</section>
	)
}

export default PushoverGraphForm
