'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'react-hot-toast';
import { Send } from 'lucide-react';

type FormState = {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
	honey: string;
};

export default function Contact() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState<FormState>({
		firstName: '',
		lastName: '',
		email: '',
		message: '',
		honey: '',
	});

	const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
	const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
	const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
	const TO_EMAIL = process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL;
	const TO_NAME = process.env.NEXT_PUBLIC_CONTACT_TO_NAME || 'Recipient';

	function handleChange(
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = e.target;
		const key = name as keyof FormState; // satisfy TS that name is a key of our form state
		setForm((p) => ({ ...p, [key]: value }));
	}

	function validate() {
		if (form.honey) return { ok: false, message: 'Spam detected' };
		if (!form.firstName.trim() || !form.email.trim() || !form.message.trim())
			return {
				ok: false,
				message: 'Please fill required fields: First name, Email and Message.',
			};
		// Basic email check
		const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRe.test(form.email))
			return { ok: false, message: 'Please enter a valid email address.' };
		return { ok: true };
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const v = validate();
		if (!v.ok) return toast.error(v.message || 'Validation failed');

		setLoading(true);
		const toastId = toast.loading('Sending message...');

		try {
			await emailjs.send(
				SERVICE_ID ?? '',
				TEMPLATE_ID ?? '',
				{
					first_name: form.firstName,
					last_name: form.lastName,
					from_email: form.email,
					to_name: TO_NAME,
					to_email: TO_EMAIL,
					message: form.message,
					reply_to: form.email,
				},
				PUBLIC_KEY ?? '',
			);

			setLoading(false);
			toast.success('Message sent — thank you!', { id: toastId });
			setForm({
				firstName: '',
				lastName: '',
				email: '',
				message: '',
				honey: '',
			});
			formRef.current?.reset();
		} catch (err) {
			console.error('Email send error:', err);
			setLoading(false);
			toast.error('Something went wrong. Try again later.', { id: toastId });
		}
	}

	const inputBase =
		'w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-lg focus:ring-0 focus:border-indigo-600';

	return (
		<main className="">
			{/* Toaster - include once app-wide to avoid duplicates (you can remove this if you have a global Toaster) */}
			<Toaster position="top-right" />

			<div className="max-w-screen-xl mx-auto px-4 text-gray-600 dark:text-gray-300 md:px-8">
				<div className="max-w-lg mx-auto space-y-3 sm:text-center">
					<p className="text-gray-800 dark:text-gray-100 text-3xl font-semibold sm:text-4xl">
						Get in touch
					</p>
					<p className="text-gray-600 dark:text-gray-300">
						We’d love to hear from you! Please fill out the form below.
					</p>
				</div>

				<div className="mt-2 max-w-lg mx-auto">
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className="space-y-5"
						aria-label="Contact form">
						{/* Honeypot (visually hidden but accessible) */}
						<label
							style={{
								position: 'absolute',
								left: '-9999px',
								top: 'auto',
								width: '1px',
								height: '1px',
								overflow: 'hidden',
							}}
							aria-hidden={true}>
							Don’t fill this out if you are human
							<input
								type="text"
								name="honey"
								value={form.honey}
								onChange={handleChange}
								autoComplete="off"
								tabIndex={-1}
								className="sr-only"
							/>
						</label>

						<div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
							<div>
								<label className="font-medium text-gray-800 dark:text-gray-100">
									First name
								</label>
								<input
									name="firstName"
									type="text"
									value={form.firstName}
									onChange={handleChange}
									required
									className={`${inputBase} text-gray-700 bg-white dark:bg-black dark:text-gray-100 border-gray-200 dark:border-gray-700`}
								/>
							</div>

							<div>
								<label className="font-medium text-gray-800 dark:text-gray-100">
									Last name
								</label>
								<input
									name="lastName"
									type="text"
									value={form.lastName}
									onChange={handleChange}
									className={`${inputBase} text-gray-700 bg-white dark:bg-black dark:text-gray-100 border-gray-200 dark:border-gray-700`}
								/>
							</div>
						</div>

						<div>
							<label className="font-medium text-gray-800 dark:text-gray-100">
								Email
							</label>
							<input
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								required
								className={`${inputBase} text-gray-700 bg-white dark:bg-black dark:text-gray-100 border-gray-200 dark:border-gray-700`}
							/>
						</div>

						<div>
							<label className="font-medium text-gray-800 dark:text-gray-100">
								Message
							</label>
							<textarea
								name="message"
								value={form.message}
								onChange={handleChange}
								required
								className={`${inputBase} h-36 px-3 py-2 resize-none appearance-none text-gray-700 bg-white dark:bg-black dark:text-gray-100 border-gray-200 dark:border-gray-700`}
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`w-full flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg transition-transform duration-150  disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
								loading ? ' text-white' : ' hover:bg-gray-900 border text-white'
							}`}
							aria-busy={loading}
							aria-live="polite">
							{loading ?
								<>
									<svg
										className="h-5 w-5 animate-spin"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true">
										<circle
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											className="opacity-25"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
										/>
									</svg>
									<span>Sending...</span>
									<span className="sr-only">Sending</span>
								</>
							:	<>
									<span>Submit</span>
									<Send />
								</>
							}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
