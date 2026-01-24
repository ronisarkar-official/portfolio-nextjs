import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'visitorCount',
	title: 'Visitor Count',
	type: 'document',
	fields: [
		defineField({
			name: 'count',
			title: 'Total Visitors',
			type: 'number',
			description: 'Total number of unique visitors to the website',
			initialValue: 0,
			validation: (Rule) => Rule.required().min(0),
		}),
	],
	preview: {
		select: {
			count: 'count',
		},
		prepare({ count }) {
			return {
				title: 'Visitor Count',
				subtitle: `${count?.toLocaleString() || 0} visitors`,
			};
		},
	},
});
