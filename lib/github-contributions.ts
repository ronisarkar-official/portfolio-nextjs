export interface Activity {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

type GitHubContributionsResponse = {
	total: { [year: string]: number };
	contributions: Activity[];
};

const GITHUB_USERNAME = "ronisarkar-official";

export async function getGitHubContributions() {
	const res = await fetch(
		`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
		{
			next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
		},
	);
	const data = (await res.json()) as GitHubContributionsResponse;
	return data.contributions;
}
