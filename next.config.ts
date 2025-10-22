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
	experimental: {
		reactCompiler: true,
	},
	// Optimize production builds
	compress: true,
	poweredByHeader: false,
};

export default nextConfig;
