'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
	basePath: '/studio',
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({ structure }),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
	document: {
		actions: (prev, context) => {
			if (context.schemaType === 'post') {
				return prev.map((action) => {
					if (action.action === 'publish') {
						return {
							...action,
							onHandle: async (props: any) => {
								const { draft, published } = props;

								// If there's no publishedAt field or it's empty, set it to current date
								if (!published?.publishedAt) {
									const now = new Date().toISOString();

									// Update the document with the current date
									await props.client
										.patch(draft._id)
										.set({ publishedAt: now })
										.commit();
								}

								// Proceed with normal publish
								return props.publish();
							},
						};
					}
					return action;
				});
			}
			return prev;
		},
	},
});
