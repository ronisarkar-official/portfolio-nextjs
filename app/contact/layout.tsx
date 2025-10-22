import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Get in touch with Roni Sarkar. Send a message for collaboration, project inquiries, or general questions.',
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
