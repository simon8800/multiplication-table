// Get table element
const multiplicationTableElement = document.querySelector('#multiplication-table');

// Create the header row from 1-12
const thead = document.querySelector('#multiplication-header-row');
const multiplicationHeader = document.createElement('th');

multiplicationHeader.innerHTML = '&times';
thead.appendChild(multiplicationHeader);
for (let i = 1; i < 13; i++) {
	const headerRow = document.createElement('th');
	headerRow.setAttribute('scope', 'col');
	headerRow.innerText = i;
	thead.appendChild(headerRow);
}
multiplicationTableElement.appendChild(thead);


// Create each row with 12 td and just do row# x col# to get td
for (let i = 1; i < 13; i++) {
	const row = document.createElement('tr');
	// create header
	const header = document.createElement('th');
	header.setAttribute('scope', 'row');
	header.innerText = i;
	row.appendChild(header);
	for (let j = 1; j < 13; j++) {
		const tableData = document.createElement('td');
		const product = i * j;
		tableData.innerText = product;
		row.appendChild(tableData);
	}
	
	multiplicationTableElement.appendChild(row);
}


// Listen for click and update footer to display multiplication problem
multiplicationTableElement.addEventListener('click', (event) => {
	const productElement = document.querySelector('#product')
	
	let cell = event.target;
	if (cell.tagName.toLowerCase() === "td") {
		let row = cell.parentElement;
		let colIndex = cell.cellIndex;

		let header = multiplicationTableElement.rows[0].cells[colIndex].innerText; // Column header
		let rowHeader = row.cells[0].innerText; // Row header

		productElement.innerHTML = `${rowHeader} &times ${header} = ${cell.innerText}`;
	}
})