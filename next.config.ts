import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ik.imagekit.io',
			},
			{
				protocol: 'https',
				hostname: 'drive.google.com',
			},
		],
		formats: ['image/avif', 'image/webp'],
	},
	// Enable React compiler for better performance
	// The experimental 'reactCompiler' option is not recognized by this Next.js version,
	// so it was removed to satisfy the config's type definitions.
	// Optimize production builds
	compress: true,
	poweredByHeader: false,
};

export default nextConfig;
