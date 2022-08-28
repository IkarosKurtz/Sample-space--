import React, { useState } from 'react';
import '../styles/Subconjuntos.css';
let indice = 0;
let omega = ['aaa', 'aas', 'asa', 'ass', 'saa', 'sas', 'ssa', 'sss'];
let arreglochars = [0, 0, 0, 0, 0, 0, 0, 0];
let eventos = [];

function cardinalidad(array) {
	let cant = 0;
	for (let i = 0; i < 8; i++) {
		array[i] === 1 ? cant++ : (cant = cant);
	}
	return cant;
}

function conversor(n, index) {
	let aux;
	aux = n % 2;
	aux = parseInt(aux, 10);
	arreglochars[indice] = aux;

	indice++;

	n /= 2;
	if (n !== 0) {
		conversor(n, index);
	} else {
		let cardin = cardinalidad(arreglochars);
		let probab = cardin / 38;
		let event = [];

		for (let i = 0; i < 8; i++) {
			if (arreglochars[i] === 1) {
				event.push(omega[i]);
			}
		}
		console.log(event);
		console.log(arreglochars);
		eventos.push({ Index: index, Evento: `{${event.map((e) => `${e}, `)}}`, Cardinalidad: cardin, Probabilidad: probab.toFixed(4) });
	}
}
export function Subconjuntos() {
	const [data, setData] = useState(eventos);

	const handleAddEvento = () => {
		for (let i = 0; i < 256; i++) {
			indice = 0;
			conversor(i, i + 1);
		}

		setData((prev) => {
			return [...prev, eventos];
		});
	};

	return (
		<div className="sub-container">
			<button onClick={handleAddEvento}>Calcular</button>
			<table className="table-omega">
				<thead>
					<tr>
						<th>Subconjunto No.</th> <th>Evento A</th> <th>Cardinalidad #A</th> <th>Probabilidad (A)</th>
					</tr>
				</thead>

				{data.map((subconjunto) => {
					return (
						<tr>
							<td>{subconjunto.Index}</td>
							<td>{subconjunto.Evento}</td>
							<td>{subconjunto.Cardinalidad}</td>
							<td>{subconjunto.Probabilidad}</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}
