import { Concrete, Steel } from '@classes'
import { IConcreteProps } from '@interfaces'

export const Concre21Props: IConcreteProps = {
	name: 'Concrete21MPA',
	fc: 21,
	weight: 24,
	young: 21538,
	epsilon_max: 0.004,
}
export const Concre21D3Props: IConcreteProps = {
	name: 'Concrete21D3MPA',
	fc: 21,
	weight: 24,
	young: 21538,
	epsilon_max: 0.003,
}
export const Concrete21PascalProps: IConcreteProps = {
	name: 'Concrete21Pascal',
	fc: 21,
	weight: 24,
	young: 200000000,
	epsilon_max: 0.003,
}

export const Concrete21 = new Concrete('Concrete21MPA', 21, 24, 21538, 0.004)
export const Concrete21Tarea = new Concrete(
	'Concrete21MPA',
	21,
	24,
	21538,
	0.003,
)
export const Concrete21Curve = new Concrete(
	'Concrete21MPA',
	21,
	24,
	21538105.7662924,
	0.003,
)
export const Concrete21Pascal = new Concrete(
	'Concrete21MPA',
	21,
	24,
	200000000,
	0.003,
)
export const SteelG60 = new Steel('SteelG60', 200000, 72, 420)
export const epsilonmax_cnrc = 0.004
