'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import SpringAnimated from '@/components/SpringAnimated';
import { Toaster } from 'react-hot-toast';

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
		const key = name as keyof FormState;
		setForm((p) => ({ ...p, [key]: value }));
	}

	function validate() {
		if (form.honey) return { ok: false, message: 'Spam detected' };
		if (!form.firstName.trim() || !form.email.trim() || !form.message.trim())
			return {
				ok: false,
				message: 'Please fill required fields: First name, Email and Message.',
			};
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

	return (
		<article className="flex min-h-[calc(100vh-12rem)] flex-col gap-8 pb-16 pt-8">
			<Toaster position="top-right" />

			<div className="flex flex-col gap-2 stagger-item">
				<h1 className="title text-4xl font-bold">Get in touch</h1>
				<p className="text-muted-foreground">
					Have a project in mind or just want to say hi? Drop me a message.
				</p>
			</div>

			<div className="w-full max-w-xl mx-auto">
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="space-y-6"
					aria-label="Contact form">
					<label
						className="sr-only"
						aria-hidden={true}>
						Don&apos;t fill this out if you are human
						<input
							type="text"
							name="honey"
							value={form.honey}
							onChange={handleChange}
							autoComplete="off"
							tabIndex={-1}
						/>
					</label>

					<div className="flex flex-col gap-6 sm:flex-row">
						<div className="flex-1 space-y-2 stagger-item">
							<Label htmlFor="firstName">First name</Label>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								value={form.firstName}
								onChange={handleChange}
								required
								placeholder="John"
							/>
						</div>
						<div className="flex-1 space-y-2 stagger-item">
							<Label htmlFor="lastName">Last name</Label>
							<Input
								id="lastName"
								name="lastName"
								type="text"
								value={form.lastName}
								onChange={handleChange}
								placeholder="Doe"
							/>
						</div>
					</div>

					<div className="space-y-2 stagger-item">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							required
							placeholder="john@example.com"
						/>
					</div>

					<div className="space-y-2 stagger-item">
						<Label htmlFor="message">Message</Label>
						<Textarea
							id="message"
							name="message"
							value={form.message}
							onChange={handleChange}
							required
							placeholder="What's on your mind?"
							className="min-h-[160px] resize-y"
						/>
					</div>

					<SpringAnimated className="stagger-item">
						<Button
							type="submit"
							disabled={loading}
							className="w-full"
							aria-busy={loading}
							aria-live="polite">
							{loading ? (
								<>
									<svg
										className="h-4 w-4 animate-spin"
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
									Sending...
									<span className="sr-only">Sending</span>
								</>
							) : (
								<>
									Send message
									<Send className="size-4" />
								</>
							)}
						</Button>
					</SpringAnimated>
				</form>
			</div>
		</article>
	);
}
