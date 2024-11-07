import {devices} from '@playwright/test';

export const config = {
	name: 'swag-labs',
	testDir: 'tests/swag-labs',
	use: {
		...devices['Desktop Chrome'],
	},
};