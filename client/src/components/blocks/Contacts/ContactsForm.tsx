'use client';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactsService } from '@/data/services/services';

// Определяем схему валидации с использованием Yup
const schema = yup
	.object({
		name: yup.string().required('Имя обязательно'),
		phone: yup
			.string()
			.required('Телефон обязателен')
			.matches(/^\+?\d{10,15}$/, 'Неверный формат телефона'),
		message: yup
			.string()
			.required('Сообщение обязательно')
			.min(10, 'Сообщение должно быть не менее 10 символов'),
	})
	.required();

type FormValues = {
	name: string;
	phone: string;
	message: string;
};

const ContactsForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			// Отправляем данные на сервер
			await contactsService(data);

			// Отображаем уведомление об успехе
			toast.success('Вы успешно подписаны на рассылку!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			// Очищаем форму
			reset();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('Ошибка при отправке формы:', error);

			// Отображаем уведомление об ошибке
			toast.error('Произошла ошибка при подписке. Попробуйте снова.', {
				position: 'top-right',
				autoClose: 3000,
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="contacts__contacts-form contacts-form form"
		>
			<div className="form-group">
				<label htmlFor="name" className="label">
					Имя
				</label>
				<input
					id="name"
					type="text"
					{...register('name')}
					className={`input ${errors.name ? 'input-error' : ''}`}
				/>
				{errors.name && <p className="error">{errors.name.message}</p>}
			</div>

			<div className="form-group">
				<label htmlFor="phone" className="label">
					Телефон
				</label>
				<input
					id="phone"
					type="tel"
					{...register('phone')}
					className={`input ${errors.phone ? 'input-error' : ''}`}
				/>
				{errors.phone && <p className="error">{errors.phone.message}</p>}
			</div>

			<div className="form-group">
				<label htmlFor="message" className="label">
					Сообщение
				</label>
				<textarea
					id="message"
					{...register('message')}
					className={`input ${errors.message ? 'input-error' : ''}`}
				/>
				{errors.message && <p className="error">{errors.message.message}</p>}
			</div>

			<button type="submit" className="btn btn--primary">
				Отправить
			</button>
		</form>
	);
};

export default ContactsForm;
