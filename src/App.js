import logo from './logo.svg';
import './App.css';
import { createElement } from 'react';
import { useState } from 'react';
import styles from './app.module.css';

function formatDateTime(date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение', '');

		if (promptValue === null || promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueVaild(false);
			return;
		}

		setError('');
		setIsValueVaild(true);
		setValue(promptValue);
	};

	const onAddButtonClick = () => {
		if (!isValueVaild) {
			return;
		}
		//вариант1
		// const updatedList = [...list, { id: new Date(), value: value, date: new Date()}];
		// setList(updatedList);
		//вариант2
		setList((list) => [...list, { id: new Date(), value: value, date: new Date() }]);

		setValue('');
		setError('');
		setIsValueVaild(false);
	};

	const textError = <div className={styles.error}>{error}</div>;

	// <li class="list-item">25.02.2027 16:06:54 Первый элемент</li>

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>:
				<output className={styles['current-value']}>{value}</output>
			</p>
			{error !== '' && textError}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				<ul className={styles.list}>
					{list.map((item) => (
						<li key={item.id} className={styles['list-item']}>
							{formatDateTime(item.date)} {item.value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
